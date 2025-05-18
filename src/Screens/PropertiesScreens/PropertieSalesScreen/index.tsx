"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Plus,
  Sparkles,
  Pencil,
  Trash2,
  Eye,
  ArrowUpDown,
  Search,
  Home,
  ExternalLink,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Building,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import { ContainerScreen } from "@/components/modules/Containers/ContainerSceen"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GenericPagination } from "@/components/modules/Pagination/GenericPagination"
import { listSalesProperties } from "@/lib/supabase/queries/client/properties/listSalesProperties"

export function PropertiesSalesScreens() {
  const [properties, setProperties] = useState<any[]>([])
  const [filteredProperties, setFilteredProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [activeTab, setActiveTab] = useState("todos")

  const itemsPerPage = 5

  // Fetch properties data
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true)
      try {
        const data = await listSalesProperties()
        if (data) {
          setProperties(data)
          setFilteredProperties(data)
        } else {
          setProperties([])
          setFilteredProperties([])
        }
        setError(null)
      } catch (err) {
        console.error("Error fetching properties:", err)
        setError("Ocorreu um erro ao carregar os imóveis. Por favor, tente novamente.")
        setProperties([])
        setFilteredProperties([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Filter and sort properties
  useEffect(() => {
    let result = [...properties]

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (property) =>
          property.details?.[0]?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.neighborhoods?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.cities?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active"
      result = result.filter((property) => {
        const propertyStatus = property.details?.[0]?.status?.toLowerCase() || ""
        return isActive ? propertyStatus === "ativo" : propertyStatus === "inativo"
      })
    }

    // Filter by tab
    if (activeTab === "ativos") {
      result = result.filter((property) => (property.details?.[0]?.status?.toLowerCase() || "") === "ativo")
    } else if (activeTab === "inativos") {
      result = result.filter((property) => (property.details?.[0]?.status?.toLowerCase() || "") === "inativo")
    }

    // Sort properties
    switch (sortOrder) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case "price_high":
        result.sort((a, b) => Number(b.financeiro?.[0]?.price || 0) - Number(a.financeiro?.[0]?.price || 0))
        break
      case "price_low":
        result.sort((a, b) => Number(a.financeiro?.[0]?.price || 0) - Number(b.financeiro?.[0]?.price || 0))
        break
      default:
        break
    }

    setFilteredProperties(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [properties, searchTerm, statusFilter, sortOrder, activeTab])

  // Pagination
  const totalItems = filteredProperties.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }

  // Format price as currency
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(price))
  }

  // Count active and inactive properties
  const activeCount = properties.filter((p) => (p.details?.[0]?.status?.toLowerCase() || "") === "ativo").length
  const inactiveCount = properties.filter((p) => (p.details?.[0]?.status?.toLowerCase() || "") === "inativo").length

  return (
    <ContainerScreen>
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#008099]">Imóveis à Venda</h1>
            <p className="text-sm text-muted-foreground">Gerenciamento de imóveis disponíveis para venda</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar imóvel..."
                className="pl-8 w-full border-[#008099]/20 focus-visible:ring-[#008099]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <Link href={"/adicionar-imovel"}>
              <Button className="w-full sm:w-auto bg-[#008099] hover:bg-[#006a80]">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Imóvel
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="todos" className="data-[state=active]:bg-[#008099] data-[state=active]:text-white">
                Todos
              </TabsTrigger>
              <TabsTrigger value="ativos" className="data-[state=active]:bg-[#008099] data-[state=active]:text-white">
                Ativos
              </TabsTrigger>
              <TabsTrigger value="inativos" className="data-[state=active]:bg-[#008099] data-[state=active]:text-white">
                Inativos
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] border-[#008099]/20 focus:ring-[#008099]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px] border-[#008099]/20 focus:ring-[#008099]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigos</SelectItem>
                  <SelectItem value="price_high">Maior preço</SelectItem>
                  <SelectItem value="price_low">Menor preço</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-[#008099]/20 text-[#008099]">
                    <MoreHorizontal className="h-4 w-4 mr-2" />
                    Mais opções
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar listagem
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload className="h-4 w-4 mr-2" />
                    Importar imóveis
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Building className="h-4 w-4 mr-2" />
                    Gerenciar categorias
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="todos" className="mt-0">
            <Card className="border shadow-sm">
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="h-16 w-16 animate-spin text-[#008099] mb-4" />
                    <p className="text-xl font-medium">Carregando imóveis</p>
                    <p className="text-sm text-muted-foreground">Aguarde enquanto buscamos os dados...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="bg-red-50 p-4 rounded-full mb-4">
                      <AlertCircle className="h-16 w-16 text-red-500" />
                    </div>
                    <p className="text-xl font-medium">Erro ao carregar imóveis</p>
                    <p className="text-sm text-muted-foreground mb-6">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-[#008099] hover:bg-[#006a80]">
                      Tentar novamente
                    </Button>
                  </div>
                ) : currentItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="bg-[#008099]/10 p-4 rounded-full mb-4">
                      <Sparkles size={60} className="text-[#008099]" />
                    </div>
                    <p className="text-xl font-medium">Nenhum imóvel encontrado</p>
                    <p className="text-sm text-muted-foreground mb-6 max-w-md text-center">
                      {searchTerm || statusFilter !== "all"
                        ? "Não encontramos imóveis com os filtros selecionados. Tente outros critérios."
                        : "Não há imóveis cadastrados. Adicione um novo imóvel para começar."}
                    </p>
                    {searchTerm || statusFilter !== "all" ? (
                      <Button
                        onClick={() => {
                          setSearchTerm("")
                          setStatusFilter("all")
                        }}
                        variant="outline"
                        className="mr-2"
                      >
                        Limpar filtros
                      </Button>
                    ) : null}
                    <Link href={"/adicionar-imovel"}>
                      <Button className="bg-[#008099] hover:bg-[#006a80]">
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Imóvel
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="rounded-md border-0 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableHead className="w-[70px]">Imagem</TableHead>
                          <TableHead className="w-[200px] min-w-[150px]">
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#008099]">
                              <span>Título</span>
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="hidden md:table-cell">Localização</TableHead>
                          <TableHead>
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#008099]">
                              <span>Preço</span>
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="hidden lg:table-cell">Detalhes</TableHead>
                          <TableHead className="hidden sm:table-cell">Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentItems.map((property: any) => {
                          const imageUrl = property?.property_covers?.[0]?.url
                          const isActive = (property.details?.[0]?.status?.toLowerCase() || "") === "ativo"

                          return (
                            <TableRow key={property.id} className="group hover:bg-muted/20">
                              <TableCell className="p-2">
                                <div className="relative h-14 w-14 rounded-md overflow-hidden border bg-muted">
                                  {imageUrl ? (
                                    <Image
                                      src={imageUrl || "/placeholder.svg?height=56&width=56"}
                                      alt={property.details?.[0]?.title || "Imóvel"}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-muted">
                                      <Home className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                <div>
                                  <Link
                                    href={`/ficha-imovel/${property.id}`}
                                    className="hover:underline text-[#008099] flex items-center gap-1 font-medium"
                                  >
                                    <span className="line-clamp-2">{property.details?.[0]?.title || "Sem título"}</span>
                                    <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </Link>

                                  {/* Show location on mobile when location column is hidden */}
                                  <div className="text-xs text-muted-foreground md:hidden mt-1">
                                    {property.neighborhoods?.name}, {property.cities?.name}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="flex flex-col">
                                  <span>{property.neighborhoods?.name}</span>
                                  <span className="text-xs text-muted-foreground">{property.cities?.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                {formatPrice(String(property.financeiro?.[0]?.price || "0"))}
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.bedroom || 0} Quartos
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.bathroom || 0} Banheiros
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.garage || 0} Vagas
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.total_area || 0}m²
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                {isActive ? (
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex w-fit items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Ativo
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-amber-800 border-amber-300 bg-amber-50 hover:bg-amber-50 flex w-fit items-center gap-1"
                                  >
                                    <AlertCircle className="h-3 w-3" /> Inativo
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right p-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-[#008099]/10 hover:text-[#008099]"
                                    >
                                      <span className="sr-only">Abrir menu</span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                      >
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                      </svg>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/imoveis/${property.id}`} className="flex items-center">
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span>Visualizar</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                      <Link href={`/editar-imovel/${property.id}`} className="flex items-center">
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Excluir</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
              {!isLoading && !error && currentItems.length > 0 && (
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a{" "}
                    <span className="font-medium">{Math.min(indexOfLastItem, totalItems)}</span> de{" "}
                    <span className="font-medium">{totalItems}</span> imóveis
                  </div>
                  <GenericPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="ativos" className="mt-0">
            <Card className="border shadow-sm">
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="h-16 w-16 animate-spin text-[#008099] mb-4" />
                    <p className="text-xl font-medium">Carregando imóveis ativos</p>
                    <p className="text-sm text-muted-foreground">Aguarde enquanto buscamos os dados...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="bg-red-50 p-4 rounded-full mb-4">
                      <AlertCircle className="h-16 w-16 text-red-500" />
                    </div>
                    <p className="text-xl font-medium">Erro ao carregar imóveis</p>
                    <p className="text-sm text-muted-foreground mb-6">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-[#008099] hover:bg-[#006a80]">
                      Tentar novamente
                    </Button>
                  </div>
                ) : filteredProperties.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="bg-[#008099]/10 p-4 rounded-full mb-4">
                      <CheckCircle2 size={60} className="text-[#008099]" />
                    </div>
                    <p className="text-xl font-medium">Nenhum imóvel ativo encontrado</p>
                    <p className="text-sm text-muted-foreground mb-6 max-w-md text-center">
                      Não há imóveis ativos cadastrados no momento.
                    </p>
                    <Link href={"/adicionar-imovel"}>
                      <Button className="bg-[#008099] hover:bg-[#006a80]">
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Imóvel
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="rounded-md border-0 overflow-x-auto">
                    <Table>
                      {/* Table header and body similar to the "todos" tab */}
                      <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableHead className="w-[70px]">Imagem</TableHead>
                          <TableHead className="w-[200px] min-w-[150px]">
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#008099]">
                              <span>Título</span>
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="hidden md:table-cell">Localização</TableHead>
                          <TableHead>
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#008099]">
                              <span>Preço</span>
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="hidden lg:table-cell">Detalhes</TableHead>
                          <TableHead className="hidden sm:table-cell">Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Table rows would be similar to the "todos" tab but filtered for active properties */}
                        {filteredProperties.slice(0, 5).map((property: any) => {
                          const imageUrl = property?.property_covers?.[0]?.url

                          return (
                            <TableRow key={property.id} className="group hover:bg-muted/20">
                              <TableCell className="p-2">
                                <div className="relative h-14 w-14 rounded-md overflow-hidden border bg-muted">
                                  {imageUrl ? (
                                    <Image
                                      src={imageUrl || "/placeholder.svg?height=56&width=56"}
                                      alt={property.details?.[0]?.title || "Imóvel"}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-muted">
                                      <Home className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                <div>
                                  <Link
                                    href={`/ficha-imovel/${property.id}`}
                                    className="hover:underline text-[#008099] flex items-center gap-1 font-medium"
                                  >
                                    <span className="line-clamp-2">{property.details?.[0]?.title || "Sem título"}</span>
                                    <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </Link>

                                  {/* Show location on mobile when location column is hidden */}
                                  <div className="text-xs text-muted-foreground md:hidden mt-1">
                                    {property.neighborhoods?.name}, {property.cities?.name}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="flex flex-col">
                                  <span>{property.neighborhoods?.name}</span>
                                  <span className="text-xs text-muted-foreground">{property.cities?.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                {formatPrice(String(property.financeiro?.[0]?.price || "0"))}
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.bedroom || 0} Quartos
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.bathroom || 0} Banheiros
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.garage || 0} Vagas
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.total_area || 0}m²
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex w-fit items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" /> Ativo
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right p-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-[#008099]/10 hover:text-[#008099]"
                                    >
                                      <span className="sr-only">Abrir menu</span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                      >
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                      </svg>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/imoveis/${property.id}`} className="flex items-center">
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span>Visualizar</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                      <Link href={`/editar-imovel/${property.id}`} className="flex items-center">
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Excluir</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
              {!isLoading && !error && filteredProperties.length > 0 && (
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium">1</span> a{" "}
                    <span className="font-medium">{Math.min(5, filteredProperties.length)}</span> de{" "}
                    <span className="font-medium">{filteredProperties.length}</span> imóveis ativos
                  </div>
                  {/* Pagination for active properties tab would go here */}
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="inativos" className="mt-0">
            <Card className="border shadow-sm">
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="h-16 w-16 animate-spin text-[#008099] mb-4" />
                    <p className="text-xl font-medium">Carregando imóveis inativos</p>
                    <p className="text-sm text-muted-foreground">Aguarde enquanto buscamos os dados...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="bg-red-50 p-4 rounded-full mb-4">
                      <AlertCircle className="h-16 w-16 text-red-500" />
                    </div>
                    <p className="text-xl font-medium">Erro ao carregar imóveis</p>
                    <p className="text-sm text-muted-foreground mb-6">{error}</p>
                    <Button onClick={() => window.location.reload()} className="bg-[#008099] hover:bg-[#006a80]">
                      Tentar novamente
                    </Button>
                  </div>
                ) : filteredProperties.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="bg-amber-50 p-4 rounded-full mb-4">
                      <AlertCircle size={60} className="text-amber-500" />
                    </div>
                    <p className="text-xl font-medium">Nenhum imóvel inativo encontrado</p>
                    <p className="text-sm text-muted-foreground mb-6 max-w-md text-center">
                      Não há imóveis inativos cadastrados no momento.
                    </p>
                    <Button
                      onClick={() => setActiveTab("todos")}
                      variant="outline"
                      className="border-[#008099] text-[#008099]"
                    >
                      Ver todos os imóveis
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border-0 overflow-x-auto">
                    <Table>
                      {/* Table header and body similar to the "todos" tab */}
                      <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableHead className="w-[70px]">Imagem</TableHead>
                          <TableHead className="w-[200px] min-w-[150px]">
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#008099]">
                              <span>Título</span>
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="hidden md:table-cell">Localização</TableHead>
                          <TableHead>
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#008099]">
                              <span>Preço</span>
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead className="hidden lg:table-cell">Detalhes</TableHead>
                          <TableHead className="hidden sm:table-cell">Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Table rows would be similar to the "todos" tab but filtered for inactive properties */}
                        {filteredProperties.slice(0, 5).map((property: any) => {
                          const imageUrl = property?.property_covers?.[0]?.url

                          return (
                            <TableRow key={property.id} className="group hover:bg-muted/20">
                              <TableCell className="p-2">
                                <div className="relative h-14 w-14 rounded-md overflow-hidden border bg-muted">
                                  {imageUrl ? (
                                    <Image
                                      src={imageUrl || "/placeholder.svg?height=56&width=56"}
                                      alt={property.details?.[0]?.title || "Imóvel"}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-muted">
                                      <Home className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                <div>
                                  <Link
                                    href={`/ficha-imovel/${property.id}`}
                                    className="hover:underline text-[#008099] flex items-center gap-1 font-medium"
                                  >
                                    <span className="line-clamp-2">{property.details?.[0]?.title || "Sem título"}</span>
                                    <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </Link>

                                  {/* Show location on mobile when location column is hidden */}
                                  <div className="text-xs text-muted-foreground md:hidden mt-1">
                                    {property.neighborhoods?.name}, {property.cities?.name}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="flex flex-col">
                                  <span>{property.neighborhoods?.name}</span>
                                  <span className="text-xs text-muted-foreground">{property.cities?.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                {formatPrice(String(property.financeiro?.[0]?.price || "0"))}
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.bedroom || 0} Quartos
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.bathroom || 0} Banheiros
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.garage || 0} Vagas
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {property.details?.[0]?.total_area || 0}m²
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <Badge
                                  variant="outline"
                                  className="text-amber-800 border-amber-300 bg-amber-50 hover:bg-amber-50 flex w-fit items-center gap-1"
                                >
                                  <AlertCircle className="h-3 w-3" /> Inativo
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right p-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="hover:bg-[#008099]/10 hover:text-[#008099]"
                                    >
                                      <span className="sr-only">Abrir menu</span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                      >
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                      </svg>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/imoveis/${property.id}`} className="flex items-center">
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span>Visualizar</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                      <Link href={`/editar-imovel/${property.id}`} className="flex items-center">
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar</span>
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Excluir</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
              {!isLoading && !error && filteredProperties.length > 0 && (
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium">1</span> a{" "}
                    <span className="font-medium">{Math.min(5, filteredProperties.length)}</span> de{" "}
                    <span className="font-medium">{filteredProperties.length}</span> imóveis inativos
                  </div>
                  {/* Pagination for inactive properties tab would go here */}
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-l-4 border-l-[#008099]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Imóveis</p>
                <h3 className="text-2xl font-bold mt-1">{properties.length}</h3>
              </div>
              <div className="bg-[#008099]/10 p-3 rounded-full">
                <Building className="h-6 w-6 text-[#008099]" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground flex items-center">
              <span className="text-green-600 font-medium flex items-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M18 15L12 9L6 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                12%
              </span>
              <span className="ml-1">desde o mês passado</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Imóveis Ativos</p>
                <h3 className="text-2xl font-bold mt-1">{activeCount}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground flex items-center">
              <span className="text-green-600 font-medium flex items-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M18 15L12 9L6 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                8%
              </span>
              <span className="ml-1">desde o mês passado</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Imóveis Inativos</p>
                <h3 className="text-2xl font-bold mt-1">{inactiveCount}</h3>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground flex items-center">
              <span className="text-red-600 font-medium flex items-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                3%
              </span>
              <span className="ml-1">desde o mês passado</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border shadow-sm mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-[#008099]">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/adicionar-imovel" className="w-full">
              <Button
                variant="outline"
                className="h-auto py-4 w-full flex flex-col items-center justify-center border-[#008099]/20 hover:bg-[#008099]/5 hover:text-[#008099] hover:border-[#008099]"
              >
                <Plus className="h-5 w-5 mb-2" />
                <span>Novo Imóvel</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center border-[#008099]/20 hover:bg-[#008099]/5 hover:text-[#008099] hover:border-[#008099]"
            >
              <Download className="h-5 w-5 mb-2" />
              <span>Exportar</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center border-[#008099]/20 hover:bg-[#008099]/5 hover:text-[#008099] hover:border-[#008099]"
            >
              <Building className="h-5 w-5 mb-2" />
              <span>Categorias</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center border-[#008099]/20 hover:bg-[#008099]/5 hover:text-[#008099] hover:border-[#008099]"
            >
              <Filter className="h-5 w-5 mb-2" />
              <span>Filtros</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </ContainerScreen>
  )
}
