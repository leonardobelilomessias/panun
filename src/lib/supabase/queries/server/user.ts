'use server'
import { createClient } from "@/utils/supabase/server";
import { IProfile, ProfileFormData } from "@/app/types/TypesDB";
import { revalidatePath } from "next/cache";

export const updateUserById = async (userData:IProfile) => {
    const supabase =await  createClient();
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update(userData)
            .eq('id', userData.id);

        if (error) {
            throw error;
        }
        await supabase.auth.updateUser({data: { display_name: userData.full_name, }});
              revalidatePath(`/dashboard/${userData.id}`);
              revalidatePath(`/editar-perfil/${userData.id}`);
              revalidatePath(`/perfil`);

        return data;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return null;
    }
};

export const getUserById = async (id: string) => {
  const supabase =await  createClient();

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  };

  export const uploadAvatar = async (file: File, userId: string) => {
    const supabase =await  createClient();

    try {
      const { data, error } = await supabase
        .storage
        .from('avatars')
        .upload(`public/${userId}/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      return data.path; // Retorna a chave do arquivo enviado
    } catch (error) {
      console.error('Erro ao fazer upload do avatar:', error);
      return null;
    }
  };

  export async function getUserByEmail(email: string): Promise<{ user: IProfile | null; error: Error | null }> {
    const supabase = await createClient();
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .maybeSingle();
  
      if (error) {
        console.error("Erro ao buscar usuário:", error);
        return { user: null, error: new Error(error.message) };
      }
  
      return { user: data, error: null };
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      return { user: null, error: err as Error };
    }
  }
  