import { createClient } from "@/utils/supabase/server"
import { Plus, Sparkles, Pencil, Trash2, Eye, ArrowUpDown, Search, Home, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import { ContainerScreen } from "@/components/modules/Containers/ContainerSceen"
import { listSalesProperties } from "@/lib/supabase/queries/client/properties/listSalesProperties"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { listRentProperties } from "@/lib/supabase/queries/client/properties/listRentProperties"

export async function PropertieRentScreen({ properties }: { properties: any }) {
  const dataSales = await listRentProperties()

  // Format price as currency
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(price))
  }

  return (
    <ContainerScreen>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Imóveis à Venda</h1>
          <p className="text-sm text-muted-foreground">Gerenciamento de imóveis disponíveis para venda</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar imóvel..." className="pl-8 w-full" />
          </div>
          <Link href={"/adicionar-imovel"}>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Imóvel
            </Button>
          </Link>
        </div>
      </div>

      <Separator className="my-4" />

      <Card className="border shadow-sm">
        <CardContent className="p-0">
          {dataSales == null || dataSales == undefined || dataSales?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Sparkles size={60} className="text-muted-foreground mb-4" />
              <p className="text-xl font-medium">Nenhum imóvel encontrado</p>
              <p className="text-sm text-muted-foreground mb-4">Adicione um imóvel para começar</p>
              <Link href={"/adicionar-imovel"}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Imóvel
                </Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-md border-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[70px]">Imagem</TableHead>
                    <TableHead className="w-[200px] min-w-[150px]">
                      <div className="flex items-center space-x-1">
                        <span>Título</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Localização</TableHead>
                    <TableHead>
                      <div className="flex items-center space-x-1">
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
                  {dataSales.map((property:any) => {
                    // Assuming property.images is an array of image URLs
                    // If not available, we'll use a placeholder
                    
                    const imageUrl =  property?.property_covers[0]?.url

                    return (
                      
                      <TableRow key={property.id}>
                        
                        <TableCell className="p-2">
                          <div className="relative h-14 w-14 rounded-md overflow-hidden border bg-muted">
                            {imageUrl ? (
                              <Image
                                src={imageUrl || "/placeholder.svg"}
                                alt={property.details[0].title || "Imóvel"}
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
                              className="hover:underline text-primary flex items-center gap-1 font-medium"
                            >
                              <span className="line-clamp-2">{property.details[0].title || "Sem título"}</span>
                              <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            </Link>

                            {/* Show location on mobile when location column is hidden */}
                            <div className="text-xs text-muted-foreground md:hidden mt-1">
                              {property.neighborhoods.name}, {property.cities.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col">
                            <span>{property.neighborhoods.name}</span>
                            <span className="text-xs text-muted-foreground">{property.cities.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatPrice(String(property.financeiro[0]?.price || "0"))}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">
                              {property.details[0].bedroom} Quartos
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {property.details[0].bathroom} Banheiros
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {property.details[0].garage} Vagas
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {property.details[0].total_area}m²
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge>Venda</Badge>
                        </TableCell>
                        <TableCell className="text-right p-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
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
                                <Link href={`/imoveis/${property.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Visualizar</span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/editar-imovel/${property.id}`}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  <span>Editar</span>
                                </Link>
                              </DropdownMenuItem>
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
      </Card>
    </ContainerScreen>
  )
}
