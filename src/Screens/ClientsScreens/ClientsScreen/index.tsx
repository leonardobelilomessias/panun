"use client"

import { Button } from "@/components/ui/button"
import { listClients } from "@/lib/supabase/queries/client/Clients/listClients"
import {
  Users,
  Edit,
  Loader2,
  MapPin,
  Mail,
  Phone,
  Plus,
  Search,
  RefreshCw,
  AlertCircle,
  Building2,
  User,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogToDeleteClient } from "./dialogToDeleteClient"

export function ListClientsScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const { data, error, isLoading, mutate } = useSWR(`clients`, () => listClients(), {
    revalidateOnFocus: true,
    keepPreviousData: false,
  })

  function reloadList() {
    mutate()
  }

  // Filtrar clientes com base no termo de busca e filtros
  const filteredClients = data?.filter((client) => {
    // Filtro de busca
    const matchesSearch =
      searchTerm === "" ||
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.city && client.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.estate && client.estate.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtro de status
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && client.status === "active") ||
      (statusFilter === "inactive" && client.status !== "active")

    // Filtro de tipo
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "pf" && client.type !== "Pessoa Jurídica") ||
      (typeFilter === "pj" && client.type === "Pessoa Jurídica")

    return matchesSearch && matchesStatus && matchesType
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 container pt-8 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#272525]">Lista de Clientes</h1>
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
          <Button disabled className="bg-[#272525] hover:bg-[#006a80] text-white">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Carregando
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden border-[#272525]/10">
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
            <h1 className="text-2xl font-bold text-[#272525]">Lista de Clientes</h1>
            <p className="text-red-500 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Erro ao carregar dados. Por favor, tente novamente.
            </p>
          </div>
          <Button onClick={() => mutate()} className="bg-[#272525] hover:bg-[#006a80] text-white">
            <RefreshCw className="mr-2 h-4 w-4" />
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
          <h1 className="text-3xl font-bold tracking-tight text-[#272525]">Clientes</h1>
          <p className="text-muted-foreground mt-1">Gerencie os clientes cadastrados no sistema.</p>
        </div>
        <Link href="/clientes/novo-cliente">
          <Button className="bg-[#272525] hover:bg-[#006a80] text-white w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Cliente
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email, cidade..."
            className="pl-10 border-[#272525]/20 focus-visible:ring-[#272525]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] border-[#272525]/20 focus:ring-[#272525]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px] border-[#272525]/20 focus:ring-[#272525]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pf">Pessoa Física</SelectItem>
              <SelectItem value="pj">Pessoa Jurídica</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
              setTypeFilter("all")
            }}
            className="border-[#272525]/20 text-[#272525] hover:bg-[#272525]/10"
            disabled={!searchTerm && statusFilter === "all" && typeFilter === "all"}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>
      </div>

      {filteredClients?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg shadow-sm border border-[#272525]/10">
          <div className="bg-[#272525]/10 p-4 rounded-full mb-4">
            <Users className="h-12 w-12 text-[#272525]" />
          </div>
          <h3 className="text-lg font-medium text-[#272525]">Nenhum cliente encontrado</h3>
          <p className="text-muted-foreground mt-1 max-w-md">
            {searchTerm || statusFilter !== "all" || typeFilter !== "all"
              ? "Nenhum cliente corresponde aos filtros selecionados. Tente outros critérios de busca."
              : "Não há clientes cadastrados no sistema. Adicione um novo cliente para começar."}
          </p>
          {(searchTerm || statusFilter !== "all" || typeFilter !== "all") && (
            <Button
              variant="outline"
              className="mt-4 border-[#272525]/20 text-[#272525] hover:bg-[#272525]/10"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setTypeFilter("all")
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Limpar filtros
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-2">
            Exibindo <span className="font-medium">{filteredClients?.length}</span> clientes
            {(searchTerm || statusFilter !== "all" || typeFilter !== "all") && " com os filtros aplicados"}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredClients?.map((client) => (
              <Card
                key={client.id}
                className="overflow-hidden transition-all hover:shadow-md border-[#272525]/10 group"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-[#272525] group-hover:underline">
                          <Link href={`/clientes/${client.id}`} className="hover:underline flex items-center">
                            {client.type === "Pessoa Jurídica" ? (
                              <Building2 className="h-4 w-4 mr-2 text-[#272525]/70" />
                            ) : (
                              <User className="h-4 w-4 mr-2 text-[#272525]/70" />
                            )}
                            {client.name}
                          </Link>
                        </h2>
                        <Badge
                          variant={client.type === "Pessoa Jurídica" ? "outline" : "secondary"}
                          className={client.type === "Pessoa Jurídica" ? "border-[#272525]/30 text-[#272525]" : ""}
                        >
                          {client.type || "Pessoa Física"}
                        </Badge>
                        <Badge
                          variant={client.status === "active" ? "default" : "secondary"}
                          className={client.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        >
                          {client.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-3">
                        {client.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-[#272525]/70" />
                            <span>{client.email}</span>
                          </div>
                        )}

                        {client.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-[#272525]/70" />
                            <span>{client.phone}</span>
                          </div>
                        )}

                        {(client.city || client.estate || client.neighborhood) && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-[#272525]/70" />
                            <span>{[client.neighborhood, client.city, client.estate].filter(Boolean).join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2 md:self-start">
                      <Link href={`/clientes/editar-cliente/${client.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 px-3 border-[#272525]/30 text-[#272525] hover:bg-[#272525]/10 hover:border-[#272525]"
                        >
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

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Total de <span className="font-medium">{filteredClients?.length}</span> clientes
            </div>
            <Button
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="border-[#272525]/20 text-[#272525] hover:bg-[#272525]/10"
            >
              Voltar ao topo
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
