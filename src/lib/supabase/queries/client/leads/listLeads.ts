import { supabaseClient } from "@/lib/supabase/client"

export async function listLeads() {
  const { data, error } = await supabaseClient()
    .from("leads")
    .select(`
      *`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching leads:", error)
    throw error
  }

  // Transformar os dados para um formato mais fácil de usar
  return data.map((lead) => ({
    id: lead.id,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    notes: lead.notes,
    interest: lead.interest,
    city: lead.cities?.name,
    estate: lead.estates?.uf,
    created_at: lead.created_at,
    updated_at: lead.updated_at,
    last_contact: lead.last_contact,
    url_image: lead.avatars_leads?.url_image
  }))
}