"use client"

import { Edit, Save, User, Phone, Mail, Tag, Building2 } from "lucide-react"
import Modal from "react-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { updateLead } from "@/lib/supabase/queries/client/leads/updateLead"
import { useToast } from "@/components/ui/use-toast"

export interface LeadFormProps {
  lead: {
    id: string
    name: string
    phone: string
    email: string
    status: "Ativo" | "Inativo" | "Convertido" | "Desistiu"
    source: string
    notes?: string
    interest?: string
    city?: string
    estate?: string
    last_contact?: string
  }
  reloadData: () => void
}

const leadFormSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  phone: z.string().min(10, "Telefone é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  status: z.enum(["Ativo", "Inativo", "Convertido", "Desistiu"]),
  source: z.string().min(1, "Origem é obrigatória"),
  notes: z.string().optional().or(z.literal("")),
  interest: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  estate: z.string().optional().or(z.literal("")),
})

export function DialogFormLead({ lead, reloadData }: LeadFormProps) {
  return <DialogEditLead lead={lead} reloadData={reloadData} />
}

function DialogEditLead({ lead, reloadData }: LeadFormProps) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const methods = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    mode: "onChange",
    defaultValues: {
      name: lead.name,
      phone: lead.phone,
      email: lead.email || "",
      status: lead.status,
      source: lead.source || "",
      notes: lead.notes || "",
      interest: lead.interest || "",
      city: lead.city || "",
      estate: lead.estate || "",
    },
  })

  async function onSubmit(data: z.infer<typeof leadFormSchema>) {
    try {
      setIsSubmitting(true)

      const result = await updateLead(lead.id, data)

      if (!result.success) {
        toast({
          title: "Erro ao atualizar",
          description: "Não foi possível atualizar os dados do lead.",
          variant: "destructive",
        })
        throw new Error("Erro ao atualizar lead")
      }

      toast({
        title: "Lead atualizado",
        description: "Os dados do lead foram atualizados com sucesso.",
      })

      reloadData()
      setIsOpen(false)
    } catch (error) {
      console.error("Erro ao atualizar lead:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Button
        onClick={openModal}
        variant="outline"
        className="h-9 w-9 p-0 hover:border-[#272525] hover:text-[#272525]"
        title="Editar Lead"
      >
        <Edit className="h-4 w-4" />
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Editar Dados do Lead"
        ariaHideApp={false}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center text-[#272525]">
            <User className="mr-2 h-5 w-5" />
            Editar Dados do Lead
          </h2>

          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
              <Card className="p-4 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={methods.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                            <Input
                              className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
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
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                            <Input
                              className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                              placeholder="(XX) XXXXX-XXXX"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                            <Input
                              className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
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
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origem</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Tag className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                            <Input
                              className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                              placeholder="Ex: Facebook, Instagram, Indicação"
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
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Cidade"
                            className="border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="estate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Estado"
                            className="border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interesse</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                            <Input
                              className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                              placeholder="Ex: Apartamento, Casa, Terreno"
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
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-300 focus:ring-[#272525]">
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Inativo">Inativo</SelectItem>
                            <SelectItem value="Convertido">Convertido</SelectItem>
                            <SelectItem value="Desistiu">Desistiu</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={methods.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-24 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                          placeholder="Observações sobre o lead, histórico de conversas, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={closeModal} className="border-gray-300">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#272525] hover:bg-[#006b80] text-white" disabled={isSubmitting}>
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
    padding: 0,
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
}
