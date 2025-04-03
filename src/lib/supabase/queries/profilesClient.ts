import { supabase } from '@/lib/supabase/supabase';
import { IProfile, ProfileFormData } from '@/app/types/TypesDB';

export const getProfileById = async (userId: string): Promise<IProfile | null> => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return profile;
};

export const updateProfileById = async (
  userId: string, 
  profileData: Partial<ProfileFormData>
): Promise<IProfile | null> => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .update({
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return profile;
};

export const getProfileByEmail = async (email: string): Promise<IProfile | null> => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (error) throw error;
  return profile;
};

export const createProfile = async (profileData: Partial<IProfile>): Promise<IProfile | null> => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .insert([profileData])
    .select()
    .single();

  if (error) throw error;
  return profile;
}; 