"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { Amenity } from "@/types"

interface DetailsStepProps {
  amenities: Amenity[]
}

export function DetailsStep({ amenities }: DetailsStepProps) {
  const form = useFormContext()

  return (
    <div className="space-y-6">
            <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titulo</FormLabel>
            <FormControl>
              <Input placeholder="Titulo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shot_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição Curta</FormLabel>
            <FormControl>
              <Input placeholder="Breve descrição do imóvel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="full_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição Completa</FormLabel>
            <FormControl>
              <Textarea placeholder="Descrição detalhada do imóvel" rows={5} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="bedroom"
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
          name="bathroom"
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
          name="garage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Garagens</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="flor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Andar</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="total_area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Área Total (m²)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="usable_area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Área Útil (m²)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="reference_point"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ponto de Referência</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Próximo ao Shopping" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Endereço Completo</FormLabel>
            <FormControl>
              <Textarea placeholder="Endereço completo do imóvel" rows={2} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="furnished"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Mobiliado</FormLabel>
              <p className="text-sm text-muted-foreground">O imóvel já vem com móveis e eletrodomésticos.</p>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amenities"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>Características e Comodidades</FormLabel>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenities.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="amenities"
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
                                : field.onChange(currentValue.filter((value:any) => value !== item.id))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{item.name}</FormLabel>
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
