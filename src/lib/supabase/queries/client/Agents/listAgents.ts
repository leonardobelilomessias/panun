import { supabaseClient } from "@/lib/supabase/client"

export async function listAgents() {
  const { data, error } = await supabaseClient()
    .from("agents")
    .select(`
      *,
      avatars_agents(url_image),
      cities (name),
      estates (name, uf),
      neighborhoods (name)
    `)
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching agents:", error)
    throw error
  }

  // Transformar os dados para um formato mais fácil de usar
  return data.map((agent) => ({
    id: agent.id,
    name: agent.name,
    phone: agent.phone,
    email: agent.email,
    creci: agent.creci,
    role: agent.role,
    status: agent.status,
    city: agent.cities?.name,
    estate: agent.estates?.uf,
    neighborhood: agent.neighborhoods?.name,
    created_at: agent.created_at,
    updated_at: agent.updated_at,
    url_image:agent.url_image,
    cpf:agent.cpf
  }))
}
