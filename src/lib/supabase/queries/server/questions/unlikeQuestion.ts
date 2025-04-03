'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

    
    export const unlikeQuestion = async (questionId: string) => {
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
          .single();
    
        if (likeError) {
          throw likeError;
        }
        
        if (!like) {
          throw new Error('Usuário não curtiu esta dica');
        }
    
        // Deletar a curtida
        const { error } = await supabase
          .from('questions_likes')
          .delete()
          .eq('id', like.id);
        
        if (error) {
          throw error;
        }
        revalidatePath(`/pergunta/${questionId}`)
        return true;
      } catch (error) {
        console.error('Erro ao descurtir dica:', error);
        return null;
      }
    }