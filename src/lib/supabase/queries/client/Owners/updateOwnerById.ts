'use server'
import { createClient } from "@/utils/supabase/server";

type UpdateOwnerData = {
  name?: string;
  email?: string;
  phone?: string;
  document?: string;
  city_id?: string;
  neighborhood_id?: string;
  // Add other updatable fields as needed
};

export async function updateOwnerById(ownerId: string, updateData: UpdateOwnerData) {
  const supabase = await createClient();
  
  try {
    // First verify the owner exists
    const { data: existingOwner, error: fetchError } = await supabase
      .from('owners')
      .select('id')
      .eq('id', ownerId)
      .single();

    if (fetchError || !existingOwner) {
      throw new Error('Owner not found');
    }

    // Perform the update
    const { data: updatedOwner, error: updateError } = await supabase
      .from('owners')
      .update(updateData)
      .eq('id', ownerId)
      .select(`
        *,
        city_id (name, estate_id (name, uf)),
        neighborhood_id (name)
      `)
      .single();

    if (updateError) {
      throw updateError;
    }

    // Format the response consistently with listOwners
    return {
      ...updatedOwner,
      state: updatedOwner.city_id?.estate_id?.name,
      city: updatedOwner.city_id?.name,
      neighborhood: updatedOwner.neighborhood_id?.name,
      // Remove nested objects
      city_id: undefined,
      estate_id: undefined,
      neighborhood_id: undefined
    };
    
  } catch (error) {
    console.error('Error updating owner:', error);
    throw error;
  }
}