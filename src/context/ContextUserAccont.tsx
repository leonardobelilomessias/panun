import { IProfile } from "@/types/TypesDB";
import { supabaseClient } from "@/lib/supabase/client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useStoreUser } from "./store/storeUser";
import { useStoreSelect } from "./store/storeSelects";
import { loadCountriesAndThemes, saveCountriesAndThemes } from "../storage/AsyncStorageSelects";
import { loadUser, saveUser } from "../storage/AsyncStorageUser";

const ContextUserAccont = createContext({} as IDataAccont);

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

function AccountCountext({ children }: { children: ReactNode }) {
  const { userStored, setUserStored } = useStoreUser();
  const { setCountrieThemeStored, countrieThemeStored } = useStoreSelect();
  const refId = useRef(0)
  // console.log('valor rffis', refId)
  const memonumber = useMemo(()=>[],[])


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
          .from('countries')
          .select('*')
          .order('name', { ascending: true }),
        supabaseClient()
          .from('themes')
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
    <ContextUserAccont.Provider value={{ dataUser: userStored }}>
      {children}
    </ContextUserAccont.Provider>
  );
}

export function AccontProvider({ children }: { children: ReactNode }) {
  return (
    <AccountCountext>
      {children}
    </AccountCountext>
  );
}

export const useUserData = () => useContext(ContextUserAccont);