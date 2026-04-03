"use client"

import { Edit, Save, UserIcon, Phone, Mail, BadgeCheck, Building2, X } from "lucide-react"
import Modal from "react-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { updateAgent } from "@/lib/supabase/queries/client/Agents/updateAgent"
import { Badge } from "@/components/ui/badge"
import { AgentSingle } from "@/types"
import { SelectLocationFields } from "../OwnersScreens/EditOwnerScreen/SelecLocations"

export interface AgentFormProps {
  agent: AgentSingle
  reloadData: () => void
}

const agentFormSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  phone: z.string().min(10, "Telefone é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  cpf: z.string().length(11, "CPF inválido").optional().or(z.literal("")),
  status: z.enum(["Ativo", "Inativo"]),
  role: z.enum(["admin", "agente"]),
  creci: z.string().optional().or(z.literal("")),
  city_id: z.string().uuid().optional().or(z.literal("")),
  estate_id: z.string().uuid().optional().or(z.literal("")),
  neighborhood_id: z.string().uuid().optional().or(z.literal("")),
})

export function DialogFormProfile({ agent, reloadData }: AgentFormProps) {
  return <DialogEditAgent agent={agent} reloadData={reloadData} />
}

function DialogEditAgent({ agent, reloadData }: AgentFormProps) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const methods = useForm<z.infer<typeof agentFormSchema>>({
    resolver: zodResolver(agentFormSchema),
    mode: "onChange",
    defaultValues: {
      name: agent.name,
      phone: agent.phone,
      email: agent.email || "",
      cpf: agent.cpf || "",
      status: agent.status||"Ativo",
      role: agent.role||"agente",
      creci: agent.creci || "",
      city_id: agent.city_id,
      estate_id: agent.estate_id,
      neighborhood_id: agent.neighborhood_id,
    },
  })

  async function onSubmit(data: z.infer<typeof agentFormSchema>) {
    try {
      setIsSubmitting(true)

      const result = await updateAgent(agent.id, data)

      if (!result.success) {
        throw new Error("Erro ao atualizar agente")
      }

      reloadData()
      setIsOpen(false)
    } catch (error) {
      console.error("Erro ao atualizar agente:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Button
      onClick={openModal}
        variant="outline"
        className="w-full border-[#272525]/20 text-[#272525] hover:bg-[#272525]/10 hover:text-[#272525]"
      
      >
        <Edit className="h-4 w-4" />
        Editar Perfil
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Editar Dados do Agente"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center text-[#272525]">
              <UserIcon className="mr-2 h-5 w-5" />
              Editar Dados do Agente
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
              onClick={closeModal}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant={agent.role === "admin" ? "outline" : "secondary"}
                className={agent.role === "admin" ? "border-[#272525]/30 text-[#272525]" : ""}
              >
                {agent.role === "admin" ? "Administrador" : "Agente"}
              </Badge>
              <Badge
                variant={agent.status === "Ativo" ? "default" : "secondary"}
                className={agent.status === "Ativo" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
              >
                {agent.status}
              </Badge>
              {agent.creci && (
                <Badge variant="outline" className="bg-[#272525]/5 border-[#272525]/20">
                  CRECI: {agent.creci}
                </Badge>
              )}
            </div>
          </div>

          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
              <Card className="p-4 border-[#272525]/20 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={methods.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#272525]">Nome</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-10 border-[#272525]/20 focus-visible:ring-[#272525]"
                              placeholder="Nome completo"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={methods.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#272525]">Telefone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-10 border-[#272525]/20 focus-visible:ring-[#272525]"
                              placeholder="(XX) XXXXX-XXXX"
                              {...field}
                            />
                          </div>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <SelectLocationFields/>
                  <FormField
                    control={methods.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#272525]">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-10 border-[#272525]/20 focus-visible:ring-[#272525]"
                              placeholder="email@exemplo.com"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#272525]">CPF</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apenas números"
                            className="border-[#272525]/20 focus-visible:ring-[#272525]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="creci"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#272525]">CRECI</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-10 border-[#272525]/20 focus-visible:ring-[#272525]"
                              placeholder="Número do CRECI"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#272525]">Função</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                              <SelectTrigger className="pl-10 border-[#272525]/20 focus:ring-[#272525]">
                                <SelectValue placeholder="Selecione a função" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Administrador</SelectItem>
                            <SelectItem value="agente">Agente</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#272525]">Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-[#272525]/20 focus:ring-[#272525]">
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Inativo">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  className="border-[#272525]/20 text-[#272525] hover:bg-[#272525]/10"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#272525] hover:bg-[#006a80] text-white" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2" size={18} />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "700px",
    width: "90%",
    maxHeight: "90%",
    overflow: "auto",
    borderRadius: "8px",
    padding: "0",
    border: "1px solid rgba(0, 128, 153, 0.2)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
}
