import { revalidatePath } from "next/cache"
import { supabaseClient } from "../../../client"
import { createClient } from "@/utils/supabase/server"

  export const deleteTip = async (tipId: string) => {

    
    // Verificar autenticação
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log('user', user)
    if (!user) throw new Error('Acesso negado!')
  
    // Executar delete com validação
    const { error } = await supabaseClient()
      .from('tips')
      .delete()
      .match({
        id: tipId,
        created_by: user.id  // Garante que só o autor pode deletar
      })
  console.log('log do erro', error)
    if (error) throw error
    
    // revalidatePath('/dicas') // Atualizar dados da página
  }