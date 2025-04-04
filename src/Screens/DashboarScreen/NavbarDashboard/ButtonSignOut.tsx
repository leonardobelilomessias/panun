'use client'
import { Button } from "@/components/ui/button";
import axios from "axios";
import { PowerIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function ButtonSignOut(){
    const router = useRouter()
    async function signOut(){
        await axios.delete('/api/logout')
        router.push('/entrar')
      }
      
    return(
        <Button size={'sm'} variant={'ghost'} onClick={()=>signOut()} className="flex  gap-1 hover:bg-blue-600 hover:text-white ">
        <PowerIcon size={16} className="" />
        <div className="hidden md:block text-sm">Sair</div>
      </Button>
    )
}
