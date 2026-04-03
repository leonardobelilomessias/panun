"use client"

import type React from "react"

import { Plus, Save, UserIcon, Phone, Mail, Calendar, DollarSign, Home } from "lucide-react"
import Modal from "react-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { createLead } from "@/lib/supabase/queries/client/leads/createLead"
import { useToast } from "@/components/ui/use-toast"

export interface AddLeadProps {
  reloadData: () => void
  children?: React.ReactNode
}

export function DialogFormAddLead({ reloadData, children }: AddLeadProps) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    interest: "",
    status: "Novo",
    birth_date: null,
    income: "",
    marital_status: "",
    fgts: "",
  })

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function handleChange(e: any) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSelectChange(name: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleDateChange(date: any) {
    setFormData((prev) => ({
      ...prev,
      birth_date: date,
    }))
  }

  async function handleSubmit(e: any) {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      // Formato do dado para o backend
      const leadData = {
        ...formData,
        // Converter valores numéricos se necessário
        income: formData.income ? Number.parseFloat(formData.income) : null,
        fgts: formData.fgts ? Number.parseFloat(formData.fgts) : null,
      }

      // Chamada para a API para criar o lead
      const response = await createLead(leadData)

      if (response.error) {
        toast({
          title: "Erro ao criar lead",
          description: response.error.message || "Ocorreu um erro ao criar o lead.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Lead criado com sucesso",
        description: "O novo lead foi adicionado ao sistema.",
      })

      // Recarregar a lista após adicionar com sucesso
      reloadData()
      setIsOpen(false)

      // Resetar o formulário
      setFormData({
        name: "",
        phone: "",
        email: "",
        source: "",
        interest: "",
        status: "Novo",
        birth_date: null,
        income: "",
        marital_status: "",
        fgts: "",
      })
    } catch (error) {
      console.error("Erro ao criar lead:", error)
      toast({
        title: "Erro ao criar lead",
        description: "Ocorreu um erro ao tentar criar o lead.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {children ? (
        <div onClick={openModal}>{children}</div>
      ) : (
        <Button
          onClick={openModal}
          className="bg-[#272525] hover:bg-[#006b80] text-white px-4 py-2 rounded w-full md:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Lead
        </Button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Adicionar Novo Lead"
        ariaHideApp={false}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center text-[#272525]">
            <UserIcon className="mr-2 h-5 w-5" />
            Adicionar Novo Lead
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-800">Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                      <Input
                        className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                        placeholder="Nome completo"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                      <Input
                        className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                        placeholder="(XX) XXXXX-XXXX"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                      <Input
                        className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                        placeholder="email@exemplo.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                      <Input
                        className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                        placeholder="DD/MM/AAAA"
                        name="birth_date"
                        value={formData.birth_date ? new Date(formData.birth_date).toLocaleDateString("pt-BR") : ""}
                        onChange={handleChange}
                        type="date"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Origem</label>
                    <Select onValueChange={(value) => handleSelectChange("source", value)} value={formData.source}>
                      <SelectTrigger className="border-gray-300 focus:ring-[#272525]">
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Site">Site</SelectItem>
                        <SelectItem value="Redes Sociais">Redes Sociais</SelectItem>
                        <SelectItem value="Indicação">Indicação</SelectItem>
                        <SelectItem value="Outdoor">Outdoor</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <Select onValueChange={(value) => handleSelectChange("status", value)} value={formData.status}>
                      <SelectTrigger className="border-gray-300 focus:ring-[#272525]">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Novo">Novo</SelectItem>
                        <SelectItem value="Em Negociação">Em Negociação</SelectItem>
                        <SelectItem value="Convertido">Convertido</SelectItem>
                        <SelectItem value="Descarte">Descarte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-800">Informações Financeiras</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Renda Mensal</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                      <Input
                        className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                        placeholder="R$ 0,00"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">FGTS Disponível</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                      <Input
                        className="pl-10 border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                        placeholder="R$ 0,00"
                        name="fgts"
                        value={formData.fgts}
                        onChange={handleChange}
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Estado Civil</label>
                    <Select
                      onValueChange={(value) => handleSelectChange("marital_status", value)}
                      value={formData.marital_status}
                    >
                      <SelectTrigger className="border-gray-300 focus:ring-[#272525]">
                        <SelectValue placeholder="Selecione o estado civil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>
                        <SelectItem value="Casado(a)">Casado(a)</SelectItem>
                        <SelectItem value="Divorciado(a)">Divorciado(a)</SelectItem>
                        <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>
                        <SelectItem value="União Estável">União Estável</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-800">Interesse do Lead</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div>
                  <label className="block text-sm font-medium mb-1">Interesse</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 h-4 w-4 text-[#272525]" />
                    <Textarea
                      className="pl-10 min-h-[80px] border-gray-300 focus:border-[#272525] focus:ring-[#272525]"
                      placeholder="Ex: Apartamento 3 quartos em São Paulo"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Descreva o tipo de imóvel que o lead está procurando, localização e outras informações relevantes.
                  </p>
                </div>
              </CardContent>
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
                    Adicionar Lead
                  </>
                )}
              </Button>
            </div>
          </form>
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
