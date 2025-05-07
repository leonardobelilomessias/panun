"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SelectCountryForm, SelectThemeForm } from "@/components/modules/Forms/Selects";
import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { insertQuestion } from "@/lib/supabase/queries/server/questions";
import { ContainerScreen } from "@/components/modules/Containers/ContainerSceen";
import { insertOwner } from "@/lib/supabase/queries/client/Owners/insertOwner";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { fetchCities, fetchEstates, fetchNeighborhoods } from "@/lib/supabase/queries/client/locations";
import { SelectLocationFields } from "./SelecLocations";

const ownerSchema = z.object({
    name: z.string().min(3, "Nome é obrigatório"),
    phone: z.string().min(10, "Telefone é obrigatório"),
    email: z.string().email().optional(),
    birth_date: z.string().optional(),
    cpf: z.string().length(11, "CPF inválido").optional(),
    city_id: z.string().uuid().optional(),
    estate_id: z.string().uuid().optional(),
    neighborhood_id: z.string().uuid().optional(),
    zipcode: z.string().optional(),
    street: z.string().optional(),
    house_number: z.string().optional(),
    status: z.enum(["Ativo", "Inativo"]).default("Ativo"),
    type: z.enum(["Construtora", "Proprietário Particular"]),
  });
export function NewOwner() {
  const [queryClient] = useState(() => new QueryClient());
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User | null>()
  async function getuser() {
    const { data } = await supabaseClient().auth.getUser()
    console.log('getuser', data)
    setUser(data.user)

  }

  const form = useForm<z.infer<typeof ownerSchema>>({
    mode: "onTouched",
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      cpf: "",
      type: "Proprietário Particular",
      status: "Ativo",
    },
  });

  async function onSubmit(data: z.infer<typeof ownerSchema>) {
    try {
      const resp = await insertOwner(data);
  
      if (resp.error) {
        toast({
          title: "Erro!",
          description: `Erro ao adicionar proprietário: ${resp.error.message}`,
          variant: "destructive",
        });
        return;
      }
  
      toast({
        description: "Proprietário cadastrado com sucesso.",
      });
  
      router.push("/proprietarios"); // ajuste conforme sua rota
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro inesperado ao salvar proprietário.",
        variant: "destructive",
      });
    }
  }
  

  return (
    <ContainerScreen>
        <QueryClientProvider client={queryClient}>
      <h1 className="text-2xl font-bold mb-6">Cadastrar novo Propietario</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 container">
        <FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Nome</FormLabel>
      <FormControl>
        <Input placeholder="Nome completo do proprietário" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Telefone</FormLabel>
      <FormControl>
        <Input placeholder="(XX) XXXXX-XXXX" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="email@exemplo.com" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="birth_date"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Data de Nascimento</FormLabel>
      <FormControl>
        <Input type="date" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="cpf"
  render={({ field }) => (
    <FormItem>
      <FormLabel>CPF</FormLabel>
      <FormControl>
        <Input placeholder="Apenas números" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>









<SelectLocationFields />

<FormField
  control={form.control}
  name="zipcode"
  render={({ field }) => (
    <FormItem>
      <FormLabel>CEP</FormLabel>
      <FormControl>
        <Input placeholder="XXXXX-XXX" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

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
        <Input placeholder="Número da casa/apartamento" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="status"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Status</FormLabel>
      <FormControl>
        <select {...field} className="input border rounded p-2 w-full">
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="type"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Tipo</FormLabel>
      <FormControl>
        <select {...field} className="input border rounded p-2 w-full">
          <option value="Construtora">Construtora</option>
          <option value="Proprietário Particular">Proprietário Particular</option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


          <div className="flex gap-4">
            <Button type="submit" className="bg-primary-palet mt-4">
              Salvar Proprietário
            </Button>
          </div>
        </form>
      </Form>
      </QueryClientProvider>
    </ContainerScreen>
  );
} 