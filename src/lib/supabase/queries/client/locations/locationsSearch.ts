import { supabaseClient } from "@/lib/supabase/client"

// Buscar todos os estados
export async function fetchEstates() {
  try {
    const { data, error } = await supabaseClient()
      .from("estates")
      .select("id, name, uf")
      .order("name", { ascending: true })

    if (error) {
      console.error("Erro ao buscar estados:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Erro ao buscar estados:", error)
    return []
  }
}

// Buscar cidades (todas ou filtradas por estado)
export async function fetchCities(estateId?: string) {
  try {
    let query = supabaseClient().from("cities").select("id, name, estate_id")

    // Se um estateId for fornecido, filtrar por esse estado
    if (estateId && estateId !== "all") {
      query = query.eq("estate_id", estateId)
    }

    // Ordenar por nome
    query = query.order("name", { ascending: true })

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar cidades:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Erro ao buscar cidades:", error)
    return []
  }
}

// Buscar bairros por cidade
export async function fetchNeighborhoods(cityName?: string) {
  try {
    // Se não houver cityName, retornar array vazio
    if (!cityName || cityName === "all") return []

    // Primeiro, precisamos obter o ID da cidade pelo nome
    const { data: cityData, error: cityError } = await supabaseClient()
      .from("cities")
      .select("id")
      .eq("name", cityName)
      .single()

    if (cityError) {
      console.error("Erro ao buscar ID da cidade:", cityError)
      return []
    }

    if (!cityData) {
      console.error("Cidade não encontrada:", cityName)
      return []
    }

    // Agora buscamos os bairros usando o ID da cidade
    const { data, error } = await supabaseClient()
      .from("neighborhoods")
      .select("id, name")
      .eq("city_id", cityData.id)
      .order("name", { ascending: true })

    if (error) {
      console.error("Erro ao buscar bairros:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Erro ao buscar bairros:", error)
    return []
  }
}
