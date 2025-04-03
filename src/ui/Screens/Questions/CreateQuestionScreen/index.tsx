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
import { SelectCountryForm, SelectThemeForm } from "@/ui/components/Forms/Selects";
import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { insertQuestion } from "@/lib/supabase/queries/server/questions";
import { ContainerScreen } from "@/ui/components/Containers/ContainerSceen";

const questionSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  content: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
  theme_id: z.string().min(1, { message: "Você precisa selecionar um tema" }),
  country_id: z.string().min(1, { message: "Você precisa selecionar um pais " }),
  created_by: z.string(),
});

export function CreateQuestionScreen({ userId }: { userId: string | undefined }) {

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
      title: "",
      content: "",
      country_id: userId,
      theme_id: "",
      created_by: "",
    },
  });

  async function onSubmit(data: z.infer<typeof questionSchema>) {
    console.log(data)
    try {
      // Implementar a lógica de criação da pergunta

      const resp = await insertQuestion({
        title: data.title,
        content: data.content,
        created_by: userId,
        theme_id: data.theme_id,
        country_id: data.country_id,
      })
      if (resp.statusText === "Created") {
        console.log('data send tip', resp);
        toast({
          description: "Sua PErgunta foi adicionada com sucesso.",
        })
        router.push(`/perguntas/pergunta-criada/${resp?.data[0]?.id}`)
      }
      if (resp.error) {
        console.log(resp.error)
        toast({
          title: "Erro!",
          description: `Não foi possível publicar sua pergunta.${resp.error.message}`,
          variant: "destructive",
        });
      }
      // revalidatePath('/dicas');

      // router.push("/perguntas");
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Não foi possível publicar sua pergunta.",
        variant: "destructive",
      });
    }
  }

  return (
    <ContainerScreen>
      <h1 className="text-2xl font-bold mb-6">Fazer uma Nova Pergunta</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da Pergunta</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título da sua pergunta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SelectThemeForm form={form} />
          <SelectCountryForm form={form} />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva sua pergunta em detalhes..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" className="bg-primaryPalet">
              Publicar Pergunta
            </Button>
          </div>
        </form>
      </Form>
    </ContainerScreen>
  );
} 