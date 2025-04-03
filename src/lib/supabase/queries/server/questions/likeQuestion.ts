'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

  export const likeQuestion = async (questionId: string) => {
      try {
        const supabase = await createClient()
        const { data: userData, error: userError } = await supabase.auth.getUser();
    
        if (userError || !userData.user) {
          throw new Error('Usuário não autenticado');
        }
    
        // Verificar se o usuário já curtiu a dica
        const { data: like, error: likeError } = await supabase
          .from('questions_likes')
          .select('id')
          .eq('question_id', questionId)
          .eq('user_id', userData.user.id)
          .maybeSingle();
    
        if (likeError) {
          throw likeError;
        }
    
        if (like) {
          throw new Error('Usuário já curtiu esta dica');
        }
    
        // Criar a curtida
        const { data, error } = await supabase
          .from('questions_likes')
          .insert({
            question_id: questionId,
            user_id: userData.user.id
          });
    
        if (error) {
          throw error;
        }
        supabase.from('questions').update({likes_count:""})
        revalidatePath(`/pergunta/${questionId}`)
        return true;
      } catch (error) {
        console.error('Erro ao curtir dica:', error);
        return null;
      }
    }
    