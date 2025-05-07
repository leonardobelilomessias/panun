"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface DocumentationStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export function DocumentationStep({ formData, updateFormData }: DocumentationStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          value={formData.cpf}
          onChange={(e) => updateFormData({ cpf: e.target.value })}
          placeholder="Digite seu CPF"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rg">RG</Label>
        <Input
          id="rg"
          value={formData.rg}
          onChange={(e) => updateFormData({ rg: e.target.value })}
          placeholder="Digite seu RG"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endereco">Endereço Completo</Label>
        <Textarea
          id="endereco"
          value={formData.endereco}
          onChange={(e) => updateFormData({ endereco: e.target.value })}
          placeholder="Digite seu endereço completo"
          rows={3}
        />
      </div>
    </div>
  )
}
