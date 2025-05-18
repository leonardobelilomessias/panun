// ajuste o caminho conforme seu projeto

import { supabase } from "@/lib/supabase/supabase"

export async function listSalesPropertiesPublic() {
  const { data, error } = await supabase
    .from("properties")
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
    `)
    .eq("purpose", "Venda")
    console.log("lista de propriedades na função publica", data)
  if (error) {
    console.error("Erro ao buscar os dados:", error)
    throw error // ou retorne null, dependendo da sua necessidade
  }

  return data
}
