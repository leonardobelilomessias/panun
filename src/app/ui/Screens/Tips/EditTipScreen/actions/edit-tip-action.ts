'use server'
import { revalidatePath } from 'next/cache'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'

export const updateTip = async (data:any): Promise<PostgrestSingleResponse<null>> => {
  const supabase = await createClient()
  const { data: updatedData, error } = await supabase
      .from('tips')
      .update(data)
      .eq('id', data.id); // Filtra a dica pelo ID
  
  if (error) {
      console.error('Erro ao atualizar a dica:', error);
      console.error('informaçoes:', data);

      return { data: null, error, count: null, status: Number(error.code), statusText: error.message };
  } else {

    revalidatePath(`/dica/${data.id}`);
    revalidatePath(`/dica/editar-dica/${data.id}`);
    
    console.log('Dica atualizada com sucesso:', data);
    return { data: null, error: null, count: null, status: 200, statusText: 'updated' };
  }
};

