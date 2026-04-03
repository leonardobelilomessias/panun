"use client"

import { useState } from "react"
import type React from "react"

import { Separator } from "@/components/ui/separator"
import { CardHouse } from "@/components/modules/Cards/CardHouse"
import { GenericPagination } from "@/components/modules/Pagination/GenericPagination"
import useSWR from "swr"
import { Building, Home, Loader2, Search, MapPin, SlidersHorizontal, ArrowDownUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { listSalesPropertiesPagination } from "@/lib/supabase/queries/client/properties/listSalesPropertiesPagination"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { listRentPropertiesPagination } from "@/lib/supabase/queries/client/properties/listRentPropertiesPagination"

// Configuração do fetcher
const fetcher = async ([page, limit, searchTerm, sortBy]: [number, number, string, string]) => {
  const result = await listRentPropertiesPagination(page, limit, searchTerm, sortBy)
  return result
}

export function RentPropertiesScreen() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const limit = 8

  // Configuração do SWR
  const { data, error, isLoading, mutate } = useSWR([currentPage, limit, searchTerm, sortBy], fetcher, {
    revalidateOnFocus: true,
    keepPreviousData: true,
  })

  // Função de paginação
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (data?.totalPages || 1)) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Função para lidar com a pesquisa
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Resetar para a primeira página ao pesquisar
    mutate() // Forçar revalidação dos dados
  }

  // Mapear os dados para o formato esperado pelo CardHouse
  const mappedProperties = data?.properties.map((property: any) => ({
    id: property.id,
    price: property.financeiro?.[0]?.price || 0,
    title: property.details?.[0]?.title || "Imóvel à venda",
    description: property.details?.[0]?.shot_description || "",
    status: property.details?.[0]?.status || "",
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
    city: property.cities?.name || "",
    propurse: property.purpose || "Venda",
  }))

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#272525] to-[#00a0bf] py-16 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge
              variant="outline"
              className="text-lg py-2 px-6 border-white text-white font-medium bg-white/10 backdrop-blur-sm"
            >
              <Home className="mr-2 h-5 w-5" />
              Imóveis para Alugar
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Encontre o Imóvel dos Seus Sonhos</h1>
            <p className="text-xl opacity-90 mt-2">
              Explore nossa seleção exclusiva de propriedades para alugar em localizações privilegiadas
            </p>
          </div>

          <div className="mt-8 max-w-4xl mx-auto">
            <Card className="p-4 shadow-lg border-0">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    disabled
                    type="text"
                    placeholder="Buscar por título, cidade, bairro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-[#272525]/20 focus-visible:ring-[#272525]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#272525] text-[#272525] hover:bg-[#272525]/10"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Button type="submit" className="bg-[#272525] hover:bg-[#006a80]">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </form>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-[#272525] mb-1 block">Tipo de Imóvel</label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartamento</SelectItem>
                        <SelectItem value="house">Casa</SelectItem>
                        <SelectItem value="commercial">Comercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#272525] mb-1 block">Faixa de Preço</label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Qualquer preço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-500000">Até R$ 500.000</SelectItem>
                        <SelectItem value="500000-1000000">R$ 500.000 - R$ 1.000.000</SelectItem>
                        <SelectItem value="1000000+">Acima de R$ 1.000.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#272525] mb-1 block">Quartos</label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Qualquer quantidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1+ quartos</SelectItem>
                        <SelectItem value="2">2+ quartos</SelectItem>
                        <SelectItem value="3">3+ quartos</SelectItem>
                        <SelectItem value="4">4+ quartos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-muted-foreground">
            {data?.totalCount ? (
              <>
                Mostrando <span className="font-medium">{mappedProperties?.length || 0}</span> de{" "}
                <span className="font-medium">{data.totalCount}</span> imóveis
              </>
            ) : (
              "Carregando resultados..."
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:inline">Ordenar por:</span>
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[180px] border-[#272525]/20 focus:ring-[#272525]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigos</SelectItem>
                {/* <SelectItem value="price_asc">Menor preço</SelectItem>
                <SelectItem value="price_desc">Maior preço</SelectItem>
                <SelectItem value="area_asc">Menor área</SelectItem>
                <SelectItem value="area_desc">Maior área</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="mb-8" />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
            <Loader2 className="h-16 w-16 animate-spin text-[#272525] mb-6" />
            <h3 className="text-xl font-medium mb-2">Buscando imóveis</h3>
            <p className="text-muted-foreground">Estamos encontrando as melhores opções para você...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg shadow-sm">
            <div className="bg-red-50 p-4 rounded-full mb-6">
              <Building className="h-16 w-16 text-red-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">Erro ao carregar imóveis</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Ocorreu um erro ao buscar os imóveis. Por favor, tente novamente ou entre em contato com nosso suporte.
            </p>
            <Button onClick={() => mutate()} className="bg-[#272525] hover:bg-[#006a80]">
              Tentar novamente
            </Button>
          </div>
        ) : mappedProperties?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg shadow-sm">
            <div className="bg-[#272525]/10 p-4 rounded-full mb-6">
              <Home className="h-16 w-16 text-[#272525]" />
            </div>
            <h3 className="text-xl font-medium mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchTerm
                ? `Não encontramos imóveis para "${searchTerm}". Tente outros termos ou remova alguns filtros.`
                : "Não há imóveis à venda disponíveis no momento. Por favor, volte em breve."}
            </p>
            {searchTerm && (
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                className="border-[#272525] text-[#272525] hover:bg-[#272525]/10"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar busca
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mappedProperties?.map((property: any) => (
                <div key={property.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardHouse
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
                </div>
              ))}
            </div>

            {/* Destaque de Serviços */}
            <div className="mt-16 mb-8">
              <div className="flex items-center justify-center mb-8">
                <div className="h-1 w-16 bg-[#272525] mr-4"></div>
                <h2 className="text-2xl font-bold text-center">Nossos Serviços para Compradores</h2>
                <div className="h-1 w-16 bg-[#272525] ml-4"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-t-4 border-t-[#272525] hover:shadow-lg transition-all">
                  <div className="bg-[#272525]/10 p-3 rounded-full w-fit mb-4">
                    <MapPin className="h-6 w-6 text-[#272525]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#272525]">Visitas Personalizadas</h3>
                  <p className="text-muted-foreground">
                    Agende visitas aos imóveis de seu interesse com nossos consultores especializados.
                  </p>
                </Card>

                <Card className="p-6 border-t-4 border-t-[#272525] hover:shadow-lg transition-all">
                  <div className="bg-[#272525]/10 p-3 rounded-full w-fit mb-4">
                    <ArrowDownUp className="h-6 w-6 text-[#272525]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#272525]">Assessoria em Negociação</h3>
                  <p className="text-muted-foreground">
                    Conte com nossa experiência para negociar as melhores condições na compra do seu imóvel.
                  </p>
                </Card>

                <Card className="p-6 border-t-4 border-t-[#272525] hover:shadow-lg transition-all">
                  <div className="bg-[#272525]/10 p-3 rounded-full w-fit mb-4">
                    <Building className="h-6 w-6 text-[#272525]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#272525]">Suporte Jurídico</h3>
                  <p className="text-muted-foreground">
                    Oferecemos assessoria jurídica completa para garantir segurança em toda a transação.
                  </p>
                </Card>
              </div>
            </div>
          </>
        )}

        {data?.totalPages && data.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <GenericPagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={data.totalPages} />
          </div>
        )}

        {/* CTA Final */}
        <div className="mt-16 bg-[#272525] text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Não encontrou o que procura?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Entre em contato com nossa equipe e compartilhe suas necessidades. Podemos ajudar a encontrar o imóvel
            perfeito para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="font-medium">
              Falar com um consultor
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-[#272525]">
              Ver lançamentos
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
