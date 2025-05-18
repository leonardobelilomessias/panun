"use client"

import { ContainerScreen } from "@/components/modules/Containers/ContainerSceen"
import { listAgents } from "@/lib/supabase/queries/client/Agents/listAgents"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Edit, Loader2, Mail, MapPin, Phone, Plus, Search, UserCheck } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"
import { DialogToDeleteAgent } from "./DialogTodeleteAgent"
import { DialogFormAgent } from "./DialogFormAgent"

export default function AgentsListScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const { data, error, isLoading, mutate } = useSWR(`agents`, () => listAgents(), {
    revalidateOnFocus: true,
    keepPreviousData: false,
  })

  function reloadList() {
    mutate()
  }

  // Filtrar corretores com base no termo de busca
  const filteredAgents = data?.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.email && agent.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (agent.creci && agent.creci.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (agent.phone && agent.phone.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (isLoading) {
    return (
      <ContainerScreen>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Lista de Corretores</h1>
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
              <h1 className="text-2xl font-bold">Lista de Corretores</h1>
              <p className="text-red-500">Erro ao carregar dados. Por favor, tente novamente.</p>
            </div>
            <Button onClick={() => mutate()} className="bg-primary-palet text-white px-4 py-2 rounded">
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
            <h1 className="text-3xl font-bold tracking-tight">Corretores</h1>
            <p className="text-muted-foreground mt-1">Gerencie os corretores cadastrados no sistema.</p>
          </div>
          <Link href="/corretores/novo-corretor">
            <Button className="bg-primary-palet hover:bg-primary-palet/90 text-white px-4 py-2 rounded w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Corretor
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email, CRECI..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredAgents?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <UserCheck className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhum corretor encontrado</h3>
            <p className="text-muted-foreground mt-1">
              {searchTerm ? "Tente outro termo de busca ou " : ""}
              adicione um novo corretor para começar.
            </p>
            {searchTerm && (
              <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                Limpar busca
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAgents?.map((agent) => (
              <Card key={agent.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border">
                        <AvatarImage src={agent.url_image || "/placeholder.svg"} />
                        <AvatarFallback className="text-lg bg-primary-palet/20">
                          {agent.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h2 className="text-xl font-bold">{agent.name}</h2>
                          <Badge variant={agent.role === "admin" ? "outline" : "secondary"}>
                            {agent.role === "admin" ? "Administrador" : "Corretor"}
                          </Badge>
                          <Badge variant={agent.status === "Ativo" ? "default" : "secondary"}>{agent.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-3">
                          {agent.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{agent.email}</span>
                            </div>
                          )}

                          {agent.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{agent.phone}</span>
                            </div>
                          )}

                          {agent.creci && (
                            <div className="flex items-center gap-2 text-sm">
                              <UserCheck className="h-4 w-4 text-muted-foreground" />
                              <span>CRECI: {agent.creci}</span>
                            </div>
                          )}

                          {(agent.city || agent.estate) && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{[agent.city, agent.estate].filter(Boolean).join(", ")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 md:self-start">
                      
                    <DialogFormAgent agent={agent} reloadData={reloadList}/>
                    
                      <DialogToDeleteAgent idAgent={agent.id} reloadList={reloadList} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ContainerScreen>
  )
}
