"use client"

import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { Estate, City, Neighborhood, Owner, Agent } from "@/types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface BasicInfoStepProps {
  estates: Estate[]
  cities: City[]
  neighborhoods: Neighborhood[]
  owners: Owner[]
  agents: Agent[]
}

export function BasicInfoStep({ estates, cities, neighborhoods, owners, agents }: BasicInfoStepProps) {
  const form = useFormContext()

  // Adicionar log para verificar os proprietários recebidos
  console.log("Proprietários recebidos no componente:", owners)

  const buscarCep = async () => {
    const cep = form.getValues("zipcode")
    if (cep.length < 8) return

    try {
      const cepLimpo = cep.replace(/\D/g, "")
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const data = await response.json()

      if (!data.erro) {
        form.setValue("street", data.logradouro, { shouldValidate: true })
        // Aqui você precisaria mapear a cidade e estado retornados para os IDs correspondentes
        // no seu banco de dados. Esta é uma simplificação.
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="id_owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proprietário</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o proprietário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {owners && owners.length > 0 ? (
                    owners.map((owner) => (
                      <SelectItem key={owner.id} value={owner.id}>
                        {owner.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-owners" disabled>
                      Nenhum proprietário encontrado
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_agent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Corretor</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o corretor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {agents && agents.length > 0 ? (
                    agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-agents" disabled>
                      Nenhum corretor encontrado
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex space-x-2">
        <FormField
          control={form.control}
          name="zipcode"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  placeholder="00000-000"
                  maxLength={8}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    field.onChange(value)
                  }}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-8">
          <Button type="button" variant="outline" size="icon" onClick={buscarCep}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rua</FormLabel>
            <FormControl>
              <Input placeholder="Nome da rua" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="house_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número</FormLabel>
            <FormControl>
              <Input placeholder="Número" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="estate_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {estates && estates.length > 0 ? (
                    estates.map((estate) => (
                      <SelectItem key={estate.id} value={estate.id}>
                        {estate.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-estates" disabled>
                      Nenhum estado encontrado
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={!form.watch("estate_id")}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a cidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities && cities.length > 0 ? (
                    cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-cities" disabled>
                      Nenhuma cidade encontrada
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="neighborhood_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={!form.watch("city_id")}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o bairro" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {neighborhoods && neighborhoods.length > 0 ? (
                    neighborhoods.map((neighborhood) => (
                      <SelectItem key={neighborhood.id} value={neighborhood.id}>
                        {neighborhood.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-neighborhoods" disabled>
                      Nenhum bairro encontrado
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className=" flex flex-row  justify-between gap-12 items-center align-middle">
        <FormField

          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Status do Imóvel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Disponível">Disponível</SelectItem>
                  <SelectItem value="Reservado">Reservado</SelectItem>
                  <SelectItem value="Vendido">Vendido</SelectItem>
                  <SelectItem value="Alugado">Alugado</SelectItem>
                  <SelectItem value="Indisponível">Indisponível</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField

          control={form.control}
          name="type_property"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Tipo de Imovel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo do imovel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Casa">Casa</SelectItem>
                  <SelectItem value="Apartamento">Apartamento</SelectItem>
                  <SelectItem value="Lote">Lote</SelectItem>
                  <SelectItem value="Loja">Loja</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className=" flex flex-row  justify-between gap-12 items-center align-middle">


        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem className="space-y-3 flex-1">
              <FormLabel>Finalidade do Imovel</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Venda" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Venda
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Aluguel" />
                    </FormControl>
                    <FormLabel className="font-normal">Aluguel</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="documentation_status"
          render={({ field }) => (
            <FormItem className="space-y-3 flex-1">
              <FormLabel>Situação Documentação</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Regular" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Regular
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Irregular" />
                    </FormControl>
                    <FormLabel className="font-normal">Irregular</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
    </div>
  )
}
