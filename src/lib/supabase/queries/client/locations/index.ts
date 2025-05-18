import { supabaseClient } from "@/lib/supabase/client";



export async function fetchEstates() {
  const { data, error } = await supabaseClient()
    .from("estates")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function fetchCities(estateId?: string) {
  let query = supabaseClient().from("cities").select("id, name, estate_id")

  // Se um estateId for fornecido, filtrar por esse estado
  if (estateId) {
    query = query.eq("estate_id", estateId)
  }

  // Ordenar por nome
  query = query.order("name", { ascending: true })

  const { data, error } = await query

  if (error) throw new Error(error.message)
  return data
}

export async function fetchNeighborhoods(cityId: string) {
  const { data, error } = await supabaseClient()
    .from("neighborhoods")
    .select("id, name")
    .eq("city_id", cityId)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}
