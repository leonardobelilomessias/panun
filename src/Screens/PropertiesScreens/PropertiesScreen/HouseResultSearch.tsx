"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import { searchProperties } from "@/lib/supabase/queries/client/properties/searchProperties"
import { Loader2, Home, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ContainerCardsHouse } from "@/components/modules/Containers/ContainerCardsHouse/ContainerCardsHouse"
import { HouseSearchFilter } from "./HouseSearchFilter"
import { CardHouse } from "@/components/modules/Cards/CardHouse"
import { GenericPagination } from "@/components/modules/Pagination/GenericPagination"

interface HouseResultSearchProps {
  categoria?: string
  tipo?: string
  cidade?: string
  bairro?: string
}

// Fetcher configuration
const fetcher = async (key: string) => {
  const [, page, limit, categoria, tipo, cidade, bairro] = key.split(":")
  const result = await searchProperties(
    parseInt(page),
    parseInt(limit),
    categoria,
    tipo,
    cidade,
    bairro
  )
  return result
}

export function HouseResultSearch() {
  const searchParams = useSearchParams()
  const [changeSearch, setchangeSearch] = useState(false)
  const [categoria, setCategoria] = useState(searchParams.get('categoria')||"all");
  const [tipo, setTipo] = useState(searchParams.get("tipo")||"all");
  const [cidade, setCidade] = useState(searchParams.get("cidade")||"all");
  const [bairro, setBairro] = useState(searchParams.get("bairro")||"all");
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 2
  const router = useRouter()
  function clearFilters(){
    mutate()
    setCategoria("all")
    setCidade("all")
    setBairro("all")
    setTipo("all")

  }

  // Create a SWR key that changes when any filter or page changes
  const swrKey = `properties:${currentPage}:${limit}:${categoria}:${tipo}:${cidade}:${bairro}`

  // SWR configuration
  const { data, error, isLoading, mutate } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: true,
    keepPreviousData: true,
    onError: (err) => {
      console.error("Error fetching properties:", err)
    },
  })

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [categoria, tipo, cidade, bairro])

  // Pagination function
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (data?.totalPages || 1)) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Map data to the format expected by CardHouse
  const mappedProperties = data?.properties.map((property: any) => ({
    id: property.id,
    price: property.financeiro?.[0]?.price || 0,
    title: property.details?.[0]?.title || "Imóvel",
    description: property.details?.[0]?.shot_description || "",
    status: property.status || "",
    type: property.type_property || "",
    totalArea: property.details?.[0]?.total_area?.toString() || "",
    usableArea: property.details?.[0]?.usable_area?.toString() || "",
    bedrooms: property.details?.[0]?.bedroom?.toString() || "",
    bathrooms: property.details?.[0]?.bathroom?.toString() || "",
    suites: property.details?.[0]?.suites?.toString() || "",
    garageSpaces: property.details?.[0]?.garage?.toString() || "",
    floor: property.details?.[0]?.flor?.toString() || "",
    furnished: property.details?.[0]?.furnished?.toString() || "",
    cover: property.property_covers?.[0]?.url || "/placeholder.svg?height=300&width=400",
    neighborhood: property.neighborhoods?.name || "",
    city: property.cities.name || "",
    propurse: property.purpose || "",
  }))

  // Build search title
  const buildSearchTitle = () => {
    console.log("buscando imoveis buildSearchTitle")
    let title = "Imóveis"

    if (categoria) {
      title += categoria === "alugar" ? " para alugar" : " à venda"
    }

    if (tipo && tipo !== "all") {
      title += ` - ${tipo}`
    }

    if ((cidade && cidade !== "all") || (bairro && bairro !== "all")) {
      title += " em"
      if (bairro && bairro !== "all") title += ` ${bairro}`
      if (cidade && cidade !== "all" && bairro && bairro !== "all") title += ","
      if (cidade && cidade !== "all") title += ` ${cidade}`
    }

    return title

  }

  return (
    <div className="bg-gray-100 flex flex-col py-8">
      <ContainerCardsHouse>
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold">{buildSearchTitle()}</h1>
              <p className="text-sm text-muted-foreground">
                {isLoading
                  ? "Buscando imóveis..."
                  : data?.totalCount
                    ? `Encontramos ${data.totalCount} ${data.totalCount === 1 ? "imóvel" : "imóveis"} para você`
                    : "Nenhum imóvel encontrado com esses filtros"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categoria && categoria !== "all" && (
                <Badge variant="outline" className="text-xs">
                  {categoria === "alugar" ? "Para alugar" : "À venda"}
                </Badge>
              )}
              {tipo && tipo !== "all" && (
                <Badge variant="outline" className="text-xs">
                  {tipo}
                </Badge>
              )}
              {cidade && cidade !== "all" && (
                <Badge variant="outline" className="text-xs">
                  {cidade}
                </Badge>
              )}
              {bairro && bairro !== "all" && (
                <Badge variant="outline" className="text-xs">
                  {bairro}
                </Badge>
              )}
            </div>
          </div>

          <HouseSearchFilter
            categoria={categoria}
            tipo={tipo}
            cidade={cidade}
            bairro={bairro}
            setCategoria={setCategoria}
            setTipo={setTipo}
            setCidade={setCidade}
            setBairro={setBairro}
          />

        </div>

        <Separator className="mb-6" />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary-palet mb-4" />
            <p className="text-muted-foreground">Buscando imóveis...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Home className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Erro ao buscar imóveis</h3>
            <p className="text-muted-foreground mt-1">Ocorreu um erro ao buscar os imóveis. Tente novamente.</p>
            <Button onClick={() => mutate()} className="mt-4">
              Tentar novamente
            </Button>
          </div>
        ) : !mappedProperties || mappedProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Filter className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhum imóvel encontrado</h3>
            <p className="text-muted-foreground mt-1">
              Não encontramos imóveis com os filtros selecionados. Tente outras opções.
            </p>
            <Button variant="outline" onClick={() => clearFilters()} className="mt-4">
              Limpar filtros
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mappedProperties.map((property: any) => (
                <CardHouse
                  key={property.id}
                  id={property.id}
                  cover={property.cover}
                  price={property.price}
                  title={property.title}
                  description={property.description}
                  status={property.status}
                  type={property.type}
                  totalArea={property.totalArea}
                  usableArea={property.usableArea}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  suites={property.suites}
                  garageSpaces={property.garageSpaces}
                  floor={property.floor}
                  furnished={property.furnished}
                  neighborhood={property.neighborhood}
                  city={property.city}
                  propurse={property.propurse}
                />
              ))}
            </div>

            {data?.totalPages && data.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <GenericPagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  totalPages={data.totalPages}
                />
              </div>
            )}
          </>
        )}
      </ContainerCardsHouse>
    </div>
  )
}
