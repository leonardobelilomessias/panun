import { supabaseClient } from "@/lib/supabase/client"

export async function deletePropertyById(id: string) {
  const { data, error } = await supabaseClient().from("properties").delete().eq("id", id)

  if (error) {
    console.error("Error deleting agent:", error)
    return { error }
  }

  return { data }
}
