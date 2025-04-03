'use server'
import { supabaseClient } from "../client";
import { revalidatePath } from "next/cache";

interface IUser {
  id: string;
  // Add other user properties here
}

export const getUserById = async (id: string) => {
    try {
      const { data, error } = await supabaseClient()
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
  export const updateUserById = async (userData:IUser) => {
    try {
      const { data, error } = await supabaseClient()
        .from('profiles')
        .update(userData)
        .eq('id', userData.id);
  
      if (error) {
        throw error;
      }
      revalidatePath(`/editar-perfil/${userData.id}`);
      revalidatePath(`/perfil`);


      return data;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return null;
    }
  };