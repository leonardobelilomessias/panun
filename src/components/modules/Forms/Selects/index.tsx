"use client";
import WorldFlag from 'react-world-flags';
import sanitizeHtml from 'sanitize-html';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabaseClient } from '@/lib/supabase/client';

type countries = {
    name: string
    code: string
    id: string
  }
export function SelectCountryForm({ form }: { form: any }) {
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


export function SelectThemeForm({ form }: { form: any }) {
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
            <Select onValueChange={field.onChange} >
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
