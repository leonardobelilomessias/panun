import { IProfile } from "@/types/TypesDB";
import { supabaseClient } from "@/lib/supabase/client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useStoreUser } from "./store/storeUser";
import { useStoreSelect } from "./store/storeSelects";
import { loadCountriesAndThemes, saveCountriesAndThemes } from "../storage/AsyncStorageSelects";
import { loadUser, saveUser } from "../storage/AsyncStorageUser";

const ContextDefaultInfo = createContext({} as IDataAccont);

interface IDataAccont {
  dataUser: IProfile | null | undefined;
}
type ICountries = {
  name: string;
  code: string;
  id: string;
};

type IThemes = {
  name: string;
  code: string;
  id: string;
};
type IThemeAndCountries = [ICountries[], IThemes[]];

function InfoContext({ children }: { children: ReactNode }) {
  const { userStored, setUserStored } = useStoreUser();
  const { setCountrieThemeStored, countrieThemeStored } = useStoreSelect();
  const refId = useRef(0)
  // console.log('valor rffis', refId)



  // Busca países e temas
  async function  getCountryesSinc (){
    const data = await loadCountriesAndThemes()
    if(data) {
      if(countrieThemeStored[0].length>0 && countrieThemeStored[1].length>1)return 
      setCountrieThemeStored([data.countries as ICountries[],data.themes as IThemes[]])
      ;}
     if(data ===null && refId.current==0){
      refId.current=1
      // console.log('buscando seletcts no supabase',"Tem informação no storage?",!!data)
      const [countriesResponse, themesResponse] = await Promise.all([
        supabaseClient()
          .from('estates')
          .select('*')
          .order('name', { ascending: true }),
        supabaseClient()
          .from('cities')
          .select('*')
          .order('name', { ascending: true }),
          supabaseClient()
          .from('neighborhoods')
          .select('*')
          .order('name', { ascending: true }),
      ]);
      const combinedData = [countriesResponse.data || [], themesResponse.data || []] as IThemeAndCountries
      setCountrieThemeStored([countriesResponse.data as ICountries[],themesResponse.data as IThemes[]]);
      saveCountriesAndThemes(countriesResponse.data as ICountries[] ,themesResponse.data as IThemes[])
     }
  }

  async function  getUserAsync (){
    const data = await loadUser()
    if(data) {
      setUserStored(data)
      ;}
     if(data ===null && refId.current==0){
      refId.current=1
      console.log('buscando user  no supabase',"Tem informação no storage?",!!data)
      const { data: { user } } = await supabaseClient().auth.getUser();
      if (user) {
        // console.log("rodou Query getuser Supabase", !!user);
        const { data, error } = await supabaseClient()
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single();
        setUserStored(data);
        saveUser(data)
      }
      

     }
  }
  useEffect(() => {
    getUserAsync();
    getCountryesSinc();
  }, [ ]);

  return (
    <ContextDefaultInfo.Provider value={{ dataUser: userStored }}>
      {children}
    </ContextDefaultInfo.Provider>
  );
}

export function DefaultInfoProvider({ children }: { children: ReactNode }) {
  return (
    <InfoContext>
      {children}
    </InfoContext>
  );
}

export const useDefaultInfo = () => useContext(ContextDefaultInfo);