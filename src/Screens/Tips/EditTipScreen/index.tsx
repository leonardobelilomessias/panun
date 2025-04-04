"use client";
import WorldFlag from 'react-world-flags';
import sanitizeHtml from 'sanitize-html';



import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
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
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast, useToast } from '@/components/ui/use-toast';
import { redirect, useRouter } from 'next/navigation';
import { updateTip } from './actions/edit-tip-action';
import { ITip, Tip } from '@/types/TypesDB';
import { ContainerScreen } from '@/components/modules/Containers/ContainerSceen';
import { Save } from 'lucide-react';
// Função para extrair texto do HTML
function extractTextFromHTML(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

// Schema de validação Zod
const formSchema = z.object({
  id: z.string(),
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

export function EditTipScreen({ userId, tip }: { userId: string | undefined , tip:ITip}) {
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
    defaultValues: {
      id: tip.id,
      title: tip.title,
      post: tip.content,
      country_id: tip?.country_id || undefined,
      theme_id: tip.theme_id|| undefined,
    },

  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    const sanitizedContent = sanitizeContent(data.post);
    try {
    const resp = await updateTip(          {
      id: data.id,
      title: data.title,
      content: sanitizedContent,
      created_by: userId,
      theme_id: data.theme_id,
      country_id: data.country_id,
      status:"approved"
    })
        if(resp.statusText==="updated"){
          
          console.log('data send tip',resp);
          toast({
            title: "Dica atualizada",
            description: "Sua dica foi adicionada com sucesso.",
          })
          // route.push('/dicas/dica-criada')
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
          <SelectTheme form={form} />
          <SelectCountry form={form} />
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
            <Button className="mt-4 bg-primaryPalet flex gap-1"><Save size={16}/> Criar</Button>
        </form>
      </Form>
    </ContainerScreen>
  );
}


type countries = {
  name: string
  code: string
  id: string
}

export function SelectCountry({ form }: { form: UseFormReturn<{
  id: string;
  title: string;
  theme_id: string;
  country_id: string;
  post: string;
}, any, undefined> }) {
  const [countries, setcountries] = useState([] as countries[])
  async function getCountries() {
    const { data, error } = await supabaseClient()
      .from('countries',)
      .select('*') // Ou especifique as colunas: .select('id, name')
      .order('name', { ascending: true }) // Ordena pelo nome
    // .limit(20); // Retorna apenas 20 resultados
    console.log(data)
    if (error) {
      console.error('Erro ao buscar países:', error);
      return [];
    }
    setcountries(data)
    return data;
  }
  useEffect(() => {
    getCountries()
  }, [])
  return (
    <>
      <div className='flex'>

      </div>
      <FormField
        control={form.control}
        name="country_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Selecione o pais</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl >
                <SelectTrigger>
                  <SelectValue placeholder="Seleciono e pais relacionado a dica " />
                </SelectTrigger>
              </FormControl>
              <SelectContent >
                {countries.map((country, key) => (
                  <SelectItem className='flex flex-row ' style={{ display: "flex" }} key={country.id} value={country.id as string}>
                    <div className='flex align-middle justify-center items-center'>
                      <WorldFlag style={{ marginRight: '8px', width: '20px', height: '17px', display: 'flex', }} code={country.code} />
                      <p className=''>{country.name}</p>
                    </div>
                  </SelectItem>))}

              </SelectContent>
            </Select>
            <FormDescription>
              {/* You can manage email addresses in your{" "} */}
            
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}


export function SelectTheme({ form }: { form:  UseFormReturn<{
  id: string;
  title: string;
  theme_id: string;
  country_id: string;
  post: string;
}, any, undefined> }) {
  const [themes, setThemes] = useState([] as countries[])
  async function getThemes() {
    const { data, error } = await supabaseClient()
      .from('themes')
      .select('*') // Ou especifique as colunas: .select('id, name')
      .order('name', { ascending: true }) // Ordena pelo nome
    // .limit(20); // Retorna apenas 20 resultados
    if (error) {
      console.error('Erro ao buscar países:', error);
      return [];
    }
    setThemes(data)
    return data;
  }
  useEffect(() => {
    getThemes()
  }, [])
  return (
    <>
      <div className='flex'>

      </div>
      <FormField
        control={form.control}
        name="theme_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Selecione o Tema</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value} >
              <FormControl >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o Tema da sua dica " />
                </SelectTrigger>
              </FormControl>
              <SelectContent >
                {themes.map((theme, key) => (
                  <SelectItem className='flex flex-row ' style={{ display: "flex" }} key={theme.id} value={theme.id.trim() as string}>
                    <div className='flex align-middle justify-center items-center'>
                      <p className=''>{theme.name}</p>
                    </div>
                  </SelectItem>))}

              </SelectContent>
            </Select>
            <FormDescription>
              {/* You can manage email addresses in your{" "} */}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
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


