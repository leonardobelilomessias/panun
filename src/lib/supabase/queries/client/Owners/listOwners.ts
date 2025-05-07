'use server'
import { createClient } from "@/utils/supabase/server";

export async function listOwners() {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from("owners")
        .select(`
            *,
            city_id (name, estate_id (name, uf)),
            neighborhood_id (name)
        `);
    
    if (error) {
        console.error('Error fetching owners:', error);
        throw error;
    }
    
    return data?.map(owner => ({
        ...owner,
        state: owner.city_id?.estate_id?.name,
        city: owner.city_id?.name,
        neighborhood: owner.neighborhood_id?.name,
        // Removendo os objetos originais para evitar duplicação
        city_id: undefined,
        estate_id: undefined,
        neighborhood_id: undefined
    }));
}