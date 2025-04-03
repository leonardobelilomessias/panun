'use server'
import { createClient } from "@/utils/supabase/server";

  export const getQuestionById = async (id: string) => {
    const supabase = await createClient()
    try {
      const { data: question, error } = await supabase
      .from("questions")
      .select(`
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
        ),
        questions_likes_count:questions_likes(count)
      `)
      .eq('id', id)
      .single()
      if (error) {
        throw error;
      }
  
      if (!question) {
        throw new Error("Dica não encontrada");
      }
  
      // Tratamento para contagem de likes
      const likesCount = question.questions_likes?.length || question.likes_count || 0;
      
      // Processar comentários
      const comments = question.questions_comments?.map((comment: {
        profiles: any;
        [key: string]: any;
      }) => ({
        ...comment,
        profile: comment.profiles,
        profiles: undefined
      })) || [];
  
      // Atualizar visualizações de forma assíncrona
      try {
        await supabase
          .from("questions")
          .update({ views_count: (question.views_count || 0) + 1 })
          .eq('id', id);
      } catch (err) {
        console.error("Erro ao atualizar visualizações:", err);
      }

      // Retornar dados formatados
      return {
        ...question,
        profile: question.profiles,
        theme: question.themes,
        country: question.countries,
        likes_count: likesCount,
        comments,
        profiles: undefined,
        themes: undefined,
        countries: undefined,
        questions_likes: undefined,
        questions_comments: undefined
      };

    } catch (error) {
      console.error("Erro ao buscar dica:", error);
      throw error;
    }
  };
