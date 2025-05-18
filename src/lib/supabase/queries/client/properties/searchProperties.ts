import { supabaseClient } from "@/lib/supabase/client"

export async function searchProperties(page = 1, limit = 8, categoria = "", tipo = "", cidade = "", bairro = "") {
  // Calcular o offset com base na página atual e no limite
  const offset = (page - 1) * limit
console.log(page,limit,cidade)
  try {
    // Construir a consulta base
    let query = supabaseClient()
      .from("properties")
      .select(
        `
        id,
        street,
        house_number,
        zipcode,
        purpose,
        type_property,
        status,
        created_at,
        cities!inner (id, name),
        neighborhoods!inner (id, name),
        estates!inner (id, name, uf),
        details!inner (
          id, 
          title, 
          shot_description, 
          full_description, 
          garage, 
          bathroom, 
          bedroom, 
          total_area, 
          usable_area, 
          furnished, 
          flor
        ),
        financeiro!inner (id, price, iptu, condominium),
        property_covers (id, url)
      `,
        { count: "exact" },
      )
      .eq("status", "Disponível")

    
    // Aplicar filtros - ignorando valores vazios ou "all"
    if (categoria && categoria !== "all") {
      const purpose = categoria === "alugar" ? "Aluguel" : "Venda"
      query = query.eq("purpose", purpose)
    }
    if (tipo && tipo !== "all") {
      query = query.eq("type_property", tipo)
    }

    if (cidade && cidade !== "all") {
      query = query.eq("cities.name", cidade)
    }

    if (bairro && bairro !== "all") {
      query = query.eq("neighborhoods.name", bairro)
    }

    // Aplicar ordenação (mais recentes primeiro)
    query = query.order("created_at", { ascending: false })

    // Aplicar paginação
    query = query.range(offset, offset + limit - 1)
    
    // Executar a consulta
    const { data, error, count } = await query

    if (error) {
      console.error("Erro na consulta:", error)
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
  } catch (error) {
    console.error("Erro ao buscar propriedades:", error)
    throw error
  }
}
