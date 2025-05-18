'use server'
import { createClient } from "@/utils/supabase/server";

export async function getOwnerById(ownerId: string) {
    const supabase = await createClient();
    
    try {
        const { data, error } = await supabase
            .from("owners")
            .select(`
                *,
                city_id (name, estate_id (name, uf)),
                neighborhood_id (name)
            `)
            .eq('id', ownerId)
            .single(); // Usa single() pois esperamos apenas 1 resultado
            
        if (error) {
            console.error('Error fetching owner:', error);
            throw error;
        }
        
        if (!data) {
            throw new Error('Owner not found');
        }
        
        // Formata os dados igual na função listOwners
        return {
            ...data,
            state: data.city_id?.estate_id?.name,
            city: data.city_id?.name,
            neighborhood: data.neighborhood_id?.name,
            // Remove os objetos aninhados originais
            city_id: undefined,
            estate_id: undefined,
            neighborhood_id: undefined
        };
        
    } catch (error) {
        console.error('Failed to get owner:', error);
        throw error;
    }
}