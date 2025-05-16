"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FinanceStep() {
  const form = useFormContext()

  // Função para formatar o valor como moeda
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "")
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(numericValue) / 100)
  }

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço (R$)</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Valor do imóvel"
                onChange={(e) => {
                  // Permitir apenas números
                  const value = e.target.value.replace(/\D/g, "")
                  field.onChange(value)
                }}
                value={field.value}
              />
            </FormControl>
            {field.value && <p className="text-sm text-muted-foreground">{formatCurrency(field.value)}</p>}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="iptu"
        render={({ field }) => (
          <FormItem>
            <FormLabel>IPTU Anual (R$)</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Valor do IPTU"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  field.onChange(value)
                }}
                value={field.value}
              />
            </FormControl>
            {field.value && <p className="text-sm text-muted-foreground">{formatCurrency(field.value)}</p>}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="condominium"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Condomínio (R$)</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Valor do condomínio"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  field.onChange(value)
                }}
                value={field.value}
              />
            </FormControl>
            {field.value && <p className="text-sm text-muted-foreground">{formatCurrency(field.value)}</p>}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="commission"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Comissão (%)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" min="0" max="100" placeholder="Percentual de comissão" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="finance_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status Financeiro</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status financeiro" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Financiado">Financiado</SelectItem>
                <SelectItem value="Quitado">Quitado</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
