import { supabaseClient } from "@/lib/supabase/client"

export async function getClientById(id: string) {
  const { data, error } = await supabaseClient()
    .from("clients")
    .select(`
      *,
      cities (name),
      estates (name, uf),
      neighborhoods (name)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching client:", error)
    throw error
  }

  return {
    id: data.id,
    name: data.name,
    phone: data.phone,
    email: data.email,
    cpf: data.cpf,
    birth_date: data.birth_date,
    city_id: data.city_id,
    estate_id: data.estate_id,
    neighborhood_id: data.neighborhood_id,
    city: data.cities?.name,
    estate: data.estates?.uf,
    neighborhood: data.neighborhoods?.name,
    zipcode: data.zipcode,
    street: data.street,
    house_number: data.house_number,
    status: data.status,
    type: data.type,
    agent_id: data.agent_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
  }
}
