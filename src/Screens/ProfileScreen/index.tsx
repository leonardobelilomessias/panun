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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

async function getAgentById(id: string) {
  const supabase = await createClient()

  // Fetch agent data with related entities
  const { data: agent, error } = await supabase
    .from("agents")
    .select(`
      *,
      cities:city_id(name),
      estates:estate_id(name),
      neighborhoods:neighborhood_id(name)
    `)
    .eq("id", id)
    .single()

  if (error || !agent) {
    return null
  }

  return agent
}

export default async function AgentProfilePage({ id }: {  id: string  }) {
  const agent = await getAgentById(id)

  if (!agent) {
    notFound()
  }

  // Format date if available
  const formattedBirthDate = agent.birth_date
    ? format(new Date(agent.birth_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : "Não informado"

  // Format created_at date
  const formattedCreatedAt = format(new Date(agent.created_at), "dd/MM/yyyy", { locale: ptBR })

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href="/agentes"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para lista de corretores
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile summary */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center pb-2">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(agent.name)}`}
                    alt={agent.name}
                  />
                  <AvatarFallback className="text-3xl">{getInitials(agent.name)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2">
                  {agent.status === "Ativo" ? (
                    <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>
                  ) : (
                    <Badge variant="destructive">Inativo</Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-xl font-bold">{agent.name}</CardTitle>
              <div className="flex items-center mt-1 text-muted-foreground">
                <Award className="h-4 w-4 mr-1" />
                <span className="text-sm">{agent.role === "admin" ? "Administrador" : "Agente"}</span>
              </div>
              {agent.creci && (
                <Badge variant="outline" className="mt-2">
                  CRECI: {agent.creci}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-2">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Telefone</p>
                    <p className="text-sm">{agent.phone}</p>
                  </div>
                </div>

                {agent.email && (
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm break-all">{agent.email}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Data de Nascimento</p>
                    <p className="text-sm">{formattedBirthDate}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">CPF</p>
                    <p className="text-sm">{agent.cpf || "Não informado"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Cadastrado em</p>
                    <p className="text-sm">{formattedCreatedAt}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/agentes/${agent.id}/editar`}>Editar Perfil</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href={`/agentes/${agent.id}/imoveis`}>Ver Imóveis</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Detailed information */}
        <div className="md:col-span-2 space-y-6">
          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Informações de Endereço
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Logradouro</p>
                  <p>{agent.street || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Número</p>
                  <p>{agent.house_number || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bairro</p>
                  <p>{agent.neighborhoods?.name || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cidade</p>
                  <p>{agent.cities?.name || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <p>{agent.estates?.name || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CEP</p>
                  <p>{agent.zipcode || "Não informado"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Informações Profissionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">Função</span>
                  </div>
                  <p className="pl-7">{agent.role === "admin" ? "Administrador" : "Agente Imobiliário"}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">CRECI</span>
                  </div>
                  <p className="pl-7">{agent.creci || "Não informado"}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    {agent.status === "Ativo" ? (
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 mr-2 text-red-500" />
                    )}
                    <span className="font-medium">Status</span>
                  </div>
                  <p className="pl-7">{agent.status}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">ID do Usuário</span>
                  </div>
                  <p className="pl-7 text-sm break-all">{agent.user_id || "Não vinculado"}</p>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href={`/agentes/${agent.id}/historico`}>Ver Histórico de Atividades</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                <p>Estatísticas de desempenho do corretor serão exibidas aqui.</p>
                <Button variant="outline" className="mt-2">
                  Gerar Relatório
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
