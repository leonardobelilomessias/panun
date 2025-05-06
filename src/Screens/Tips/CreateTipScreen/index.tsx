"use client";
import WorldFlag from 'react-world-flags';
import sanitizeHtml from 'sanitize-html';
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RichTextEditor } from "./RichTextEditor";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabaseClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { insertTip } from './actions/create-tip-action';
import {  useToast } from '@/components/ui/use-toast';
import {  useRouter } from 'next/navigation';
import { SelectCountryForm, SelectThemeForm } from '@/components/modules/Forms/Selects';
import { ContainerScreen } from '@/components/modules/Containers/ContainerSceen';
import { Save, Send } from 'lucide-react';
// Função para extrair texto do HTML
function extractTextFromHTML(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

// Schema de validação Zod
const formSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  theme_id: z.string().min(1, { message: "Você precisa selecionar um tema" }),
  country_id: z.string().min(1, { message: "Você precisa selecionar um pais " }),
  post: z.string().refine(
    (value) => {
      return extractTextFromHTML(value).trim().length >= 5;
    },
    {
      message: "O texto deve ter pelo menos 5 caracteres após o corte",
    }
  ),
});

// Tipagem do tipo de dados do formulário
type FormData = z.infer<typeof formSchema>;

export function CreateTipScreen({ userId }: { userId: string | undefined }) {
  const { toast } = useToast()
  const route = useRouter()
  const [user, setUser] = useState<User | null>()
  async function getuser() {
    const { data } = await supabaseClient().auth.getUser()
    console.log('getuser', data)
    setUser(data.user)

  }
  const form = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: { title: "",post: "",country_id: "", theme_id: "",},
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const sanitizedContent = sanitizeContent(data.post);
    try {
    const resp = await insertTip({
      title: data.title,
      content: sanitizedContent,
      created_by: userId,
      theme_id: data.theme_id,
      country_id: data.country_id,
      status:"approved"
    })
        if(resp.statusText==="Created"){
          console.log('data send tip',resp);
          toast({
            description: "Sua dica foi adicionada com sucesso.",
          })
          route.push(`/dicas/dica-criada/${resp?.data[0]?.id}`)
        }
        if(resp.error){
          console.log(resp.error)
        }
        // revalidatePath('/dicas');
    } catch (error) {
      console.log(error)

    }

    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
  };
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };
  useEffect(() => {
    getuser()
  }, [])
  return (
    <ContainerScreen>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="input" // Adicione suas classes de estilo aqui
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SelectThemeForm form={form} />
          <SelectCountryForm form={form} />
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-4 bg-primary-palet flex gap-1"><Save size={16}/> Criar</Button>
        </form>
      </Form>
    </ContainerScreen>
  );
}







function sanitizeContent(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: [
      'p', 'b', 'i', 'em', 'strong', 'u', 's', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'mark',
      'br', 'img', 'hr', 'code', 'pre', 'span', 'div', 'table', 'thead', 'tbody', 'th', 'tr', 'td', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ],  // Permite todas as tags comuns
    allowedAttributes: {
      '*': ['class', 'style'], // Permite 'class' e 'style' em todas as tags
      'a': ['href', 'class', 'style'], // Especificamente para <a>, também permite 'href'
      'img': ['src', 'alt', 'class', 'style'], // Especificamente para <img>
      // Você pode adicionar mais tags ou atributos específicos conforme necessário
    },
    allowedStyles: {
      '*': {
        'text-align': [/^left$/, /^center$/, /^right$/], // Permite valores 'left', 'center', 'right' para 'text-align'
        'font-size': [/^\d+(px|em|%)$/], // Permite tamanhos de fonte como px, em, %
        'color': [/^#[0-9A-Fa-f]{6}$/, /^rgba?\(\d+, \d+, \d+(, \d+(\.\d+)?)?\)$/], // Permite cores em hexadecimal ou RGB
        // Você pode adicionar outras propriedades de estilo conforme necessário
      },
    },
    allowedIframeHostnames: ['www.youtube.com'], // Permite iframes do YouTube, se necessário
  });
}


