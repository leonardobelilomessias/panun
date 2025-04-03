'use client'
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabaseClient } from "@/lib/supabase/client";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useSearchParams, useRouter} from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import WorldFlag from 'react-world-flags';
import { useSelectStoreContryQuestions, useSelectStoreThemeQuestions } from "./stores/selectStore";
import { useTheme } from "next-themes";
import { useStoreSelect } from "@/context/store/storeSelects";


 function SelectGroupQuestionsMemo() {
  const { selectedValueThemeQuestions, setSelectedValueThemeQuestions } = useSelectStoreThemeQuestions();
  const {selectedValueCountryQuestions, setSelectedValueCountryQuestions} = useSelectStoreContryQuestions()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const refTheme = useRef()
  function handleSearch({theme,country}:{theme: string, country:string}) {
    const params = new URLSearchParams(searchParams);
    if (theme) {
      params.set('theme', theme)
    } else {
      params.delete('theme');
    }
    if (country) {
      params.set('country', country)
    } else {
      params.delete('country');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  function cleanFilters(){
    setSelectedValueCountryQuestions('')
    setSelectedValueThemeQuestions('')
    handleSearch({country:"",theme:""})
  }
  useEffect(()=>{
    console.log('rodou group select')
    handleSearch({theme:selectedValueThemeQuestions,country:selectedValueCountryQuestions})
  },[selectedValueCountryQuestions,selectedValueThemeQuestions])
  useEffect(()=>{
    // handleSearch({theme:selectedValueTheme,country:selectedValueCountry})
    return ()=> {setSelectedValueThemeQuestions('') 
      setSelectedValueCountryQuestions('')}
  },[])
    return (
        <div className=" px-0 py-2">
            <div className="flex items-center"><SlidersHorizontal size={14} /> <p className="text-sm">Filtros</p></div>
            <div className="flex gap-2 align-bottom items-end  flex-wrap mt-1">
                <SelectTheme  title="Tema"/>
                <SelectCountry title="Pais" />
                <Button onClick={()=>cleanFilters()}  size={'default'} className="  text-sm border-primaryPalet bg-white border flex gap-1 hover:bg-blue-700 hover:text-blue-50 hover:border-white text-primaryPalet "><X size={16}/><p>Limpar filtros</p> </Button>
            </div>
        </div>
    );
};

type countries = {
    name: string
    code: string
    id: string
  }
  
  


 function SelectCountry({title}:{title:string}) {
  const { selectedValueCountryQuestions, setSelectedValueCountryQuestions } = useSelectStoreContryQuestions();
    const {countrieThemeStored} = useStoreSelect()
    useEffect(() => {
    }, [])
    const handleChange = (e:string) => {
      setSelectedValueCountryQuestions(e); // Atualiza o estado global
    }
    return (
      <Select  value={selectedValueCountryQuestions}  onValueChange={(e)=>handleChange(e)}>
      
        <SelectTrigger className="w-[180px]"  >
          <SelectValue placeholder={`Filtrar por ${title}`} />
        </SelectTrigger>
        <SelectContent    >
        {countrieThemeStored[0]?.map((country, key) => (
                  <SelectItem  className='flex flex-row  cursor-pointer hover:bg-blue-50' style={{ display: "flex" }} key={country.id} value={country.name as string}>
                    <div className='flex align-middle justify-center items-center'>
                      <WorldFlag style={{ marginRight: '8px', width: '20px', height: '17px', display: 'flex', }} code={country.code} />
                      <p className='text-ellipsis truncate '>{country.name}</p>
                    </div>
                  </SelectItem>))}
        </SelectContent>
      </Select>
    )
  }

  
   function SelectTheme({title}:{title:string}) {
    const { selectedValueThemeQuestions, setSelectedValueThemeQuestions} = useSelectStoreThemeQuestions();
    const {countrieThemeStored} = useStoreSelect()

      useEffect(() => {
    
      }, [])
      const handleChange = (e:string) => {
        setSelectedValueThemeQuestions(e); // Atualiza o estado global
      }
    return (
      <Select value={selectedValueThemeQuestions} onValueChange={(e)=> handleChange(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Filtrar por ${title}`} />
        </SelectTrigger>
        <SelectContent>
        {countrieThemeStored[1]?.map((theme, key) => (
                  <SelectItem key={theme.id} className='flex flex-row  cursor-pointer hover:bg-blue-50' style={{ display: "flex" }} value={theme.name as string}>
                    <div className='flex align-middle justify-center items-center'>
                      <p className='truncate text-ellipsis'>{theme.name}</p>
                    </div>
                  </SelectItem>))}
        </SelectContent>
      </Select>
    )
  }


export const SelectGroupQuestions =  React.memo(SelectGroupQuestionsMemo)