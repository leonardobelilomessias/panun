"use client"

import { useState, useEffect, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw, PlusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { getOwners, Owner } from "@/lib/supabase/queries/client/dashboard/getOwners"


export function OwnersTable() {
  const [owners, setOwners] = useState<Owner[]>([])
  const [filteredOwners, setFilteredOwners] = useState<Owner[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()

  const loadOwners = useCallback(async (search?: string) => {
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
              owner.city.toLowerCase().includes(searchLower)
          )
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
  }, [toast])

  useEffect(() => {
    loadOwners()
  }, [loadOwners])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOwners(owners)
      return
    }

    const delay = setTimeout(() => {
      loadOwners(searchTerm)
    }, 500)

    return () => clearTimeout(delay)
  }, [searchTerm, loadOwners, owners])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar proprietários..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => loadOwners()} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
        <Link href="/owners/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Novo Proprietário
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
                    <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {error}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredOwners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "Nenhum proprietário encontrado com este termo de busca" : "Nenhum proprietário cadastrado"}
                </TableCell>
              </TableRow>
            ) : (
              filteredOwners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell className="font-medium">{owner.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{owner.email}</TableCell>
                  <TableCell>{owner.phone}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={owner.type === "Construtora" ? "outline" : "secondary"}>{owner.type}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {owner?.city}/{owner?.estate}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{owner.propertyCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={owner.status === "Ativo" ? "default" : "secondary"}>{owner.status}</Badge>
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
