'use server'
import { Property, PropertySingle } from "@/types/typesPropeties";
import { createClient } from "@/utils/supabase/client";

export async function listSalesProperties() {
    const supabase = await createClient();

    const { data, error }: { data: PropertySingle[] | null|undefined|any, error: any }= await supabase
    .from('properties')
    .select(`
      id,
      street,
      house_number,
      zipcode,
      status,
      created_at,
      updated_at,
      purpose,
      owners(id, name, email),
      agents(id, name, email),
      cities(id, name),
      neighborhoods(id, name),
      estates(id, name),
      property_covers(
        id,
        property_id,
        url,
        path,
        created_at,
        updated_at
      ),
      details(
        id,
        title,
        full_description,
        shot_description,
        garage,
        bathroom,
        bedroom,
        total_area,
        usable_area,
        reference_point,
        furnished,
        flor,
        status,
        address,
        created_at,
        updated_at
      ),
      financeiro(
        id,
        price,
        iptu,
        condominium,
        commission,
        status,
        created_at,
        updated_at
      )
    `).eq("purpose","Venda");
  if (error) {
    console.error('Erro ao buscar os dados:', error);
  } else {
    return data
  }
  

}