"use client"

import { useState, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BasicInfoStep } from "./steps/basic-info-step"
import { DetailsStep } from "./steps/details-step"
import { FinanceStep } from "./steps/finance-step"
import { ImagesStep } from "./steps/images-step"
import { StepIndicator } from "./step-indicator"
import { createProperty, uploadPropertyImages } from "@/actions/property-actions"
import { useToast } from "@/hooks/use-toast"
import type { Estate, City, Neighborhood, Owner, Agent, Amenity } from "@/types"
import { getEstates, getCities, getNeighborhoods, getOwners, getAgents, getAmenities } from "@/actions/property-actions"
import { usePropertieContext } from "@/context/ContextAddPropertie"
import { Toaster } from "@/components/ui/toaster"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

// Esquema de validação para cada etapa
const basicInfoSchema = z.object({
  id_owner: z.string().uuid({ message: "Selecione um proprietário" }),
  id_agent: z.string().uuid({ message: "Selecione um agente" }).optional(),
  street: z.string().min(3, { message: "Rua é obrigatória" }),
  house_number: z.string().min(1, { message: "Número é obrigatório" }),
  zipcode: z.string().min(8, { message: "CEP deve ter 8 dígitos" }),
  status: z.enum(["Disponível", "Reservado", "Vendido", "Alugado", "Indisponível"], {
    message: "Selecione um status válido",
  }),
  city_id: z.string().uuid({ message: "Selecione uma cidade" }),
  neighborhood_id: z.string().uuid({ message: "Selecione um bairro" }),
  estate_id: z.string().uuid({ message: "Selecione um estado" }),
  purpose: z.enum(["Aluguel", "Venda"], {
    message: "Selecione uma Finalidade",
  }),
  documentation_status: z.enum(["Regular", "Irregular"], {
    message: "Selecione o status da documentação",
  }),
  type_property: z.enum(["Casa", "Apartamento","Lote","Loja"], {
    message: "Selecione o status da documentação",
  }),
})

const detailsSchema = z.object({
  title: z.string().min(10, { message: "O Titulo deve ter pelo menos 10 caracteres" }),
  full_description: z.string().min(20, { message: "Descrição completa deve ter pelo menos 20 caracteres" }),
  shot_description: z.string().min(10, { message: "Descrição curta deve ter pelo menos 10 caracteres" }),
  garage: z.string().min(1, { message: "Informe o número de garagens" }),
  bathroom: z.string().min(1, { message: "Informe o número de banheiros" }),
  bedroom: z.string().min(1, { message: "Informe o número de quartos" }),
  total_area: z.string().min(1, { message: "Informe a área total" }),
  usable_area: z.string().min(1, { message: "Informe a área útil" }),
  reference_point: z.string().optional(),
  furnished: z.boolean().default(false),
  flor: z.string().optional(),
  address: z.string().min(5, { message: "Endereço completo é obrigatório" }),
  amenities: z.array(z.string()).optional(),
})

const financeSchema = z.object({
  price: z.string().min(1, { message: "Informe o preço" }),
  iptu: z.string().optional(),
  condominium: z.string().optional(),
  commission: z.string().optional(),
  finance_status: z.string().optional(),
})

const imagesSchema = z.object({
  mainImage: z.string().min(5, { message: "A imagem principal é obrigatória" }),
  images: z.array(z.string().min(1, { message: "Adicione pelo menos uma imagem adicional" })),


})

// Esquema completo do formulário
const formSchema = z.object({
  ...basicInfoSchema.shape,
  ...detailsSchema.shape,
  ...financeSchema.shape,
  ...imagesSchema.shape,
})

// Tipo inferido do esquema
type FormValues = z.infer<typeof formSchema>


