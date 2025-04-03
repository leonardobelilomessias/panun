'use server'
import { Tip, TipsFull } from "@/app/types/TypesDB";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const fetchTips = async (): Promise<TipsFull[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
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
      
    
    revalidatePath('/dicas');
  
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
  
  export const fetchTipsByTheme = async (themeId: string): Promise<Tip[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("tips")
      .select(`
        *,
        profiles!tips_created_by_fkey (
          id,
          user_name,
          full_name,
          avatar_url
        ),
        themes (
          id,
          name
        ),
        countries (
          id,
          name,
          code
        )
      `)
      .eq('theme_id', themeId)
      .order("created_at", { ascending: false });
    
    revalidatePath('/dicas');
  
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
  
  
  export const deleteTip = async (tipId: string) => {
    const supabase = await createClient()
    
    // Verificar autenticação
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Acesso negado!')
  
    // Executar delete com validação
    const { error } = await supabase
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

  export const getTipById = async (id: string) => {
    const supabase = await createClient()
    try {
      const { data: tip, error } = await supabase
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
        ),
        tips_likes_count:tips_likes(count)
      `)
      .eq('id', id)
      .single()
      if (error) {
        throw error;
      }
  
      if (!tip) {
        throw new Error("Dica não encontrada");
      }
  
      // Tratamento para contagem de likes
      const likesCount = tip.tips_likes?.length || tip.likes_count || 0;
      
      // Processar comentários
      const comments = tip.tips_comments?.map((comment: {
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
          .from("tips")
          .update({ views_count: (tip.views_count || 0) + 1 })
          .eq('id', id);
      } catch (err) {
        console.error("Erro ao atualizar visualizações:", err);
      }

      // Retornar dados formatados
      return {
        ...tip,
        profile: tip.profiles,
        theme: tip.themes,
        country: tip.countries,
        likes_count: likesCount,
        comments,
        profiles: undefined,
        themes: undefined,
        countries: undefined,
        tips_likes: undefined,
        tips_comments: undefined
      };

    } catch (error) {
      console.error("Erro ao buscar dica:", error);
      throw error;
    }
  };


export const fetchTipsByCountry = async (countryId: string): Promise<Tip[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("tips")
      .select(`
        *,
        profiles!tips_created_by_fkey (
          id,
          user_name,
          full_name,
          avatar_url
        ),
        themes (
          id,
          name
        ),
        countries (
          id,
          name,
          code
        )
      `)
      .eq('country_id', countryId)
      .order("created_at", { ascending: false });
    
    revalidatePath('/dicas');
  
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
  
  export const fetchTipsByUser = async (userId: string): Promise<Tip[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("tips")
      .select(`
        *,
        profiles!tips_created_by_fkey (
          id,
          user_name,
          full_name,
          avatar_url
        ),
        themes (
          id,
          name
        ),
        countries (
          id,
          name,
          code
        )
      `)
      .eq('created_by', userId)
      .order("created_at", { ascending: false });
    
    revalidatePath('/dicas');
  
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
  
  export const fetchTipsByUserAndCountry = async (userId: string, countryId: string): Promise<Tip[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("tips")
      .select(`
        *,
        profiles!tips_created_by_fkey (
          id,
          user_name,
          full_name,
          avatar_url
        ),
        themes (
          id,
          name
        ),
        countries (
          id,
          name,
          code
        )
      `)
      .eq('created_by', userId)
      .eq('country_id', countryId)
      .order
      ("created_at", { ascending: false })
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
    if (error) throw error;
  };
  
  export const fetchTipsByUserAndTheme = async (userId: string, themeId: string): Promise<Tip[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("tips")
      .select(`
        *,
        profiles!tips_created_by_fkey (
          id,
          user_name,
          full_name,
          avatar_url
        ),
        themes (
          id,
          name
        ),
        countries (
          id,
          name,
          code
        )
      `)
      .eq('created_by', userId)
      .eq('theme_id', themeId)
      .order("created_at", { ascending: false });
    
    revalidatePath('/dicas');
  
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
  
  export const fetchTipsByUserAndThemeAndCountry = async (userId: string, themeId: string, countryId: string): Promise<Tip[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("tips")
      .select(`
        *,
        profiles!tips_created_by_fkey (
          id,
          user_name,
          full_name,
          avatar_url
        ),
        themes (
          id,
          name
        ),
        countries (
          id,
          name,
          code
        )
      `)
      .eq('created_by', userId)
      .eq('theme_id', themeId)
      .eq('country_id', countryId)
      .order("created_at", { ascending: false });
    
    revalidatePath('/dicas');
  
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
  
  export const fetchTipsByCountryAndTheme = async (countryId: string, themeId: string): Promise<Tip[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("tips")
      .select(`
        *,
        profiles!tips_created_by_fkey (
          id,
          user_name,
          full_name,
          avatar_url
        ),
        themes (
          id,
          name
        ),
        countries (
          id,
          name,
          code
        )
      `)
      .eq('country_id', countryId)
      .eq('theme_id', themeId)
      .order("created_at", { ascending: false });
    
    revalidatePath('/dicas');
  
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
  
  export const fetchTipsByCountryAndThemeAndUser = async (countryId: string, themeId: string, userId: string): Promise<Tip[]> => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("tips")
      .select(`
        *,
        profiles!tips_created_by_fkey (
          id,
          user_name,
          full_name,
          avatar_url
        ),
        themes (
          id,
          name
        ),
        countries (
          id,
          name,
          code
        )
      `)
      .eq('country_id', countryId)
      .eq('theme_id', themeId)
      .eq('created_by', userId)
      .order("created_at", { ascending: false });
    
    revalidatePath('/dicas');
  
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
  
interface AddCommentParams {
  tipId: string;
  userId: string;
  content: string;
}

export const addComment = async ({ tipId, userId, content }: AddCommentParams) => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('tips_comments')
      .insert({
        tip_id: tipId,
        user_id: userId,
        content: content
      });
      revalidatePath(`/dica/${tipId}`);
    if (error) throw error;
  };
  
  export async function deleteCommentTip(commentId: string) {
    const supabase = await createClient()
    
    // Verificar autenticação do usuário
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: 'Usuário não autenticado' }
    }

    try {
      // Deletar comentário verificando se pertence ao usuário
      const { error } = await supabase
        .from('tips_comments')
        .delete()
        .match({
          id: commentId,
          user_id: user.id
        })

      if (error) {
        throw error
      }

      revalidatePath('/tips')
      return { success: true, error: null }
      
    } catch (error) {
      console.error('Erro ao deletar comentário:', error)
      return { success: false, error: 'Erro ao deletar comentário' }
    }
  }

  export const likeTip = async (tipId: string) => {
      try {
        const supabase = await createClient()
        const { data: userData, error: userError } = await supabase.auth.getUser();
    
        if (userError || !userData.user) {
          throw new Error('Usuário não autenticado');
        }
    
        // Verificar se o usuário já curtiu a dica
        const { data: like, error: likeError } = await supabase
          .from('tips_likes')
          .select('id')
          .eq('tip_id', tipId)
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
          .from('tips_likes')
          .insert({
            tip_id: tipId,
            user_id: userData.user.id
          });
    
        if (error) {
          throw error;
        }
        supabase.from('tips').update({likes_count:""})
        revalidatePath(`/dica/${tipId}`)
        return true;
      } catch (error) {
        console.error('Erro ao curtir dica:', error);
        return null;
      }
    }
    
    export const unlikeTip = async (tipId: string) => {
      try {
        const supabase = await createClient()
        const { data: userData, error: userError } = await supabase.auth.getUser();
    
        if (userError || !userData.user) {
          throw new Error('Usuário não autenticado');
        }
    
        // Verificar se o usuário já curtiu a dica
        const { data: like, error: likeError } = await supabase
          .from('tips_likes')
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
        const { error } = await supabase
          .from('tips_likes')
          .delete()
          .eq('id', like.id);
        
        if (error) {
          throw error;
        }
        revalidatePath(`/dica/${tipId}`)
        return true;
      } catch (error) {
        console.error('Erro ao descurtir dica:', error);
        return null;
      }
    }