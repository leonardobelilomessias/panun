"use client"
import { Button } from "@/components/ui/button"
import { listClients } from "@/lib/supabase/queries/client/Clients/listClients"
import { Users, Edit, Loader2, MapPin, Mail, Phone, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { DialogToDeleteClient } from "./dialogToDeleteClient"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ListClientsScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const { data, error, isLoading, mutate } = useSWR(`clients`, () => listClients(), {
    revalidateOnFocus: true,
    keepPreviousData: false,
  })

  function reloadList() {
    mutate()
  }

  // Filtrar clientes com base no termo de busca
  const filteredClients = data?.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.city && client.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.estate && client.estate.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 container pt-8 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Lista de Clientes</h1>
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
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-32 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-9" />
                  </div>
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
            <h1 className="text-2xl font-bold">Lista de Clientes</h1>
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
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground mt-1">Gerencie os clientes cadastrados no sistema.</p>
        </div>
        <Link href="/clientes/novo-cliente">
          <Button className="bg-primary-palet hover:bg-primary-palet/90 text-white px-4 py-2 rounded w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Cliente
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

      {filteredClients?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Nenhum cliente encontrado</h3>
          <p className="text-muted-foreground mt-1">
            {searchTerm ? "Tente outro termo de busca ou " : ""}
            adicione um novo cliente para começar.
          </p>
          {searchTerm && (
            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
              Limpar busca
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredClients?.map((client) => (
            <Card key={client.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-bold">{client.name}</h2>
                      <Badge variant={client.type === "Pessoa Jurídica" ? "outline" : "secondary"}>
                        {client.type || "Pessoa Física"}
                      </Badge>
                      <Badge variant={client.status === "active" ? "default" : "secondary"}>
                        {client.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-3">
                      {client.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{client.email}</span>
                        </div>
                      )}

                      {client.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{client.phone}</span>
                        </div>
                      )}

                      {(client.city || client.estate || client.neighborhood) && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{[client.neighborhood, client.city, client.estate].filter(Boolean).join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:self-start">
                    <Link href={`/clientes/editar-cliente/${client.id}`}>
                      <Button variant="outline" size="sm" className="h-9 px-3">
                        <Edit size={16} className="mr-1" />
                        Editar
                      </Button>
                    </Link>
                    <DialogToDeleteClient idClient={client.id} reloadList={reloadList} />
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
