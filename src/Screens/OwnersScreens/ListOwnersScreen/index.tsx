"use client"
import { Button } from "@/components/ui/button"
import { listOwners } from "@/lib/supabase/queries/client/Owners/listOwners"
import { Building2, Edit, Loader2, MapPin, Mail, Phone, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { DialogToDeleteOwner } from "./DialogToDeleteOwner"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ListOwnersScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const { data, error, isLoading, mutate } = useSWR(`owners`, () => listOwners(), {
    revalidateOnFocus: true,
    keepPreviousData: false,
  })

  function reloadEdit() {
    mutate()
  }

  // Filtrar proprietários com base no termo de busca
  const filteredOwners = data?.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (owner.email && owner.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (owner.city && owner.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (owner.state && owner.state.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 container pt-8 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Lista de Proprietários</h1>
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
          <Button disabled className="bg-primary-palet text-white px-4 py-2 rounded">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Carregando
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 container pt-8 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Lista de Proprietários</h1>
            <p className="text-red-500">Erro ao carregar dados. Por favor, tente novamente.</p>
          </div>
          <Button onClick={() => mutate()} className="bg-primary-palet text-white px-4 py-2 rounded">
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 container pt-8 pb-16 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proprietários</h1>
          <p className="text-muted-foreground mt-1">Gerencie os proprietários de imóveis cadastrados no sistema.</p>
        </div>
        <Link href="/proprietarios/novo-proprietario">
          <Button className="bg-primary-palet hover:bg-primary-palet/90 text-white px-4 py-2 rounded w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Proprietário
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, email, cidade..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredOwners?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Nenhum proprietário encontrado</h3>
          <p className="text-muted-foreground mt-1">
            {searchTerm ? "Tente outro termo de busca ou " : ""}
            adicione um novo proprietário para começar.
          </p>
          {searchTerm && (
            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
              Limpar busca
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredOwners?.map((owner) => (
            <Card key={owner.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-bold">{owner.name}</h2>
                      <Badge variant={owner.type === "Construtora" ? "outline" : "secondary"}>
                        {owner.type || "Proprietário Particular"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-3">
                      {owner.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{owner.email}</span>
                        </div>
                      )}

                      {owner.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{owner.phone}</span>
                        </div>
                      )}

                      {(owner.city || owner.state || owner.neighborhood) && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{[owner.neighborhood, owner.city, owner.state].filter(Boolean).join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:self-start">
                    <Link href={`/proprietarios/editar-proprietario/${owner.id}`}>
                      <Button variant="outline" size="sm" className="h-9 px-3">
                        <Edit size={16} className="mr-1" />
                        Editar
                      </Button>
                    </Link>
                    <DialogToDeleteOwner idOwner={owner.id} reloadEdit={reloadEdit} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// Remova a função PropertyField, pois não a estamos mais utilizando
