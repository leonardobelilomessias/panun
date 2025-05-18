import { supabaseClient } from "@/lib/supabase/client"

export async function deleteClientById(id: string) {
  const { data, error } = await supabaseClient().from("clients").delete().eq("id", id)

  if (error) {
    console.error("Error deleting client:", error)
    return { error }
  }

  return { data }
}
