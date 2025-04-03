'use server'
import { supabaseClient } from "../client";


export const getQuestions = async () => {

  const { data, error } = await supabaseClient()
    .from("questions")
    .select(`
      *,
      created_by:profiles!questions_created_by_fkey (
        id,
        name,
        avatar_url
      ),
      theme_id:themes (
        id,
        name
      ),
      country_id:countries (
        id,
        name
      ),
      comments:questions_comments (
        id,
        content,
        created_at,
        profiles (
          id,
          name,
          avatar_url
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const createQuestion = async (questionData: any) => {
  const { data, error } = await supabaseClient()
    .from("questions")
    .insert(questionData)
    .select();

  if (error) throw error;
  return data;
}; 