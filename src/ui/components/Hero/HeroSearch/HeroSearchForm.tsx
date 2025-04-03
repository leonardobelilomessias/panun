"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { SelectCountryForm, SelectThemeForm } from "@/ui/components/Forms/Selects";
import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { insertQuestion } from "@/lib/supabase/queries/server/questions";
import { ContainerScreen } from "@/ui/components/Containers/ContainerSceen";
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { metropolitanCities, neighborhoods, propertyTypes } from "./data";
const questionSchema = z.object({
  searchType: z.enum(["comprar", "alugar"], {
    required_error: "Selecione o que deseja (comprar ou alugar)",
  }),
  code: z.string().optional(), // Código é opcional
  propertyType: z.string({
    required_error: "Selecione o tipo de imóvel",
  }),
  price: z.object({
    min: z.number().min(0, "Valor mínimo não pode ser negativo").optional(),
    max: z.number().min(0, "Valor máximo não pode ser negativo").optional(),
  }).optional(),
  city: z.string({
    required_error: "Selecione a cidade",
  }),
  neighborhood: z.string().optional(), // Bairro é opcional
  bedrooms: z.number().min(0, "Número de dormitórios não pode ser negativo").optional(),
  parkingSpaces: z.number().min(0, "Número de vagas não pode ser negativo").optional(),
});

export function HeroSearchForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User | null>()
  async function getuser() {
    const { data } = await supabaseClient().auth.getUser()
    console.log('getuser', data)
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
  });

  async function onSubmit(data: z.infer<typeof questionSchema>) {
    console.log(data)
    const mountLink =`/imoveis?categoria=${data.searchType}&tipo=${data.propertyType}&cidade=${data.city}&bairro=${data.neighborhood}` 
    console.log(mountLink)
    router.push(mountLink)
    try {

    } catch (error) {
      toast({
        title: "Erro!",
        description: "Não foi possível publicar sua pergunta.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="   p-4 w-full ">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 flex flex-wrap bg-white bg-opacity-95 p-6 shadow-lg rounded-lg gap-2 absolute md:left-1/4 md:-bottom-16  min-w-[90vw] md:min-w-10   items-center justify-center ">
          {/* <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da Pergunta</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título da sua pergunta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <SelectThemeForm form={form} />
          <SelectCountryForm form={form} /> */}
          <div className="flex flex-col md:flex-row flex-1 gap-2">

          <SelectFormHero  array={["comprar", "alugar"]} name="searchType" form={form} placeholderField={"Oque você deseja?"} />
          <SelectFormHero  array={propertyTypes} name="propertyType" form={form} placeholderField={"Typo de imóvel"} />
          <SelectFormHero array={metropolitanCities} name="city" form={form} placeholderField={"Qual cidade?"} />
          <SelectFormHero  array={neighborhoods} name="neighborhood" form={form} placeholderField={"Qual Bairro"} />
          {/* <SelectFormHero  array={metropolitanCities} name="bedrooms" form={form} placeholderField={"meuplaceholder"} />
          <SelectFormHero  array={metropolitanCities} name="parkingSpaces" form={form} placeholderField={"meuplaceholder"} /> */}
            <Button type="submit" className="bg-primaryPalet md:self-end md:justify-self-end">
              Buscar Imóvel
            </Button>

          </div>

        </form>
      </Form>
    </div>
  );
} 



export function SelectFormHero({ form, name, array , placeholderField}: { form: any,name:string, array:any[] , placeholderField:string}) {
  return (
    <>
      <div className='flex'>

      </div>
      <FormField
      
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="min-w-52">
            <FormLabel>Selecione o {name}</FormLabel>
            <Select onValueChange={field.onChange} >
              <FormControl >
                <SelectTrigger>
                  <SelectValue placeholder={placeholderField}/>
                </SelectTrigger>
              </FormControl>
              <SelectContent >
                {array.map((city, key) => (
                  <SelectItem className='flex flex-row ' style={{ display: "flex" }} key={key} value={city.trim() as string}>
                    <div className='flex align-middle justify-center items-center'>
                      <p className=''>{city}</p>
                    </div>
                  </SelectItem>))}

              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}