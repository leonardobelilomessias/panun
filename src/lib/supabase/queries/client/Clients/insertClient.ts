import { supabaseClient } from "@/lib/supabase/client"

export async function insertClient(clientData: any) {
  const { data, error } = await supabaseClient().from("clients").insert([clientData]).select()

  if (error) {
    console.error("Error inserting client:", error)
    return { error }
  }

  return { data }
}
