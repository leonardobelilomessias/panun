"use client"

import { ContainerScreen } from "@/components/modules/Containers/ContainerSceen"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, Loader2, Mail, MapPin, Phone, Plus, Search, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"
import { DialogFormLead } from "./DialogFormLead"
import { listLeads } from "@/lib/supabase/queries/client/leads/listLeads"
import { DialogToDeleteLead } from "./DialogTodeleteLead"
import { DialogFormAddLead } from "./DialogFormAddLead"

export default function LeadsListScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const { data, error, isLoading, mutate } = useSWR(`leads`, () => listLeads(), {
    revalidateOnFocus: true,
    keepPreviousData: false,
  })

  function reloadList() {
    mutate()
  }

  // Filtrar leads com base no termo de busca
  const filteredLeads = data?.filter(
    (lead:any) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.phone && lead.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.source && lead.source.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (isLoading) {
    return (
      <ContainerScreen>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Lista de Leads</h1>
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
              <h1 className="text-2xl font-bold">Lista de Leads</h1>
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
            <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
            <p className="text-muted-foreground mt-1">Gerencie os leads cadastrados no sistema.</p>
          </div>
      <DialogFormAddLead reloadData={reloadList}/>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email, telefone, origem..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredLeads?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhum lead encontrado</h3>
            <p className="text-muted-foreground mt-1">
              {searchTerm ? "Tente outro termo de busca ou " : ""}
              adicione um novo lead para começar.
            </p>
            {searchTerm && (
              <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                Limpar busca
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredLeads?.map((lead:any) => (
              <Card key={lead.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border">
                        <AvatarImage src={lead.url_image || "/placeholder.svg"} />
                        <AvatarFallback className="text-lg bg-primary-palet/20">
                          {lead.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h2 className="text-xl font-bold">{lead.name}</h2>
                          <Badge variant="secondary">{lead.source || "Sem origem"}</Badge>
                          <Badge variant={lead.status === "Ativo" ? "default" : "secondary"}>{lead.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-3">
                          {lead.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{lead.email}</span>
                            </div>
                          )}

                          {lead.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{lead.phone}</span>
                            </div>
                          )}

                          {(lead.city || lead.estate) && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{[lead.city, lead.estate].filter(Boolean).join(", ")}</span>
                            </div>
                          )}

                          {lead.created_at && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(lead.created_at).toLocaleDateString("pt-BR")}</span>
                            </div>
                          )}

                          {lead.last_contact && (
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Último contato: {new Date(lead.last_contact).toLocaleDateString("pt-BR")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 md:self-start">
                      <DialogFormLead lead={lead} reloadData={reloadList} />
                      <DialogToDeleteLead idLead={lead.id} reloadList={reloadList} />
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