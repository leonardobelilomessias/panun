'use client'
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useSearchParams, useRouter} from "next/navigation";
import React, { useEffect, useState } from "react";
import WorldFlag from 'react-world-flags';
import { useSelectStoreContryTips, useSelectStoreThemeTips } from "./stores/selectStore";
import { useStoreSelect } from "@/context/store/storeSelects";


function SelectGroupTipsMemo() {
  const { selectedValueThemeTips, setSelectedValueThemeTips } = useSelectStoreThemeTips();
  const {selectedValueCountryTips, setSelectedValueCountryTips} = useSelectStoreContryTips()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
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
    console.log(`${pathname}?${params.toString()}`)
  }
  function cleanFilters(){
    setSelectedValueCountryTips('')
    setSelectedValueThemeTips('')
    handleSearch({country:"",theme:""})
  }
  useEffect(()=>{
    console.log('rodou group select')
    handleSearch({theme:selectedValueThemeTips,country:selectedValueCountryTips})
  },[selectedValueCountryTips,selectedValueThemeTips])
  useEffect(()=>{
    // handleSearch({theme:selectedValueTheme,country:selectedValueCountry})
    return ()=> {setSelectedValueThemeTips('') 
      setSelectedValueCountryTips('')}
  },[])
    return (
        <div className=" py-2">
            <div className="flex items-center"><SlidersHorizontal size={14} /> <p className="text-sm">Filtros</p></div>
            <div className="flex gap-2 align-bottom items-end  flex-wrap mt-1">
                <SelectTheme title="Tema"/>
                <SelectCountry title="Pais" />
                <Button onClick={()=>cleanFilters()}  size={'sm'} className="  text-sm border-primary-palet bg-white border flex gap-1 hover:bg-blue-700 hover:text-blue-50 hover:border-white text-primary-palet "><X size={16}/><p>Limpar filtros</p> </Button>
              
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
  const { selectedValueCountryTips, setSelectedValueCountryTips } = useSelectStoreContryTips();
    const {countrieThemeStored} = useStoreSelect()
    useEffect(() => {
    }, [])
    const handleChange = (e:string) => {
      setSelectedValueCountryTips(e); // Atualiza o estado global
    }
    return (
      <Select  value={selectedValueCountryTips}  onValueChange={(e)=>handleChange(e)}>
      
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
    const { selectedValueThemeTips, setSelectedValueThemeTips} = useSelectStoreThemeTips();
    const {countrieThemeStored} = useStoreSelect()

      useEffect(() => {
    
      }, [])
      const handleChange = (e:string) => {
        setSelectedValueThemeTips(e); // Atualiza o estado global
      }
    return (
      <Select value={selectedValueThemeTips} onValueChange={(e)=> handleChange(e)}>
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


export const SelectGroupTips =  React.memo(SelectGroupTipsMemo)