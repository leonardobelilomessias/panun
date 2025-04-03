import { ITip } from '@/app/types/TypesDB';
import { supabase } from '@/lib/supabase/supabase';


export const getTips = async (): Promise<ITip[]> => {
  const { data: tips, error } = await supabase
    .from('tips')
    .select(`
      *,
      profiles (
        id,
        user_name,
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
    `);

  if (error) throw error;
  return tips;
};

export const getTipById = async (tipId: string): Promise<ITip | null> => {
  const { data: tip, error } = await supabase
    .from('tips')
    .select(`
      *,
      profiles (
        id,
        user_name,
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
    .eq('id', tipId)
    .single();

  if (error) throw error;
  return tip;
}; 