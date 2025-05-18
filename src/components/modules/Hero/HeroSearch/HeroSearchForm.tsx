"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { supabaseClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { Search } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { metropolitanCities, neighborhoods, propertyTypes } from "./data"

const questionSchema = z.object({
  searchType: z.enum(["comprar", "alugar"], {
    required_error: "Selecione o que deseja (comprar ou alugar)",
  }),
  code: z.string().optional(),
  propertyType: z.string({
    required_error: "Selecione o tipo de imóvel",
  }),
  price: z
    .object({
      min: z.number().min(0, "Valor mínimo não pode ser negativo").optional(),
      max: z.number().min(0, "Valor máximo não pode ser negativo").optional(),
    })
    .optional(),
  city: z.string({
    required_error: "Selecione a cidade",
  }),
  neighborhood: z.string().optional(),
  bedrooms: z.number().min(0, "Número de dormitórios não pode ser negativo").optional(),
  parkingSpaces: z.number().min(0, "Número de vagas não pode ser negativo").optional(),
})

export function HeroSearchForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [user, setUser] = useState<User | null>()

  async function getuser() {
    const { data } = await supabaseClient().auth.getUser()
    setUser(data.user)
  }

  const form = useForm<z.infer<typeof questionSchema>>({
    mode: "onTouched",
    resolver: zodResolver(questionSchema),
    defaultValues: {
      searchType: undefined,
      code: "",
      propertyType: "",
      price: { min: undefined, max: undefined },
      city: "",
      neighborhood: "",
      bedrooms: undefined,
      parkingSpaces: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof questionSchema>) {
    const mountLink = `/imoveis?categoria=${data.searchType}&tipo=${data.propertyType}&cidade=${data.city}&bairro=${data.neighborhood}`
    router.push(mountLink)
    try {
      // Lógica adicional se necessário
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Não foi possível processar sua busca.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 hidden md:block">Buscar Imóveis</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <SelectFormHero
              array={["comprar", "alugar"]}
              label="modalidade"
              name="searchType"
              form={form}
              placeholderField="O que você deseja?"
            />

            <SelectFormHero
              array={propertyTypes}
              name="propertyType"
              label="tipo"
              form={form}
              placeholderField="Tipo de imóvel"
            />

            <SelectFormHero
              array={metropolitanCities}
              label="cidade"
              name="city"
              form={form}
              placeholderField="Qual cidade?"
            />

            <SelectFormHero
              array={neighborhoods}
              name="neighborhood"
              label="Bairro"
              form={form}
              placeholderField="Qual Bairro"
            />

            <Button type="submit" className="bg-primary-palet hover:bg-primary-palet/90 text-white h-[42px] mt-auto">
              <Search className="mr-2 h-4 w-4" />
              Buscar Imóvel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export function SelectFormHero({
  form,
  name,
  array,
  placeholderField,
  label,
}: {
  form: any
  name: string
  array: any[]
  placeholderField: string
  label: string
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm text-gray-600">{label.charAt(0).toUpperCase() + label.slice(1)}</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="w-full bg-white border-gray-200 focus:border-primary-palet focus:ring focus:ring-primary-palet/20">
                <SelectValue placeholder={placeholderField} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[300px]">
              {array.map((item, key) => (
                <SelectItem key={key} value={item.trim() as string}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  )
}
