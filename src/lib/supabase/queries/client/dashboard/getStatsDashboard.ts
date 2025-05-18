"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers"

export async function getStatsDashboard() {
  try {
      const supabase = await createClient();
    
    // Obtém o total de clientes
    const { count: totalClients, error: clientsError } = await supabase
      .from("clients")
      .select("id", { count: "exact", head: true })
    
    if (clientsError) {
      console.error("Erro ao buscar clientes:", clientsError)
      throw new Error("Erro ao buscar dados de clientes")
    }
    
    // Obtém o total de corretores
    const { count: totalAgents, error: agentsError } = await supabase
      .from("agents")
      .select("id", { count: "exact", head: true })
    
    if (agentsError) {
      console.error("Erro ao buscar corretores:", agentsError)
      throw new Error("Erro ao buscar dados de corretores")
    }
    
    // Obtém o total de proprietários
    const { count: totalOwners, error: ownersError } = await supabase
      .from("owners")
      .select("id", { count: "exact", head: true })
    
    if (ownersError) {
      console.error("Erro ao buscar proprietários:", ownersError)
      throw new Error("Erro ao buscar dados de proprietários")
    }
    
    // Obtém o total de imóveis
    const { count: totalProperties, error: propertiesError } = await supabase
      .from("properties")
      .select("id", { count: "exact", head: true })
    
    if (propertiesError) {
      console.error("Erro ao buscar imóveis:", propertiesError)
      throw new Error("Erro ao buscar dados de imóveis")
    }
    
    return {
      totalClients: totalClients || 0,
      totalAgents: totalAgents || 0,
      totalOwners: totalOwners || 0,
      totalProperties: totalProperties || 0,
      error: null
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    return {
      totalClients: 0,
      totalAgents: 0,
      totalOwners: 0,
      totalProperties: 0,
      error: "Erro ao carregar estatísticas"
    }
  }
}