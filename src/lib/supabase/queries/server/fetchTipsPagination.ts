'use server'
import { TipsFull } from "@/types/TypesDB";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const fetchTipsPagination = async (page: number, limit: number = 5): Promise<{ tips: TipsFull[], totalPages: number }> => {
  const supabase = await createClient();

  // Calcular o offset com base na página e no limite
  const offset = (page - 1) * limit;

  // Consultar as dicas com paginação
  const { data, error, count } = await supabase
    .from("tips")
    .select(
      `
          *,
          profiles!tips_created_by_fkey (
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
          tips_comments (
            id,
            content,
            created_at,
            user_id,
            profiles!tips_comments_user_id_fkey (
              id,
              user_name,
              avatar_url,
              full_name
            )
          )
        `,
      { count: 'exact' } // Solicitar a contagem total de registros
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1); // Aplicar paginação

  if (error) throw error;

  // Calcular o número total de páginas
  const totalPages = Math.ceil((count ?? 0) / limit);

  // Transformar os dados para o formato esperado pela aplicação
  const tips = data?.map((tip) => ({
    ...tip,
    profile: tip.profiles,
    theme: tip.themes,
    country: tip.countries,
    comments:tip.tips_comments,

    // Remover as chaves originais para evitar duplicação
    profiles: undefined,
    themes: undefined,
    countries: undefined,
    tips_comments:undefined
  })) ?? [];

  return { tips, totalPages };
};

export const fetchTipsPaginationWithSelect = async (
  page: number, 
  limit: number = 5, 
  theme: string = "",
  country: string = ""
): Promise<{ tips: TipsFull[], totalPages: number }> => {
  const supabase = await createClient();
  
  // Calcular o offset com base na página e no limite
  const offset = (page - 1) * limit;
  
  // Criar uma query que busca por todos os registros necessários
  let query = supabase
    .from("tips")
    .select(
      `
      *,
      profiles!tips_created_by_fkey (
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
      tips_comments (
        id,
        content,
        created_at,
        user_id,
        profiles!tips_comments_user_id_fkey (
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
  const tips = data?.map((tip) => ({
    ...tip,
    profile: tip.profiles,
    theme: tip.themes,
    country: tip.countries,
    comments:tip.tips_comments,

    // Remover as chaves originais para evitar duplicação
    profiles: undefined,
    themes: undefined,
    countries: undefined,
    tips_comments:undefined
  })) ?? [];
  
  return { tips, totalPages };
};