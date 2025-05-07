"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BasicInfoStep } from "./steps/basic-info-step"
import { DetailsStep } from "./steps/details-step"
import { LocationStep } from "./steps/location-step"
import { ImagesStep } from "./steps/images-step"
import { StepIndicator } from "./step-indicator"

// Esquema de validação para cada etapa
const basicInfoSchema = z.object({
  titulo: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
  tipo: z.enum(["apartamento", "casa", "terreno", "comercial", "rural"], {
    message: "Selecione um tipo de imóvel válido",
  }),
  finalidade: z.enum(["venda", "aluguel", "ambos"], {
    message: "Selecione uma finalidade válida",
  }),
  valor: z.string().min(1, { message: "Informe o valor do imóvel" }),
  descricao: z.string().min(20, { message: "A descrição deve ter pelo menos 20 caracteres" }),
})

const detailsSchema = z.object({
  areaTotal: z.string().min(1, { message: "Informe a área total" }),
  areaConstruida: z.string().min(1, { message: "Informe a área construída" }),
  quartos: z.string().min(1, { message: "Informe o número de quartos" }),
  banheiros: z.string().min(1, { message: "Informe o número de banheiros" }),
  suites: z.string(),
  vagas: z.string(),
  caracteristicas: z.array(z.string()),
})

const locationSchema = z.object({
  cep: z.string().length(8, { message: "CEP deve ter 8 dígitos" }),
  endereco: z.string().min(3, { message: "Informe o endereço" }),
  numero: z.string().min(1, { message: "Informe o número" }),
  complemento: z.string().optional(),
  bairro: z.string().min(2, { message: "Informe o bairro" }),
  cidade: z.string().min(2, { message: "Informe a cidade" }),
  estado: z.string().length(2, { message: "Selecione o estado" }),
})

const imagesSchema = z.object({
  fotoPrincipal: z.any().optional(),
  fotos: z.array(z.any()).optional(),
})

// Esquema completo do formulário
const formSchema = z.object({
  ...basicInfoSchema.shape,
  ...detailsSchema.shape,
  ...locationSchema.shape,
  ...imagesSchema.shape,
})

// Tipo inferido do esquema
type FormValues = z.infer<typeof formSchema>

const steps = [
  {
    id: 1,
    name: "Informações Básicas",
    component: BasicInfoStep,
    schema: basicInfoSchema,
  },
  {
    id: 2,
    name: "Detalhes",
    component: DetailsStep,
    schema: detailsSchema,
  },
  {
    id: 3,
    name: "Localização",
    component: LocationStep,
    schema: locationSchema,
  },
  {
    id: 4,
    name: "Imagens",
    component: ImagesStep,
    schema: imagesSchema,
  },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)

  // Configuração do React Hook Form com Zod
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      titulo: "",
      tipo: "apartamento",
      finalidade: "venda",
      valor: "",
      descricao: "",
      areaTotal: "",
      areaConstruida: "",
      quartos: "",
      banheiros: "",
      suites: "",
      vagas: "",
      caracteristicas: [],
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      fotoPrincipal: null,
      fotos: [],
    },
  })

  const currentStepData = steps.find((step) => step.id === currentStep)
  const CurrentStepComponent = currentStepData?.component

  const handleNext = async () => {
    // Validar apenas os campos da etapa atual
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

  const onSubmit = (data: FormValues) => {
    if (currentStep === steps.length) {
      // Aqui você pode enviar os dados para o servidor
      console.log("Dados do imóvel:", data)
      alert("Imóvel cadastrado com sucesso!")
    } else {
      handleNext()
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className=" mx-auto">
          <CardHeader>
            <CardTitle>
              Etapa {currentStep} de {steps.length}
            </CardTitle>
            <StepIndicator steps={steps} currentStep={currentStep} />
          </CardHeader>
          <CardContent>{CurrentStepComponent && <CurrentStepComponent />}</CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Anterior
            </Button>
            {currentStep === steps.length ? (
              <Button type="submit">Cadastrar Imóvel</Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                Próximo
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}
