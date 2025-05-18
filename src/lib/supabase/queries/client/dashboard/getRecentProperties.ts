"use server"

import { PropertySingle } from "@/types/typesPropeties"
import { createClient } from "@/utils/supabase/server"



export async function getRecentProperties(purpose: "Venda" | "Aluguel", limit: number = 3) {
  try {
    const supabase = await  createClient()
    
    const { data, error }:{ data: PropertySingle[] | null|undefined|any, error: any } = await supabase
      .from("properties")
      .select(`
      id,
      street,
      house_number,
      zipcode,
      status,
      created_at,
      updated_at,
      owners(id, name, email),
      agents(id, name, email),
      cities(id, name),
      neighborhoods(id, name),
      estates(id, name),
      property_covers(
        id,
        property_id,
        url,
        path,
        created_at,
        updated_at
      ),
      details(
        id,
        title,
        full_description,
        shot_description,
        garage,
        bathroom,
        bedroom,
        total_area,
        usable_area,
        reference_point,
        furnished,
        flor,
        status,
        address,
        created_at,
        updated_at
      ),
      financeiro(
        id,
        price,
        iptu,
        condominium,
        commission,
        status,
        created_at,
        updated_at
      )
    `)
      .eq("purpose", purpose)
      .eq("status", "Disponível")
      .order("created_at", { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error(`Erro ao buscar imóveis para ${purpose}:`, error)
      throw new Error(`Erro ao buscar imóveis para ${purpose}`)
    }
    const toReturn = data as PropertySingle[]
    return {
      properties: toReturn,
      error: null
    }
  } catch (error) {
    console.error(`Erro ao buscar imóveis para ${purpose}:`, error)
    return {
      properties: [],
      error: `Erro ao carregar imóveis para ${purpose}`
    }
  }
}