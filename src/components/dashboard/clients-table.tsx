"use client"

import { useState, useEffect, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, PlusCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Client, getClients } from "@/lib/supabase/queries/client/dashboard/getClients"

export function ClientsTable() {
  const [clients, setClients] = useState<Client[]| any>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredClients, setFilteredClients] = useState<Client[]|any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()

  // Função para carregar clientes
  const loadClients = useCallback(async (search?: string) => {
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
      if(!!result.clients){
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
              client.cities[0].name.toLowerCase().includes(searchLower)
          )
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
  }, [toast])

  // Carrega clientes iniciais
  useEffect(() => {
    loadClients()
  }, [loadClients])

  // Função para lidar com a pesquisa
  const handleSearch = useCallback(() => {
    setIsSearching(true)
    
    // Debounce para não sobrecarregar com muitas requisições
    const debounceTimer = setTimeout(() => {
      loadClients(searchTerm)
    }, 500)
    
    return () => clearTimeout(debounceTimer)
  }, [searchTerm, loadClients])

  // Efeito para pesquisa
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredClients(clients)
      return
    }
    
    handleSearch()
  }, [searchTerm, clients, handleSearch])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar clientes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => loadClients()} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
        <Link href="/clients/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
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
                    <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {error}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "Nenhum cliente encontrado com este termo de busca" : "Nenhum cliente cadastrado"}
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client:any) => (
                <TableRow key={client.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <Link href={`/clients/${client.id}`} className="hover:underline">
                      {client.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell className="hidden md:table-cell">{client.type}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {/* {JSON.stringify(client)} */}
                    {client.cities.name}/{client?.estates.uf}
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.status === "active" ? "default" : "secondary"}>
                      {client.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
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