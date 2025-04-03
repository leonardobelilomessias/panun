import { Tip, TipsFull } from "@/app/types/TypesDB";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabaseClient} from "../../client";


export const fetchTips = async (): Promise<TipsFull[]> => {
  
    const { data, error } = await supabaseClient()
      .from("tips")
      .select(`
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
      `)
      .order("created_at", { ascending: false });
      
  
  
    if (error) throw error;
  
    // Transformar os dados para o formato esperado pela aplicação
    return data?.map((tip) => ({
      ...tip,
      profile: tip.profiles,
      theme: tip.themes,
      country: tip.countries,
      // Remover as chaves originais para evitar duplicação
      profiles: undefined,
      themes: undefined,
      countries: undefined
    })) ?? [];
  };  
  



// export const insertTip = async (tipData: Omit<Tip, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'profile' | 'theme' | 'country'>): Promise<PostgrestSingleResponse<null>> => {
//   const { data: session } = await supabaseClient().auth.getSession();
//   if (!session || !session.session?.user.id) {
//     throw new Error("Usuário não autenticado");
//   }

//   const supabase = await createClient()
//   const { data, error } = await supabase
//     .from('tips')
//     .insert([{
//       title: tipData.title,
//       content: tipData.content,
//       created_by: session.session?.user.id,
//       theme_id: tipData.theme_id,
//       country_id: tipData.country_id
//     }]);
  
//   revalidatePath('/dicas');
//   return { data, error, count: null, status: 201, statusText: 'Created' };
// };

export const getTipById = async (id: string) => {
  try {

    const { data, error } = await supabaseClient()
      .from('tips')
      .select(`
        *,
        users:created_by (
          id,
          name,
          avatar_url,
          email
        ),
        themes:theme_id (
          id,
          name
        ),
        countries:country_id (
          id,
          name
        ),
        comments!tip_id (
          id,
          content,
          created_at,
          updated_at,
          user_id,
          users!user_id (
            id,
            name,
            avatar_url
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro Supabase:', error); // Debug log
      throw error;
    }

// Debug log
    return data;
  } catch (error) {
    console.error('Erro ao buscar dica:', error);
    return null;
  }
};

export const getCommentsByTipId = async (tipId: string) => {
  try {
    const { data, error } = await supabaseClient()
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        updated_at,
        users (
          id,
          name,
          avatar_url
        )
      `)
      .eq('tip_id', tipId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    return null;
  }
}

export const createComment = async (tipId: string, content: string) => {
  
  try {
    const { data: userData, error: userError } = await supabaseClient().auth.getUser();
    
    if (userError || !userData.user) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await supabaseClient()
      .from('comments')
      .insert({
        content,
        tip_id: tipId,
        user_id: userData.user.id
      })
      .select(`
        id,
        content, 
        created_at,
        updated_at,
        users (
          id,
          name,
          avatar_url
        )
      `)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    return null;
  }
}

export const deleteComment = async (commentId: string) => {
  try {
    
    const { data: userData, error: userError } = await supabaseClient().auth.getUser();

    if (userError || !userData.user) {
      throw new Error('Usuário não autenticado');
    }

    // Verificar se o usuário é o criador do comentário
    const { data: comment, error: commentError } = await supabaseClient()
      .from('comments')
      .select('user_id')
      .eq('id', commentId)
      .single();

    if (commentError || !comment) {
      throw new Error('Comentário não encontrado');
    }

    if (comment.user_id !== userData.user.id) {
      throw new Error('Usuário não tem permissão para deletar este comentário');
    }

    // Deletar o comentário
    const { error: deleteError } = await supabaseClient()
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (deleteError) {
      throw deleteError;
    }

    return true;
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    return null;
  }
}

export const likeTip = async (tipId: string) => {
    try {
      
      const { data: userData, error: userError } = await supabaseClient().auth.getUser();
  
      if (userError || !userData.user) {
        throw new Error('Usuário não autenticado');
      }
  
      // Verificar se o usuário já curtiu a dica
      const { data: like, error: likeError } = await supabaseClient()
        .from('likes')
        .select('id')
        .eq('tip_id', tipId)
        .eq('user_id', userData.user.id)
        .single();
  
      if (likeError) {
        throw likeError;
      }
  
      if (like) {
        throw new Error('Usuário já curtiu esta dica');
      }
  
      // Criar a curtida
      const { data, error } = await supabaseClient()
        .from('likes')
        .insert({
          tip_id: tipId,
          user_id: userData.user.id
        });
  
      if (error) {
        throw error;
      }
  
      return true;
    } catch (error) {
      console.error('Erro ao curtir dica:', error);
      return null;
    }
  }
  
  export const unlikeTip = async (tipId: string) => {
    try {
      const { data: userData, error: userError } = await supabaseClient().auth.getUser();
  
      if (userError || !userData.user) {
        throw new Error('Usuário não autenticado');
      }
  
      // Verificar se o usuário já curtiu a dica
      const { data: like, error: likeError } = await supabaseClient()
        .from('likes')
        .select('id')
        .eq('tip_id', tipId)
        .eq('user_id', userData.user.id)
        .single();
  
      if (likeError) {
        throw likeError;
      }
  
      if (!like) {
        throw new Error('Usuário não curtiu esta dica');
      }
  
      // Deletar a curtida
      const { error } = await supabaseClient()
        .from('likes')
        .delete()
        .eq('id', like.id);
  
      if (error) {
        throw error;
      }
  
      return true;
    } catch (error) {
      console.error('Erro ao descurtir dica:', error);
      return null;
    }
  }

  export const deleteTip = async (tipId: string) => {

    
    // Verificar autenticação
    const { data: { user } } = await supabaseClient().auth.getUser()
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
    
    revalidatePath('/dicas') // Atualizar dados da página
  }
