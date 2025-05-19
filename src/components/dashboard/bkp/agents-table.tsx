"use client"

import { useState, useEffect, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { getAgents } from "@/lib/supabase/queries/client/dashboard/getAgents"
export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  creci: string
  role: string
  status: string
  cities: {name:string,id:string}
  estates: {name:string,id:string,uf:string}
  avatar_url?: string
}

export function AgentsTable() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()

  const loadAgents = useCallback(async (search?: string) => {
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
              agent.creci.toLowerCase().includes(searchLower)
          )
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
  }, [toast])

  useEffect(() => {
    loadAgents()
  }, [loadAgents])

  const handleSearch = useCallback(() => {
    setIsSearching(true)

    const debounceTimer = setTimeout(() => {
      loadAgents(searchTerm)
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, loadAgents])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAgents(agents)
      return
    }

    handleSearch()
  }, [searchTerm, agents, handleSearch])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar corretores..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => loadAgents()} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
        <Link href="/agents/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo Corretor
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
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
                    <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {error}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "Nenhum corretor encontrado com este termo de busca" : "Nenhum corretor cadastrado"}
                </TableCell>
              </TableRow>
            ) : (
              filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={agent?.avatar_url || "/placeholder.svg"} />
                        <AvatarFallback>{agent.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{agent.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{agent.email}</TableCell>
                  <TableCell>{agent.phone}</TableCell>
                  <TableCell className="hidden md:table-cell">{agent.creci}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={agent.role === "admin" ? "outline" : "secondary"}>
                      {agent.role === "admin" ? "Administrador" : "Corretor"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={agent.status === "Ativo" ? "default" : "secondary"}>{agent.status}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
