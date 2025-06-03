"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { supabaseClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ArrowLeft, BadgeCheck, Building2, CalendarIcon, Home, Mail, MapPin, Phone, Save, UserIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SelectLocationFields } from "@/Screens/OwnersScreens/NewOwnerScreen/SelecLocations"
import { insertAgent } from "@/lib/supabase/queries/client/Agents/insertAgent"

const agentSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  phone: z.string().min(10, "Telefone é obrigatório"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  birth_date: z.string().optional().or(z.literal("")),
  cpf: z.string().length(11, "CPF inválido").optional().or(z.literal("")),
  city_id: z.string().uuid().optional().or(z.literal("")),
  estate_id: z.string().uuid().optional().or(z.literal("")),
  neighborhood_id: z.string().uuid().optional().or(z.literal("")),
  zipcode: z.string().optional().or(z.literal("")),
  street: z.string().optional().or(z.literal("")),
  house_number: z.string().optional().or(z.literal("")),
  status: z.enum(["Ativo", "Inativo"]).default("Ativo"),
  role: z.enum(["admin", "agente"]).default("agente"),
  creci: z.string().optional().or(z.literal("")),
})

export function NewAgentScreen() {
  const [queryClient] = useState(() => new QueryClient())
  const { toast } = useToast()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<User | null>()

  async function getuser() {
    const { data } = await supabaseClient().auth.getUser()
    console.log("getuser", data)
    setUser(data.user)
  }

  const form = useForm<z.infer<typeof agentSchema>>({
    mode: "onTouched",
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      birth_date: "",
      cpf: "",
      city_id: "",
      estate_id: "",
      neighborhood_id: "",
      zipcode: "",
      street: "",
      house_number: "",
      status: "Ativo",
      role: "agente",
      creci: "",
    },
  })

  async function onSubmit(data: z.infer<typeof agentSchema>) {
    setIsSaving(true)
    try {
      const resp = await insertAgent(data)

      if (resp?.error) {
        toast({
          title: "Erro!",
          description: `Erro ao adicionar agente: ${resp?.error.message}`,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Sucesso!",
        description: "Agente cadastrado com sucesso.",
      })

      router.push("/corretores")
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro inesperado ao salvar agente.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container max-w-5xl py-10">
      <QueryClientProvider client={queryClient}>
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Novo Agente</h1>
            <p className="text-muted-foreground">Cadastre um novo agente no sistema</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="info">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Informações Pessoais
                </TabsTrigger>
                <TabsTrigger value="address">
                  <MapPin className="h-4 w-4 mr-2" />
                  Endereço
                </TabsTrigger>
              </TabsList>

              <Card>
                <TabsContent value="info" className="mt-0">
                  <CardHeader>
                    <CardTitle>Dados do Agente</CardTitle>
                    <CardDescription>Preencha as informações básicas do agente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="Nome completo" {...field} />
                              </div>
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
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="(XX) XXXXX-XXXX" {...field} />
                              </div>
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
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="email@exemplo.com" {...field} />
                              </div>
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

                      <FormField
                        control={form.control}
                        name="birth_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" type="date" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="creci"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CRECI</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="Número do CRECI" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Função</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <SelectTrigger className="pl-10">
                                    <SelectValue placeholder="Selecione a função" />
                                  </SelectTrigger>
                                </div>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="admin">Administrador</SelectItem>
                                <SelectItem value="agente">Agente</SelectItem>
                              </SelectContent>
                            </Select>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Ativo">Ativo</SelectItem>
                                <SelectItem value="Inativo">Inativo</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </TabsContent>

                <TabsContent value="address" className="mt-0">
                  <CardHeader>
                    <CardTitle>Endereço</CardTitle>
                    <CardDescription>Informações de localização do agente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Componente de seleção de localização */}
                      <SelectLocationFields />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                <div className="relative">
                                  <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="Nome da rua" {...field} />
                                </div>
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
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>

                <CardFooter className="flex justify-between border-t p-6">
                  <Button type="button" variant="outline" onClick={() => router.push("/corretores")}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary-palet hover:bg-primary-palet/90 text-white"
                    disabled={isSaving}
                  >
                    {isSaving ? (
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
                        Salvar Agente
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </Tabs>
          </form>
        </Form>
      </QueryClientProvider>
    </div>
  )
}