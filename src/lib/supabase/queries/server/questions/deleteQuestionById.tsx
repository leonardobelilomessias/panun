'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

  export const deleteQuestionById = async (tipId: string) => {
    const supabase = await createClient()
    
    // Verificar autenticação
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Acesso negado!')
  
    // Executar delete com validação
    const { error } = await supabase
      .from('questions')
      .delete()
      .match({
        id: tipId,
        created_by: user.id  // Garante que só o autor pode deletar
      })
  console.log('log do erro', error)
    if (error) throw error
    
    // revalidatePath('/perguntas') // Atualizar dados da página
  }