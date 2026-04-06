"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function createProperty(formData: any) {
  const supabase = await createClient()
  try {
    const { error: testError } = await supabase.from("properties").select("count").limit(1)
    if (testError) {
      console.error("Erro ao conectar com o Supabase:", testError)
      return { success: false, error: "Erro de conexão com o banco de dados" }
    }

    // 1. Inserir na tabela properties
    const { data: propertyData, error: propertyError } = await supabase
      .from("properties")
      .insert({
        id_owner: formData.id_owner,
        id_agent: formData.id_agent,
        street: formData.street,
        house_number: formData.house_number,
        zipcode: formData.zipcode,
        status: formData.status,
        city_id: formData.city_id,
        neighborhood_id: formData.neighborhood_id,
        estate_id: formData.estate_id,
        purpose: formData.purpose,
      })
      .select()
      .single()

    if (propertyError) throw propertyError

    const propertyId = propertyData.id

    // 2. Inserir na tabela details
    const { error: detailsError } = await supabase.from("details").insert({
      title: formData.title,
      propertie_id: propertyId,
      full_description: formData.full_description,
      shot_description: formData.shot_description,
      garage: Number.parseInt(formData.garage),
      bathroom: Number.parseInt(formData.bathroom),
      bedroom: Number.parseInt(formData.bedroom),
      total_area: Number.parseFloat(formData.total_area),
      usable_area: Number.parseFloat(formData.usable_area),
      reference_point: formData.reference_point,
      furnished: formData.furnished,
      flor: formData.flor ? Number.parseInt(formData.flor) : null,
      address: formData.address,
      status: formData.details_status,
    })

    if (detailsError) throw detailsError

    // 3. Inserir na tabela financeiro
    const { error: financeError } = await supabase.from("financeiro").insert({
      propertie_id: propertyId,
      price: Number.parseFloat(formData.price),
      iptu: formData.iptu ? Number.parseFloat(formData.iptu) : null,
      condominium: formData.condominium ? Number.parseFloat(formData.condominium) : null,
      commission: formData.commission ? Number.parseFloat(formData.commission) : null,
      status: formData.finance_status,
    })

    if (financeError) throw financeError

    // 4. Inserir amenidades se houver
    if (formData.amenities && formData.amenities.length > 0) {
      const amenitiesDetails = formData.amenities.map((amenityId: string) => ({
        id_propertie: propertyId,
        id_amenitie: amenityId,
      }))

      const { error: amenitiesError } = await supabase.from("amenities_details").insert(amenitiesDetails)

      if (amenitiesError) throw amenitiesError
    }

    // 5. Retornar o ID da propriedade para uso no upload de imagens
    return { success: true, propertyId }
  } catch (error) {
    console.error("Erro ao criar propriedade:", error)
    return { success: false, error }
  }
}

export async function getEstates() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.from("estates").select("*").order("name")

    if (error) {
      console.error("Erro ao buscar estados:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exceção ao buscar estados:", error)
    return []
  }
}

export async function getCities(estateId?: string) {
  const supabase = await createClient()
  try {
    let query = supabase.from("cities").select("*").order("name")

    if (estateId) {
      query = query.eq("estate_id", estateId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar cidades:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exceção ao buscar cidades:", error)
    return []
  }
}

export async function getNeighborhoods(cityId?: string) {
  const supabase = await createClient()
  try {
    let query = supabase.from("neighborhoods").select("*").order("name")

    if (cityId) {
      query = query.eq("city_id", cityId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar bairros:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exceção ao buscar bairros:", error)
    return []
  }
}

export async function getOwners() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("owners")
      .select("*")
      .eq("status", "Ativo")
      .order("name")

    if (error) {
      console.error("Erro ao buscar proprietários:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exceção ao buscar proprietários:", error)
    return []
  }
}

export async function searchOwners(searchTerm: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("owners")
      .select("*")
      .eq("status", "Ativo")
      .ilike("name", `%${searchTerm}%`)
      .order("name")

    if (error) {
      console.error("Erro ao buscar proprietários por termo:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exceção ao buscar proprietários por termo:", error)
    return []
  }
}

export async function getAgents() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("status", "Ativo")
      .order("name")

    if (error) {
      console.error("Erro ao buscar agentes:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exceção ao buscar agentes:", error)
    return []
  }
}

export async function getAmenities() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.from("amenities").select("*").order("name")

    if (error) {
      console.error("Erro ao buscar amenidades:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Exceção ao buscar amenidades:", error)
    return []
  }
}