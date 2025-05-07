"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BasicInfoStep() {
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
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="titulo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título do Anúncio</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Apartamento moderno próximo ao centro" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Imóvel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="rural">Rural</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="finalidade"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Finalidade</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="venda" id="venda" />
                    <FormLabel htmlFor="venda" className="font-normal">
                      Venda
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aluguel" id="aluguel" />
                    <FormLabel htmlFor="aluguel" className="font-normal">
                      Aluguel
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ambos" id="ambos" />
                    <FormLabel htmlFor="ambos" className="font-normal">
                      Ambos
                    </FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="valor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Valor (R$)</FormLabel>
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
        name="descricao"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea placeholder="Descreva o imóvel detalhadamente" rows={5} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
