'use server'
import { createClient } from "@/utils/supabase/server";

export async function deleteOwnerById(ownerId: string) {
    const supabase = await createClient();
    
    try {
        // First check if the owner exists
        const { data: existingOwner, error: fetchError } = await supabase
            .from('owners')
            .select('id')
            .eq('id', ownerId)
            .single();

        if (fetchError || !existingOwner) {
            throw new Error('Owner not found');
        }

        // Delete the owner
        const { error: deleteError } = await supabase
            .from('owners')
            .delete()
            .eq('id', ownerId);

        if (deleteError) {
            throw deleteError;
        }

        return { success: true, message: 'Owner deleted successfully' };
        
    } catch (error) {
        console.error('Error deleting owner:', error);
        throw error;
    }
}