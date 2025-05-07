"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface GeneralInfoStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export function GeneralInfoStep({ formData, updateFormData }: GeneralInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome Completo</Label>
        <Input
          id="nome"
          value={formData.nome}
          onChange={(e) => updateFormData({ nome: e.target.value })}
          placeholder="Digite seu nome completo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="Digite seu email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone</Label>
        <Input
          id="telefone"
          value={formData.telefone}
          onChange={(e) => updateFormData({ telefone: e.target.value })}
          placeholder="Digite seu telefone"
        />
      </div>
    </div>
  )
}
