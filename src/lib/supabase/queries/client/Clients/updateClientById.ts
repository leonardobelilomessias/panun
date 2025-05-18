import { supabaseClient } from "@/lib/supabase/client"

export async function updateClientById(id: string, clientData: any) {
  const { data, error } = await supabaseClient().from("clients").update(clientData).eq("id", id).select()

  if (error) {
    console.error("Error updating client:", error)
    return { error }
  }

  return { data }
}
