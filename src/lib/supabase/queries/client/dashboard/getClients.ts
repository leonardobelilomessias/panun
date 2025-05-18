'use server'
import { createClient } from "@/utils/supabase/server"

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  type: string
  status: string
  cities: {name:string,id:string}
  estates: {name:string,id:string,uf:string}
  created_at: string
}

export async function getClients(searchQuery?: string) {
  try {
    const supabase = await createClient()

    let query = supabase
      .from("clients")
      .select(`
        id,
        name,
        email,
        phone,
        type,
        status,
        city_id,
        estate_id,
        created_at,
        cities(id, name),
        estates(name,id,uf)
      `)
      .order("created_at", { ascending: false })

    // if (searchQuery && searchQuery.trim() !== "") {
    //   query = query.or(`
    //     name.ilike.%${searchQuery}%,
    //     email.ilike.%${searchQuery}%
    //   `)
    // }

    const { data, error } = await query
    if (error) {
      console.error("Erro ao buscar clientes servidor:", error)
      throw new Error("Erro ao buscar clientes")
    }
    // const newData = data.map((client)=>(   
    // {  id: client.id,
    //   name: client.name,
    //   email: client.email,
    //   phone: client.phone,
    //   type: client.type,
    //   status: client.status,
    //   cities: {name:client.cities[0].name,id:client.cities[0].id},
    //   estates: {name:client.estates[0].name,id:client.estates[0].id},
    //   created_at: client.created_at}))
    return {
      clients: data,
      error: null
    }
  } catch (error) {
    console.error("Erro ao buscar clientes:", error)
    return {
      clients: [],
      error: "Erro ao carregar a lista de clientes"
    }
  }
}
