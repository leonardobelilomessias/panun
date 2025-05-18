"use server"
import { createClient } from "@/utils/supabase/server"

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  creci: string
  role: string
  status: string
  cities: {name:string,id:string}
  estates: {name:string,id:string,uf:string}
  avatar_url?: string
}

export async function getAgents(): Promise<{ agents: Agent[]; error: string | null }> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("agents")
      .select(`
        id,
        name,
        email,
        phone,
        creci,
        role,
        status,
        city_id,
        estate_id,
        cities(name),
        estates(uf)
      `)

    if (error) {
      console.error("Erro ao buscar agentes:", error)
      throw new Error("Erro ao buscar agentes")
    }

    const agents = data.map((agent: any) => ({
      ...agent,
      city: agent.cities?.name || "",
      estate: agent.estates?.uf || ""
    }))

    return { agents, error: null }
  } catch (err) {
    console.error("Erro ao buscar agentes:", err)
    return { agents: [], error: "Erro ao carregar a lista de agentes" }
  }
}
