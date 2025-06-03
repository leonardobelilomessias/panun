'use client'
import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Award,
  Clock,
  ArrowLeft,
  Building2,
  CheckCircle,
  XCircle,
  FileText,
  Shield,
  Home,
  BarChart3,
  FileBarChart,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { DialogFormAvatar } from "./AvatarAgent/DialogFormAvatar"
import { useEffect, useState } from "react"
import { getAgentById } from "@/lib/supabase/queries/client/Agents/getAgentById"
import { Agent, AgentSingle } from "@/types"
import { DialogFormProfile } from "./DialogFormProfile"
import { ReactQueryClientProviders } from "@/providers/ReactQueryClientProviders"




export default  function AgentProfilePage({ id }: {  id: string  }) {
  
  const [agent,setAgent] = useState<AgentSingle>()
  const [loading,setLoading] = useState(true)
  const[reload,setReload] = useState(false)
  async   function loadGetDataAgent(){
  try{
    setLoading(true)
    const agent = await getAgentById(id)
    setAgent(agent)
    setLoading(false)

  }catch{

  }finally{
    setLoading(false)
  }
    
  }
  useEffect(()=>{
    loadGetDataAgent()
  },[reload])

function reloadEdit(){
setReload((reload)=>(!reload))
}


  // Format date if available
  const formattedBirthDate = agent?.birth_date
    ? format(new Date(agent.birth_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : "Não informado"

  // Format created_at date
  const formattedCreatedAt = format(new Date(), "dd/MM/yyyy", { locale: ptBR })

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }
if(loading) return<div>Loading ...</div>
  return (
    <ReactQueryClientProviders>
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href="/corretores"
          className="inline-flex items-center text-sm text-[#008099] hover:text-[#006a80] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para lista de corretores
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile summary */}
        <div className="md:col-span-1">
          <Card className="border-[#008099]/20 overflow-hidden">
            <div className="bg-gradient-to-r from-[#008099] to-[#00a0bf] h-24 relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 top-12">
                
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  
                  <AvatarImage
                    className={"object-cover"}
                    src={!!agent?.avatars_agents[0]?.url_image?agent?.avatars_agents[0].url_image:""}
                    alt={agent?.name}
                  />
                  <AvatarFallback className="text-3xl bg-[#008099]/10 text-[#008099]">
                    {getInitials(agent?.name||"")}
                  </AvatarFallback>
                </Avatar>
                {
                  agent?.id&&
                

              <DialogFormAvatar avatar={agent?.avatars_agents[0]?.url_image||""} idAvatar={agent.id} reloadEdit={reloadEdit} />
                }
              </div>
            </div>
            <CardHeader className="flex flex-col items-center text-center pt-24 pb-2">
              <CardTitle className="text-xl font-bold text-[#008099]">{agent?.name}</CardTitle>
              <div className="flex items-center mt-1 text-muted-foreground">
                <Award className="h-4 w-4 mr-1" />
                <span className="text-sm">{agent?.role === "admin" ? "Administrador" : "Agente"}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {agent?.status === "Ativo" ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="h-3 w-3 mr-1" /> Ativo
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                    <XCircle className="h-3 w-3 mr-1" /> Inativo
                  </Badge>
                )}
                {agent?.creci && (
                  <Badge variant="outline" className="border-[#008099]/20">
                    CRECI: {agent?.creci}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-2">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-[#008099] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#008099]">Telefone</p>
                    <p className="text-sm">{agent?.phone}</p>
                  </div>
                </div>

                {agent?.email && (
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-[#008099] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[#008099]">Email</p>
                      <p className="text-sm break-all">{agent?.email}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 text-[#008099] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#008099]">Data de Nascimento</p>
                    <p className="text-sm">{formattedBirthDate}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-3 text-[#008099] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#008099]">CPF</p>
                    <p className="text-sm">{agent?.cpf || "Não informado"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-[#008099] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#008099]">Cadastrado em</p>
                    <p className="text-sm">{formattedCreatedAt}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6 bg-[#008099]/10" />

              <div className="flex flex-col gap-2">

                  {
                    agent &&
                    <DialogFormProfile agent={agent} reloadData={reloadEdit}/>
                  }
                
                <Button disabled={true} className=" cursor-not-allowed w-full bg-[#008099] hover:bg-[#006a80] text-white  " >
                  <Link className="flex items-center  cursor-not-allowed"  href={`/corretores/${agent?.id}/imoveis`}>
                    <Home className="h-4 w-4 mr-2" />
                    Ver Imóveis
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Detailed information */}
        <div className="md:col-span-2 space-y-6">
          {/* Address Information */}
          <Card className="border-[#008099]/20 hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-[#008099]">
                <MapPin className="h-5 w-5 mr-2" />
                Informações de Endereço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#008099]/5 p-3 rounded-md">
                  <p className="text-sm font-medium text-[#008099]">Logradouro</p>
                  <p className="mt-1">{agent?.street || "Não informado"}</p>
                </div>
                <div className="bg-[#008099]/5 p-3 rounded-md">
                  <p className="text-sm font-medium text-[#008099]">Número</p>
                  <p className="mt-1">{agent?.house_number || "Não informado"}</p>
                </div>
                <div className="bg-[#008099]/5 p-3 rounded-md">
                  <p className="text-sm font-medium text-[#008099]">Bairro</p>
                  <p className="mt-1">{agent?.neighborhoods?.name || "Não informado"}</p>
                </div>
                <div className="bg-[#008099]/5 p-3 rounded-md">
                  <p className="text-sm font-medium text-[#008099]">Cidade</p>
                  <p className="mt-1">{agent?.cities?.name || "Não informado"}</p>
                </div>
                <div className="bg-[#008099]/5 p-3 rounded-md">
                  <p className="text-sm font-medium text-[#008099]">Estado</p>
                  <p className="mt-1">{agent?.estates?.name || "Não informado"}</p>
                </div>
                <div className="bg-[#008099]/5 p-3 rounded-md">
                  <p className="text-sm font-medium text-[#008099]">CEP</p>
                  <p className="mt-1">{agent?.zipcode || "Não informado"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="border-[#008099]/20 hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-[#008099]">
                <Building2 className="h-5 w-5 mr-2" />
                Informações Profissionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-[#008099]" />
                    <span className="font-medium text-[#008099]">Função</span>
                  </div>
                  <p className="pl-7">{agent?.role === "admin" ? "Administrador" : "Agente Imobiliário"}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-[#008099]" />
                    <span className="font-medium text-[#008099]">CRECI</span>
                  </div>
                  <p className="pl-7">{agent?.creci || "Não informado"}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    {agent?.status === "Ativo" ? (
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 mr-2 text-red-500" />
                    )}
                    <span className="font-medium text-[#008099]">Status</span>
                  </div>
                  <p className="pl-7">{agent?.status}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-[#008099]" />
                    <span className="font-medium text-[#008099]">ID do Usuário</span>
                  </div>
                  <p className="pl-7 text-sm break-all font-mono">{agent?.user_id || "Não vinculado"}</p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  disabled={true}
                  variant="outline"
                  className="w-full sm:w-auto border-[#008099]/20 text-[#008099] hover:bg-[#008099]/10"
                  
                >
                  <Link className="flex items-center" href={`/corretores/${agent?.id}/historico`}>
                    <Clock className="mr-2 h-4 w-4" />
                    Ver Histórico de Atividades
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border-[#008099]/20 hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-[#008099]">
                <BarChart3 className="h-5 w-5 mr-2" />
                Desempenho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#008099]/5 p-4 rounded-md text-center">
                  <p className="text-3xl font-bold text-[#008099]">12</p>
                  <p className="text-sm text-muted-foreground">Imóveis Vendidos</p>
                </div>
                <div className="bg-[#008099]/5 p-4 rounded-md text-center">
                  <p className="text-3xl font-bold text-[#008099]">8</p>
                  <p className="text-sm text-muted-foreground">Imóveis Alugados</p>
                </div>
                <div className="bg-[#008099]/5 p-4 rounded-md text-center">
                  <p className="text-3xl font-bold text-[#008099]">R$ 1.2M</p>
                  <p className="text-sm text-muted-foreground">Volume de Vendas</p>
                </div>
              </div>

              <div className="text-center">
                <Button variant="outline" className="border-[#008099]/20 text-[#008099] hover:bg-[#008099]/10 cursor-not-allowed">
                  <FileBarChart className="mr-2 h-4 w-4" />
                  Gerar Relatório Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ReactQueryClientProviders>
  )
}
