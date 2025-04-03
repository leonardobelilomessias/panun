'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

  export async function deleteCommentQuestionById(commentId: string) {
    const supabase = await createClient()
    
    // Verificar autenticação do usuário
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: 'Usuário não autenticado' }
    }

    try {
      // Deletar comentário verificando se pertence ao usuário
      const { error } = await supabase
        .from('questions_comments')
        .delete()
        .match({
          id: commentId,
          user_id: user.id
        })

      if (error) {
        throw error
      }

      revalidatePath('/perguntas')
      return { success: true, error: null }
      
    } catch (error) {
      console.error('Erro ao deletar comentário:', error)
      return { success: false, error: 'Erro ao deletar comentário' }
    }
  }
