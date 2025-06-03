import { supabaseClient } from "@/lib/supabase/client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { storeAgentLogged } from "./store/storeAgentLogged";
import { loadAgentLogged, saveAgentLogged } from "@/storage/AsyncStorageAgentLogged";
import { Agent } from "@/types";

const ContextUserAccont = createContext({} as IDataAccont);

interface IDataAccont {
  dataUser: Agent | null | undefined;
}




function AccountCountext({ children }: { children: ReactNode }) {
  const { agentLogged,setgentLogged } = storeAgentLogged();
  const refId = useRef(0)
  // console.log('valor rffis', refId)
  const memonumber = useMemo(()=>[],[])


  // Busca países e temas


  async function  getUserAsync (){
    const data = await loadAgentLogged()
    if(data) {
      setgentLogged(data)
      ;}
     if(data ===null && refId.current==0){
      refId.current=1
      console.log('buscando user  no supabase',"Tem informação no storage?",!!data)
      const { data: { user } } = await supabaseClient().auth.getUser();
      if (user) {
         console.log("rodou Query getuser Supabase", !!user);
        const { data, error } = await supabaseClient()
          .from('agents')
          .select('*,  avatars_agents(url_image,path)')
          .eq('user_id', user?.id)
          .single();
          setgentLogged(data);
          saveAgentLogged(data)
      }
      

     }
  }
  useEffect(() => {
    getUserAsync();
  }, [ ]);

  return (
    <ContextUserAccont.Provider value={{ dataUser: agentLogged }}>
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