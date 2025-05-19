'use server'
import { createClient } from "@/utils/supabase/server"

export async function getAgentById(id: string) {
  const supabase = await createClient()

  // Fetch agent data with related entities
  const { data: agent, error } = await supabase
    .from("agents")
    .select(`
      *,
      avatars_agents(url_image,path),
      cities:city_id(name,id),
      estates:estate_id(name,id),
      neighborhoods:neighborhood_id(name,id)
    `)
    .eq("id", id)
    .single()

  if (error || !agent) {
    return null
  }

  return agent
}