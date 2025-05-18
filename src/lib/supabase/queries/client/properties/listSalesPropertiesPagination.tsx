import { supabaseClient } from "@/lib/supabase/client"

export async function listSalesPropertiesPagination(page = 1, limit = 8, searchTerm = "", sortBy = "newest") {
  // Calcular o offset com base na página atual e no limite
  const offset = (page - 1) * limit

  // Iniciar a consulta base
  let query = supabaseClient()
    .from("properties")
    .select(
      `
      *,
      cities (name),
      neighborhoods (name),
      estates (name, uf),
      details:details(*),
      financeiro:financeiro(*),
      property_covers:property_covers(*)
    `,
      { count: "exact" },
    )
    .eq("purpose", "Venda")
    .eq("status", "Disponível")

  // Adicionar filtro de pesquisa se houver um termo
  if (searchTerm) {
    query = query.or(
      `details.title.ilike.%${searchTerm}%,cities.name.ilike.%${searchTerm}%,neighborhoods.name.ilike.%${searchTerm}%,details.shot_description.ilike.%${searchTerm}%`,
    )
  }

  // Aplicar ordenação
  switch (sortBy) {
    case "newest":
      query = query.order("created_at", { ascending: false })
      break
    case "oldest":
      query = query.order("created_at", { ascending: true })
      break
    case "price_asc":
      // Aqui precisamos de uma abordagem diferente, pois o preço está em uma tabela relacionada
      // Esta é uma simplificação, pode precisar de ajustes dependendo da estrutura do banco
      query = query.order("financeiro.price", { ascending: true, foreignTable: "financeiro" })
      break
    case "price_desc":
      query = query.order("financeiro.price", { ascending: false, foreignTable: "financeiro" })
      break
    case "area_asc":
      query = query.order("details.total_area", { ascending: true, foreignTable: "details" })
      break
    case "area_desc":
      query = query.order("details.total_area", { ascending: false, foreignTable: "details" })
      break
    default:
      query = query.order("created_at", { ascending: false })
  }

  // Aplicar paginação
  query = query.range(offset, offset + limit - 1)

  // Executar a consulta
  const { data, error, count } = await query

  if (error) {
    console.error("Error fetching properties:", error)
    throw error
  }

  // Calcular o número total de páginas
  const totalPages = count ? Math.ceil(count / limit) : 0

  return {
    properties: data || [],
    totalCount: count || 0,
    totalPages,
    currentPage: page,
  }
}
