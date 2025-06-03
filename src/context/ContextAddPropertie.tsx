
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";


const ContextAddPropertie = createContext({} as IDataAccont);

interface IDataAccont {
  cover:File|null
  setCover:(file:File|null)=>void
  files:File[]
  setFiles:(file:File[])=>void
}



function InfoContext({ children }: { children: ReactNode }) {

  const [cover, setCover] = useState<File|null>(null)
  const [files, setFiles] = useState<File[]>([])

  return (
    <ContextAddPropertie.Provider value={{ cover, setCover, files, setFiles }}>
      {children}
    </ContextAddPropertie.Provider>
  );
}

export function AddPropertieProvier({ children }: { children: ReactNode }) {
  return (
    <InfoContext>
      {children}
    </InfoContext>
  );
}

export const usePropertieContext = () => useContext(ContextAddPropertie);