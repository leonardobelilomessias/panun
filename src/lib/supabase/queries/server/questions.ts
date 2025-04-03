'use server'

import { revalidatePath } from 'next/cache'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { ListItemGenericFull, Tip } from '@/app/types/TypesDB';
export const insertQuestion = async (data:any): Promise<PostgrestSingleResponse<any| Tip>> => {
  const supabase = await createClient()
  const resp = await supabase 
  .from('questions')
  .insert([
    data
  ])
  .select();
  console.log(resp)
   revalidatePath('/dicas')
  return resp

};

export const fetchQuestions = async (): Promise<ListItemGenericFull[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("questions")
      .select(`
        *,
        profiles!question_created_by_fkey (
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
      `)
      .order("created_at", { ascending: false });
      
    
    revalidatePath('/perguntas');
  
    if (error) throw error;
  
    // Transformar os dados para o formato esperado pela aplicação
    return data?.map((question) => ({
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
  };  
  