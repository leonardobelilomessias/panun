"use client"

import { useState, useEffect, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  RefreshCw,
  PlusCircle,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { getOwners, type Owner } from "@/lib/supabase/queries/client/dashboard/getOwners"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function OwnersTable() {
  const [owners, setOwners] = useState<Owner[]>([])
  const [filteredOwners, setFilteredOwners] = useState<Owner[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const { toast } = useToast()

  const loadOwners = useCallback(
    async (search?: string) => {
      setLoading(true)
      setError(null)

      try {
        const serverSearch = search && search.trim().length > 2 ? search : undefined
        const result = await getOwners(serverSearch)

        if (result.error) {
          setError(result.error)
          toast({
            title: "Erro",
            description: result.error,
            variant: "destructive",
          })
          return
        }

        setOwners(result.owners)

        if (search && search.trim() !== "" && !serverSearch) {
          const searchLower = search.toLowerCase()
          setFilteredOwners(
            result.owners.filter(
              (owner) =>
                owner.name.toLowerCase().includes(searchLower) ||
                owner.email.toLowerCase().includes(searchLower) ||
                owner.city.toLowerCase().includes(searchLower),
            ),
          )
        } else {
          setFilteredOwners(result.owners)
        }
      } catch (err) {
        console.error("Erro ao carregar proprietários:", err)
        setError("Falha ao carregar os proprietários")
        toast({
          title: "Erro",
          description: "Não foi possível carregar os proprietários",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
        setIsSearching(false)
      }
    },
    [toast],
  )

  useEffect(() => {
    loadOwners()
  }, [loadOwners])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      let filtered = [...owners]

      // Aplicar filtro de status
      if (statusFilter !== "all") {
        filtered = filtered.filter((owner) => owner.status === statusFilter)
      }

      // Aplicar filtro de tipo
      if (typeFilter !== "all") {
        filtered = filtered.filter((owner) => owner.type === typeFilter)
      }

      setFilteredOwners(filtered)
      return
    }

    const delay = setTimeout(() => {
      loadOwners(searchTerm)
    }, 500)

    return () => clearTimeout(delay)
  }, [searchTerm, loadOwners, owners, statusFilter, typeFilter])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar proprietários..."
            className="pl-8 border-[#008099]/20 focus-visible:ring-[#008099]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] border-[#008099]/20 focus:ring-[#008099]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Ativo">Ativos</SelectItem>
              <SelectItem value="Inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => loadOwners()}
            disabled={loading}
            className="border-[#008099]/20 text-[#008099] hover:bg-[#008099]/10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>

          <Link href="/proprietarios/novo-proprietario">
            <Button className="bg-[#008099] hover:bg-[#006a80]">
              <PlusCircle className="h-4 w-4 mr-2" />
              Novo
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="hidden md:table-cell">Tipo</TableHead>
              <TableHead className="hidden md:table-cell">Cidade/UF</TableHead>
              <TableHead>Imóveis</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-5 w-32 bg-muted rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-28 bg-muted rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-12 bg-muted rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex justify-center py-4">
                    <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredOwners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                    ? "Nenhum proprietário encontrado com estes filtros"
                    : "Nenhum proprietário cadastrado"}
                </TableCell>
              </TableRow>
            ) : (
              filteredOwners.map((owner) => (
                <TableRow key={owner.id} className="group hover:bg-muted/20">
                  <TableCell className="font-medium">
                    <Link href={`/owners/${owner.id}`} className="text-[#008099] hover:underline flex items-center">
                      {owner.type === "Construtora" ? (
                        <Building className="h-4 w-4 mr-2 text-[#008099]/70" />
                      ) : (
                        <User className="h-4 w-4 mr-2 text-[#008099]/70" />
                      )}
                      {owner.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                      {owner.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                      {owner.phone}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant={owner.type === "Construtora" ? "outline" : "secondary"}
                      className={owner.type === "Construtora" ? "border-[#008099]/30 text-[#008099]" : ""}
                    >
                      {owner.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      {owner?.city}/{owner?.estate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-[#008099]/5 border-[#008099]/20">
                      {owner.propertyCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={owner.status === "Ativo" ? "default" : "secondary"}
                      className={owner.status === "Ativo" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    >
                      {owner.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filteredOwners.length > 0 && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>
            Mostrando <span className="font-medium">{filteredOwners.length}</span> proprietários
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-[#008099]/20 text-[#008099] hover:bg-[#008099]/10"
            >
              <Download className="h-3 w-3 mr-1" />
              Exportar
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-[#008099]/20 text-[#008099] hover:bg-[#008099]/10"
                >
                  <MoreHorizontal className="h-3 w-3 mr-1" />
                  Mais opções
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Imprimir listagem</DropdownMenuItem>
                <DropdownMenuItem>Enviar por email</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Gerenciar colunas</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  )
}
