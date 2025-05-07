"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export function DetailsStep() {
  const form = useFormContext()

  const caracteristicas = [
    { id: "piscina", label: "Piscina" },
    { id: "churrasqueira", label: "Churrasqueira" },
    { id: "academia", label: "Academia" },
    { id: "playground", label: "Playground" },
    { id: "salaoFestas", label: "Salão de Festas" },
    { id: "seguranca24h", label: "Segurança 24h" },
    { id: "mobiliado", label: "Mobiliado" },
    { id: "arCondicionado", label: "Ar Condicionado" },
    { id: "areaServico", label: "Área de Serviço" },
    { id: "quintal", label: "Quintal" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="areaTotal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Área Total (m²)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 120" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="areaConstruida"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Área Construída (m²)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="quartos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quartos</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="suites"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suítes</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="banheiros"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banheiros</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vagas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vagas</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="caracteristicas"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>Características e Comodidades</FormLabel>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {caracteristicas.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="caracteristicas"
                  render={({ field }) => {
                    return (
                      <FormItem key={item.id} className="flex flex-row items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || []
                              return checked
                                ? field.onChange([...currentValue, item.id])
                                : field.onChange(currentValue.filter((value) => value !== item.id))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
