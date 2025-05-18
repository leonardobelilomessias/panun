import { supabaseClient } from "@/lib/supabase/client"

export async function deleteAgentById(id: string) {
  const { data, error } = await supabaseClient().from("agents").delete().eq("id", id)

  if (error) {
    console.error("Error deleting agent:", error)
    return { error }
  }

  return { data }
}
