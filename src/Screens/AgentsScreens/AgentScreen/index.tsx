"use client"

import { ContainerScreen } from "@/components/modules/Containers/ContainerSceen"
import { listAgents } from "@/lib/supabase/queries/client/Agents/listAgents"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  UserCheck,
  Filter,
  RefreshCw,
  AlertCircle,
  BadgeCheck,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"
import { DialogToDeleteAgent } from "./DialogTodeleteAgent"
import { DialogFormAgent } from "./DialogFormAgent"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AgentsListScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  const { data, error, isLoading, mutate } = useSWR(`agents`, () => listAgents(), {
    revalidateOnFocus: true,
    keepPreviousData: false,
  })

  function reloadList() {
    mutate()
  }

  // Filtrar corretores com base no termo de busca e filtros
  const filteredAgents = data?.filter((agent) => {
    // Filtro de busca
    const matchesSearch =
      searchTerm === "" ||
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.email && agent.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (agent.creci && agent.creci.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (agent.phone && agent.phone.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtro de status
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter

    // Filtro de função
    const matchesRole = roleFilter === "all" || agent.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  if (isLoading) {
    return (
      <ContainerScreen>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#008099]">Lista de Corretores</h1>
              <p className="text-muted-foreground">Carregando dados...</p>
            </div>
            <Button disabled className="bg-[#008099] hover:bg-[#006a80] text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-[#008099]/10">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-4 w-40" />
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
      </ContainerScreen>
    )
  }

  if (error) {
    return (
      <ContainerScreen>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#008099]">Lista de Corretores</h1>
              <p className="text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Erro ao carregar dados. Por favor, tente novamente.
              </p>
            </div>
            <Button onClick={() => mutate()} className="bg-[#008099] hover:bg-[#006a80] text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Tentar novamente
            </Button>
          </div>
        </div>
      </ContainerScreen>
    )
  }

  return (
    <ContainerScreen>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#008099]">Corretores</h1>
            <p className="text-muted-foreground mt-1">Gerencie os corretores cadastrados no sistema.</p>
          </div>
          <Link href="/corretores/novo-corretor">
            <Button className="bg-[#008099] hover:bg-[#006a80] text-white w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Corretor
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email, CRECI..."
              className="pl-10 border-[#008099]/20 focus-visible:ring-[#008099]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
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

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[140px] border-[#008099]/20 focus:ring-[#008099]">
                <UserCheck className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="agente">Agente</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setRoleFilter("all")
              }}
              className="border-[#008099]/20 text-[#008099] hover:bg-[#008099]/10"
              disabled={!searchTerm && statusFilter === "all" && roleFilter === "all"}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Limpar
            </Button>
          </div>
        </div>

        {filteredAgents?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg shadow-sm border border-[#008099]/10">
            <div className="bg-[#008099]/10 p-4 rounded-full mb-4">
              <UserCheck className="h-12 w-12 text-[#008099]" />
            </div>
            <h3 className="text-lg font-medium text-[#008099]">Nenhum corretor encontrado</h3>
            <p className="text-muted-foreground mt-1 max-w-md">
              {searchTerm || statusFilter !== "all" || roleFilter !== "all"
                ? "Nenhum corretor corresponde aos filtros selecionados. Tente outros critérios de busca."
                : "Não há corretores cadastrados no sistema. Adicione um novo corretor para começar."}
            </p>
            {(searchTerm || statusFilter !== "all" || roleFilter !== "all") && (
              <Button
                variant="outline"
                className="mt-4 border-[#008099]/20 text-[#008099] hover:bg-[#008099]/10"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setRoleFilter("all")
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
              Exibindo <span className="font-medium">{filteredAgents?.length}</span> corretores
              {(searchTerm || statusFilter !== "all" || roleFilter !== "all") && " com os filtros aplicados"}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredAgents?.map((agent) => (
                <Card
                  key={agent.id}
                  className="overflow-hidden transition-all hover:shadow-md border-[#008099]/10 group"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border border-[#008099]/20">
                          <AvatarImage src={agent.url_image || "/placeholder.svg?height=64&width=64"} />
                          <AvatarFallback className="text-lg bg-[#008099]/10 text-[#008099]">
                            {agent.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h2 className="text-xl font-bold text-[#008099] group-hover:underline">
                              <Link href={`/corretores/${agent.id}`} className="hover:underline">
                                {agent.name}
                              </Link>
                            </h2>
                            <Badge
                              variant={agent.role === "admin" ? "outline" : "secondary"}
                              className={agent.role === "admin" ? "border-[#008099]/30 text-[#008099]" : ""}
                            >
                              {agent.role === "admin" ? "Administrador" : "Corretor"}
                            </Badge>
                            <Badge
                              variant={agent.status === "Ativo" ? "default" : "secondary"}
                              className={
                                agent.status === "Ativo" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                              }
                            >
                              {agent.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-3">
                            {agent.email && (
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-[#008099]/70" />
                                <span>{agent.email}</span>
                              </div>
                            )}

                            {agent.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-[#008099]/70" />
                                <span>{agent.phone}</span>
                              </div>
                            )}

                            {agent.creci && (
                              <div className="flex items-center gap-2 text-sm">
                                <BadgeCheck className="h-4 w-4 text-[#008099]/70" />
                                <span>CRECI: {agent.creci}</span>
                              </div>
                            )}

                            {(agent.city || agent.estate) && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-[#008099]/70" />
                                <span>{[agent.city, agent.estate].filter(Boolean).join(", ")}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 md:self-start">
                        <DialogFormAgent agent={agent} reloadData={reloadList} />
                        <DialogToDeleteAgent idAgent={agent.id} reloadList={reloadList} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Total de <span className="font-medium">{filteredAgents?.length}</span> corretores
              </div>
              <Button
                variant="outline"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="border-[#008099]/20 text-[#008099] hover:bg-[#008099]/10"
              >
                Voltar ao topo
              </Button>
            </div>
          </>
        )}
      </div>
    </ContainerScreen>
  )
}