export function MultiStepForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [estates, setEstates] = useState<Estate[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [owners, setOwners] = useState<Owner[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const { toast } = useToast()
  const {cover, files} = usePropertieContext()

  // Carregar dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true)
        console.log("Carregando dados iniciais...")

        // Carregar proprietários primeiro para verificar se estão sendo buscados corretamente
        const ownersData = await getOwners()
        console.log("Proprietários carregados:", ownersData)
        setOwners(ownersData)

        // Carregar os demais dados
        const [estatesData, agentsData, amenitiesData] = await Promise.all([getEstates(), getAgents(), getAmenities()])

        setEstates(estatesData)
        setAgents(agentsData)
        setAmenities(amenitiesData)

        console.log("Todos os dados carregados com sucesso")
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados iniciais. Verifique a conexão com o banco de dados.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [toast])

  // Configuração do React Hook Form com Zod
const methods = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  mode: "onChange",
  defaultValues: {

    street: "Rua Iara",
    house_number: "25",
    zipcode: "30280370",
    status: "Disponível",
    city_id: "02bd739e-1522-4fa5-a111-1e02e9109351",
    neighborhood_id: "272312ae-1003-4c83-93b7-b1919ac2bf02",
    estate_id: "86bfb551-5af2-409a-96bf-b17c3b426b95",
    title:"Titulo generico",
    full_description: "full_descriptionfull_description shot_descriptionshot_descriptionshot_description",
    shot_description: "shot_descriptionshot_descriptionshot_descriptionshot_description",
    garage: "1",
    bathroom: "1",
    bedroom: "3",
    total_area: "55.5",
    usable_area: "55.8",
    reference_point: "igreja",
    furnished: false,
    flor: "4",
    address: "teste",
    amenities: [],
    price: "50000000",
    iptu: "50000",
    condominium: "5000",
    commission: "50",
    finance_status: "Pendente",
    mainImage: undefined,
    images: [],
    purpose:"Venda",
    documentation_status:"Regular",
    type_property:"Casa"

  },
})

const steps = [
  { id: 1, name: "Informações Básicas", component: BasicInfoStep, schema: basicInfoSchema },
  { id: 2, name: "Detalhes", component: DetailsStep, schema: detailsSchema },
  { id: 3, name: "Financeiro", component: FinanceStep, schema: financeSchema },
  { id: 4, name: "Imagens", component: ImagesStep, schema: imagesSchema },
]

  // Observar mudanças no estado selecionado para carregar cidades
  useEffect(() => {
    const estateId = methods.watch("estate_id")
    if (estateId) {
      getCities(estateId).then((data) => setCities(data))
    } else {
      setCities([])
    }
    methods.setValue("city_id", "")
    methods.setValue("neighborhood_id", "")
  }, [methods.watch("estate_id")])

  // Observar mudanças na cidade selecionada para carregar bairros
  useEffect(() => {
    const cityId = methods.watch("city_id")
    if (cityId) {
      getNeighborhoods(cityId).then((data) => setNeighborhoods(data))
    } else {
      setNeighborhoods([])
    }
    methods.setValue("neighborhood_id", "")
  }, [methods.watch("city_id")])

  const currentStepData = steps.find((step) => step.id === currentStep)
  const CurrentStepComponent = currentStepData?.component

  const handleNext = async () => {
    const currentSchema = currentStepData?.schema
    if (!currentSchema) return

    const isValid = await methods.trigger(Object.keys(currentSchema.shape) as Array<keyof FormValues>)

    if (isValid && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const onSubmit = async (data: FormValues) => {

    if (currentStep === steps.length) {

      setIsSubmitting(true)

      try {
        // 1. Criar a propriedade no banco de dados
        const result = await createProperty(data)
        
        if (!result.success) throw new Error("Erro ao criar propriedade")

        // 2. Criar o FormData para o envio das imagens
        const formData = new FormData()
        if (cover) formData.append("cover", cover)
        files.forEach((file) => formData.append("images", file))

        // 3. Fazer upload das imagens
        const uploadResult = await uploadPropertyImages(result.propertyId, formData)
        if (!uploadResult.success) throw new Error("Erro ao fazer upload das imagens")
          console.log("Imóvel cadastrado com sucesso:", uploadResult)
        toast({
          title: "Sucesso!",
          description: "Imóvel cadastrado com sucesso.",
        })

        // Resetar o formulário
        methods.reset()
        setCurrentStep(1)
        router.push(`/imovel-adicionado/${result.propertyId}`)
      } catch (error) {
        console.error("Erro ao cadastrar imóvel:", error)
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao cadastrar o imóvel. Tente novamente.",
          variant: "destructive",
        })
      
      } finally {
        setIsSubmitting(false)
      }
    } else {
      handleNext()
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>
              Etapa {currentStep} de {steps.length}
            </CardTitle>
            <StepIndicator steps={steps} currentStep={currentStep} />
          </CardHeader>
          <CardContent>
            {CurrentStepComponent && (
              <CurrentStepComponent
                estates={estates}
                cities={cities}
                neighborhoods={neighborhoods}
                owners={owners}
                agents={agents}
                amenities={amenities}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1 || isSubmitting}
            >
              Anterior
            </Button>
            {currentStep === steps.length ? (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar Imóvel"}
              </Button>
            ) : (
              <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                Próximo
              </Button>
              
            )}
          </CardFooter>
        </Card>
      </form>
      <Toaster/>

    </FormProvider>
  )
}
