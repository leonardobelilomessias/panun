'use server'
import { ListItemGenericFull, TipsFull } from "@/app/types/TypesDB";
import { createClient } from "@/utils/supabase/server";

export const fetchQuestionsPaginationWithSelect = async (
  page: number, 
  limit: number = 5, 
  theme: string = "",
  country: string = ""
): Promise<{ questions: ListItemGenericFull[], totalPages: number }> => {
  const supabase = await createClient();
  
  // Calcular o offset com base na página e no limite
  const offset = (page - 1) * limit;
  
  // Criar uma query que busca por todos os registros necessários
  let query = supabase
    .from("questions")
    .select(
      `
      *,
      profiles!questions_created_by_fkey (
        id,
        user_name,
        full_name,
        avatar_url
      ),
      themes:theme_id (
        id,
        name
      ),
      countries:country_id (
        id,
        name,
        code
      ),
      questions_comments (
        id,
        content,
        created_at,
        user_id,
        profiles!questions_comments_user_id_fkey (
          id,
          user_name,
          avatar_url,
          full_name
        )
      )
      `,
      { count: 'exact' } // Solicitar a contagem total de registros
    );
  
  // Primeiro buscar os IDs dos temas e países se os nomes forem fornecidos
  if (theme && theme.trim() !== "") {
    // Primeiro buscar o ID do tema pelo nome
    const { data: themeData } = await supabase
      .from("themes")
      .select("id")
      .ilike("name", `%${theme}%`)
      .limit(1);
    
    // Se encontrar um tema, filtrar por seu ID
    if (themeData && themeData.length > 0) {
      query = query.eq("theme_id", themeData[0].id);
    }
  }
  
  if (country && country.trim() !== "") {
    // Primeiro buscar o ID do país pelo nome
    const { data: countryData } = await supabase
      .from("countries")
      .select("id")
      .ilike("name", `%${country}%`)
      .limit(1);
    
    // Se encontrar um país, filtrar por seu ID
    if (countryData && countryData.length > 0) {
      query = query.eq("country_id", countryData[0].id);
    }
  }
  
  // Aplicar ordenação e paginação
  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
    
  if (error) throw error;
  
  // Calcular o número total de páginas
  const totalPages = Math.ceil((count ?? 0) / limit);
  
  // Transformar os dados para o formato esperado pela aplicação
  const questions = data?.map((question) => ({
    ...question,
    profile: question.profiles,
    theme: question.themes,
    country: question.countries,
    comments:question.questions_comments,
    // Remover as chaves originais para evitar duplicação
    profiles: undefined,
    themes: undefined,
    countries: undefined,
    questions_comments:undefined
  })) ?? [];
  
  return { questions, totalPages };
};