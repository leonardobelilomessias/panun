"use client"

import { useState, useEffect, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  PlusCircle,
  RefreshCw,
  Filter,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  User,
  Building,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { type Client, getClients } from "@/lib/supabase/queries/client/dashboard/getClients"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ClientsTable() {
  const [clients, setClients] = useState<Client[] | any>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredClients, setFilteredClients] = useState<Client[] | any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const { toast } = useToast()

  // Função para carregar clientes
  const loadClients = useCallback(
    async (search?: string) => {
      setLoading(true)
      setError(null)

      try {
        // Se tivermos um termo de pesquisa e a consulta estiver no servidor
        // podemos enviar diretamente para o servidor filtrar
        const serverSearch = search && search.trim().length > 2 ? search : undefined

        const result = await getClients(serverSearch)

        if (result.error) {
          setError(result.error)
          toast({
            title: "Erro",
            description: result.error,
            variant: "destructive",
          })
          return
        }
        if (!!result.clients) {
          setClients(result?.clients)
        }

        // Filtragem local para termos de pesquisa curtos
        if (search && search.trim() !== "" && !serverSearch) {
          const searchLower = search.toLowerCase()
          setFilteredClients(
            result?.clients.filter(
              (client) =>
                client.name.toLowerCase().includes(searchLower) ||
                client.email.toLowerCase().includes(searchLower) ||
                client.cities[0].name.toLowerCase().includes(searchLower),
            ),
          )
        } else {
          setFilteredClients(result.clients)
        }
      } catch (err) {
        console.error("Erro ao carregar clientes:", err)
        setError("Falha ao carregar a lista de clientes")
        toast({
          title: "Erro",
          description: "Não foi possível carregar os clientes",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
        setIsSearching(false)
      }
    },
    [toast],
  )

  // Carrega clientes iniciais
  useEffect(() => {
    loadClients()
  }, [loadClients])

  // Efeito para pesquisa e filtros
  useEffect(() => {
    if (searchTerm.trim() === "") {
      let filtered = [...clients]

      // Aplicar filtro de status
      if (statusFilter !== "all") {
        filtered = filtered.filter((client) => client.status === statusFilter)
      }

      // Aplicar filtro de tipo
      if (typeFilter !== "all") {
        filtered = filtered.filter((client) => client.type === typeFilter)
      }

      setFilteredClients(filtered)
      return
    }

    const delay = setTimeout(() => {
      loadClients(searchTerm)
    }, 500)

    return () => clearTimeout(delay)
  }, [searchTerm, clients, loadClients, statusFilter, typeFilter])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar clientes..."
            className="pl-8 border-[#272525]/20 focus-visible:ring-[#272525]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] border-[#272525]/20 focus:ring-[#272525]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => loadClients()}
            disabled={loading}
            className="border-[#272525]/20 text-[#272525] hover:bg-[#272525]/10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>

          <Link href="/clientes/novo-cliente">
            <Button className="bg-[#272525] hover:bg-[#006a80]">
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
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Skeleton loading para a tabela
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
                    <div className="h-5 w-20 bg-muted rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex justify-center py-4">
                    <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                    ? "Nenhum cliente encontrado com estes filtros"
                    : "Nenhum cliente cadastrado"}
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client: any) => (
                <TableRow key={client.id} className="group hover:bg-muted/20">
                  <TableCell className="font-medium">
                    <Link href={`/clients/${client.id}`} className="text-[#272525] hover:underline flex items-center">
                      {client.type === "Empresa" ? (
                        <Building className="h-4 w-4 mr-2 text-[#272525]/70" />
                      ) : (
                        <User className="h-4 w-4 mr-2 text-[#272525]/70" />
                      )}
                      {client.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                      {client.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                      {client.phone}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant={client.type === "Empresa" ? "outline" : "secondary"}
                      className={client.type === "Empresa" ? "border-[#272525]/30 text-[#272525]" : ""}
                    >
                      {client.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      {client.cities.name}/{client?.estates.uf}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={client.status === "active" ? "default" : "secondary"}
                      className={client.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    >
                      {client.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filteredClients.length > 0 && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>
            Mostrando <span className="font-medium">{filteredClients.length}</span> clientes
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-[#272525]/20 text-[#272525] hover:bg-[#272525]/10"
            >
              <Download className="h-3 w-3 mr-1" />
              Exportar
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-[#272525]/20 text-[#272525] hover:bg-[#272525]/10"
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
