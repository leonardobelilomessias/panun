import { ITipComment } from '@/app/types/TypesDB';
import { supabase } from '@/lib/supabase/supabase';


export const getCommentsByTipId = async (tipId: string): Promise<ITipComment[]> => {
  const { data: comments, error } = await supabase
    .from('tips_comments')
    .select(`
      *,
      profiles (
        id,
        user_name,
        avatar_url
      )
    `)
    .eq('tip_id', tipId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return comments;
};

// ... resto do arquivo permanece igual ... 