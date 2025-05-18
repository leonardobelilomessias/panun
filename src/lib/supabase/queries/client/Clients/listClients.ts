import { supabaseClient } from "@/lib/supabase/client"

export async function listClients() {
  const { data, error } = await supabaseClient()
    .from("clients")
    .select(`
      *,
      cities (name),
      estates (name, uf),
      neighborhoods (name)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching clients:", error)
    throw error
  }

  // Transformar os dados para um formato mais fácil de usar
  return data.map((client) => ({
    id: client.id,
    name: client.name,
    phone: client.phone,
    email: client.email,
    cpf: client.cpf,
    birth_date: client.birth_date,
    city_id: client.city_id,
    estate_id: client.estate_id,
    neighborhood_id: client.neighborhood_id,
    city: client.cities?.name,
    estate: client.estates?.uf,
    neighborhood: client.neighborhoods?.name,
    zipcode: client.zipcode,
    street: client.street,
    house_number: client.house_number,
    status: client.status,
    type: client.type,
    agent_id: client.agent_id,
    created_at: client.created_at,
    updated_at: client.updated_at,
  }))
}
