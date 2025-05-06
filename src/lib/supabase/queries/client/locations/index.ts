import { supabaseClient } from "@/lib/supabase/client";



export async function fetchEstates() {
  const { data, error } = await supabaseClient()
    .from("estates")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function fetchCities(estateId: string) {
  const { data, error } = await supabaseClient()
    .from("cities")
    .select("id, name")
    .eq("estate_id", estateId)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
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
