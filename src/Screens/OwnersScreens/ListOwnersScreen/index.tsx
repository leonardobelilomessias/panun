"use client"

import { Button } from "@/components/ui/button"
import { listOwners } from "@/lib/supabase/queries/client/Owners/listOwners"
import {
  Building2,
  Edit,
  Loader2,
  MapPin,
  Mail,
  Phone,
  Plus,
  Search,
  RefreshCw,
  AlertCircle,
  User,
  Home,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogToDeleteOwner } from "./DialogToDeleteOwner"

export function ListOwnersScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const { data, error, isLoading, mutate } = useSWR(`owners`, () => listOwners(), {
    revalidateOnFocus: true,
    keepPreviousData: false,
  })

  function reloadList() {
    mutate()
  }

  // Filtrar proprietários com base no termo de busca e filtros
  const filteredOwners = data?.filter((owner) => {
    // Filtro de busca
    const matchesSearch =
      searchTerm === "" ||
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (owner.email && owner.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (owner.city && owner.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (owner.state && owner.state.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtro de status (assumindo que o proprietário tem um campo status)
    const matchesStatus = statusFilter === "all" || owner.status === statusFilter

    // Filtro de tipo
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "construtora" && owner.type === "Construtora") ||
      (typeFilter === "particular" && owner.type !== "Construtora")

    return matchesSearch && matchesStatus && matchesType
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 container pt-8 min-h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#272525]">Lista de Proprietários</h1>
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
            <h1 className="text-2xl font-bold text-[#272525]">Lista de Proprietários</h1>
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
          <h1 className="text-3xl font-bold tracking-tight text-[#272525]">Proprietários</h1>
          <p className="text-muted-foreground mt-1">Gerencie os proprietários de imóveis cadastrados no sistema.</p>
        </div>
        <Link href="/proprietarios/novo-proprietario">
          <Button className="bg-[#272525] hover:bg-[#006a80] text-white w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Proprietário
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
              <SelectItem value="Ativo">Ativos</SelectItem>
              <SelectItem value="Inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px] border-[#272525]/20 focus:ring-[#272525]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="construtora">Construtora</SelectItem>
              <SelectItem value="particular">Particular</SelectItem>
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

      {filteredOwners?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg shadow-sm border border-[#272525]/10">
          <div className="bg-[#272525]/10 p-4 rounded-full mb-4">
            <Building2 className="h-12 w-12 text-[#272525]" />
          </div>
          <h3 className="text-lg font-medium text-[#272525]">Nenhum proprietário encontrado</h3>
          <p className="text-muted-foreground mt-1 max-w-md">
            {searchTerm || statusFilter !== "all" || typeFilter !== "all"
              ? "Nenhum proprietário corresponde aos filtros selecionados. Tente outros critérios de busca."
              : "Não há proprietários cadastrados no sistema. Adicione um novo proprietário para começar."}
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
            Exibindo <span className="font-medium">{filteredOwners?.length}</span> proprietários
            {(searchTerm || statusFilter !== "all" || typeFilter !== "all") && " com os filtros aplicados"}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredOwners?.map((owner) => (
              <Card key={owner.id} className="overflow-hidden transition-all hover:shadow-md border-[#272525]/10 group">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-[#272525] group-hover:underline">
                          <Link href={`/proprietarios/${owner.id}`} className="hover:underline flex items-center">
                            {owner.type === "Construtora" ? (
                              <Building2 className="h-4 w-4 mr-2 text-[#272525]/70" />
                            ) : (
                              <User className="h-4 w-4 mr-2 text-[#272525]/70" />
                            )}
                            {owner.name}
                          </Link>
                        </h2>
                        <Badge
                          variant={owner.type === "Construtora" ? "outline" : "secondary"}
                          className={owner.type === "Construtora" ? "border-[#272525]/30 text-[#272525]" : ""}
                        >
                          {owner.type || "Proprietário Particular"}
                        </Badge>
                        {owner.status && (
                          <Badge
                            variant={owner.status === "Ativo" ? "default" : "secondary"}
                            className={owner.status === "Ativo" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                          >
                            {owner.status}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-3">
                        {owner.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-[#272525]/70" />
                            <span>{owner.email}</span>
                          </div>
                        )}

                        {owner.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-[#272525]/70" />
                            <span>{owner.phone}</span>
                          </div>
                        )}

                        {(owner.city || owner.state || owner.neighborhood) && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-[#272525]/70" />
                            <span>{[owner.neighborhood, owner.city, owner.state].filter(Boolean).join(", ")}</span>
                          </div>
                        )}

                        {owner.propertyCount && (
                          <div className="flex items-center gap-2 text-sm">
                            <Home className="h-4 w-4 text-[#272525]/70" />
                            <span>
                              {owner.propertyCount} {owner.propertyCount === 1 ? "imóvel" : "imóveis"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-2 md:self-start">
                      <Link href={`/proprietarios/editar-proprietario/${owner.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 px-3 border-[#272525]/30 text-[#272525] hover:bg-[#272525]/10 hover:border-[#272525]"
                        >
                          <Edit size={16} className="mr-1" />
                          Editar
                        </Button>
                      </Link>
                      <DialogToDeleteOwner idOwner={owner.id} reloadList={reloadList} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Total de <span className="font-medium">{filteredOwners?.length}</span> proprietários
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
