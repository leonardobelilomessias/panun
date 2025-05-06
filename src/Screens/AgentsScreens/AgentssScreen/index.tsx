'use client'
import { GenericPagination } from "@/components/modules/Pagination/GenericPagination"
import { PlusSquare } from "lucide-react"
import Link from "next/link"

export function AgentsScreen(){
    return(
        <div>
            <h1 className="text-2xl font-bold"></h1>
            <AgentsContainer/>
        </div>
    )
}


function AgentsContainer(){
    return(
    <div className="border  p-6 min-w-80  rounded-xl flex flex-col flex-1 gap-4 relative">
            <div className="flex gap-40">
                <h1 className="font-bold text-2xl">Todos Corretores</h1>
                <Link href={'/corretores/novo-corretor'} className="flex bg-primary-palet p-2 rounded text-white font-medium text-sm h-8 items-center justify-center"><PlusSquare size={16}/> Novo Corretor</Link>
            </div>
        <div className="flex flex-col gap-2">
            <AgentsCard/>
            <AgentsCard/>
            <AgentsCard/>
            <AgentsCard/>

        </div>
        <Link href={'/corretores'} className="flex">
            <button className="bg-primary-palet text-white font-semibold p-2 px-6 rounded flex">ver todos</button>
        </Link>

    </div>
)
}

function AgentsCard(){
    return(
    <Link href={'/corretores/coretor-teste'} className="bg-primary-palet bg-opacity-[0.03] w-full p-2 rounded-lg relative"> 
        <div className="flex gap-2  items-center ">
            <div className="bg-primary-palet bg-opacity-40 w-8 h-8 rounded-full"></div>
            <p className="text-sm font-semibold">Nome do corretor</p>
        </div>
        
    </Link>
)
}