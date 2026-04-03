"use client"

import { useState, useEffect, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw, PlusCircle, Filter, Download, MoreHorizontal, Mail, Phone } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { getAgents } from "@/lib/supabase/queries/client/dashboard/getAgents"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  creci: string
  role: string
  status: string
  cities: { name: string; id: string }
  estates: { name: string; id: string; uf: string }
  avatar_url?: string
}

export function AgentsTable() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const { toast } = useToast()

  const loadAgents = useCallback(
    async (search?: string) => {
      setLoading(true)
      setError(null)

      try {
        const serverSearch = search && search.trim().length > 2 ? search : undefined

        const result = await getAgents()

        if (result.error) {
          setError(result.error)
          toast({
            title: "Erro",
            description: result.error,
            variant: "destructive",
          })
          return
        }

        setAgents(result.agents)

        if (search && search.trim() !== "" && !serverSearch) {
          const searchLower = search.toLowerCase()
          setFilteredAgents(
            result.agents.filter(
              (agent) =>
                agent.name.toLowerCase().includes(searchLower) ||
                agent.email.toLowerCase().includes(searchLower) ||
                agent.creci.toLowerCase().includes(searchLower),
            ),
          )
        } else {
          setFilteredAgents(result.agents)
        }
      } catch (err) {
        console.error("Erro ao carregar agentes:", err)
        setError("Falha ao carregar a lista de agentes")
        toast({
          title: "Erro",
          description: "Não foi possível carregar os corretores",
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
    loadAgents()
  }, [loadAgents])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      let filtered = [...agents]

      // Aplicar filtro de status
      if (statusFilter !== "all") {
        filtered = filtered.filter((agent) => agent.status === statusFilter)
      }

      // Aplicar filtro de função
      if (roleFilter !== "all") {
        filtered = filtered.filter((agent) => agent.role === roleFilter)
      }

      setFilteredAgents(filtered)
      return
    }

    const delay = setTimeout(() => {
      loadAgents(searchTerm)
    }, 500)

    return () => clearTimeout(delay)
  }, [searchTerm, agents, loadAgents, statusFilter, roleFilter])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar corretores..."
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
              <SelectItem value="Ativo">Ativos</SelectItem>
              <SelectItem value="Inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => loadAgents()}
            disabled={loading}
            className="border-[#272525]/20 text-[#272525] hover:bg-[#272525]/10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>

          <Link href="/corretores/novo-corretor">
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
              <TableHead>Corretor</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="hidden md:table-cell">CRECI</TableHead>
              <TableHead className="hidden md:table-cell">Função</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                      <div className="h-5 w-24 bg-muted rounded animate-pulse"></div>
                    </div>
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
            ) : filteredAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {searchTerm || statusFilter !== "all" || roleFilter !== "all"
                    ? "Nenhum corretor encontrado com estes filtros"
                    : "Nenhum corretor cadastrado"}
                </TableCell>
              </TableRow>
            ) : (
              filteredAgents.map((agent) => (
                <TableRow key={agent.id} className="group hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="border-2 border-[#272525]/10">
                        <AvatarImage src={agent?.avatar_url || "/placeholder.svg?height=40&width=40"} />
                        <AvatarFallback className="bg-[#272525]/10 text-[#272525]">
                          {agent.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link href={`/agents/${agent.id}`} className="font-medium text-[#272525] hover:underline">
                          {agent.name}
                        </Link>
                        <div className="text-xs text-muted-foreground md:hidden">{agent.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                      {agent.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                      {agent.phone}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{agent.creci}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant={agent.role === "admin" ? "outline" : "secondary"}
                      className={agent.role === "admin" ? "border-[#272525]/30 text-[#272525]" : ""}
                    >
                      {agent.role === "admin" ? "Administrador" : "Corretor"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={agent.status === "Ativo" ? "default" : "secondary"}
                      className={agent.status === "Ativo" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    >
                      {agent.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filteredAgents.length > 0 && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>
            Mostrando <span className="font-medium">{filteredAgents.length}</span> corretores
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
