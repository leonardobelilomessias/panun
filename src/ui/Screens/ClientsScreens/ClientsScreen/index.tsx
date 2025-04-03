'use client'
import { GenericPagination } from "@/ui/components/Pagination/GenericPagination"
import { PlusSquare } from "lucide-react"
import Link from "next/link"

export function ClientsScreen(){
    return(
        <div>
            <h1 className="text-2xl font-bold"></h1>
            <ClientsContainer/>
        </div>
    )
}

function ClientCard(){
    return(
    <Link href={'/clientes/clienteteste'} className="bg-primaryPalet bg-opacity-[0.03] w-full p-2 rounded-lg relative"> 
        <div>
            <p className="text-sm font-semibold">Nome do cliente</p>
        </div>
        <div className="flex gap-2 text-xs">
            <div className="flex ">
                <p className="font-semibold">Imovel:</p>
                <p>Nome do imovel</p>
            </div>
            <div className="flex">
                <p className="font-semibold">Corretor:</p>
                <p>Come do corretor</p>
            </div>
        </div>
        <div className="absolute border top-2 right-4 rounded flex items-center justify-center place-items-center border-primaryPalet px-4 p-0 ">
            <p className="text-sm text-primaryPalet font-medium">status</p>
        </div>
        
    </Link>
)
}

function ClientsContainer(){
    return(
        <div className="border  p-6 min-w-80  rounded-xl flex flex-col flex-1 gap-4">
            <div className="flex gap-40">
                <h1 className="font-bold text-2xl">Todos Clientes</h1>
                <Link href={'/clientes/novo-cliente'} className="flex bg-primaryPalet p-2 rounded text-white font-medium text-sm h-8 items-center justify-center"><PlusSquare size={16}/> Novo Cliente</Link>
            </div>
        <div className="flex flex-col gap-2">
            <ClientCard/>
            <ClientCard/>
            <ClientCard/>
            <ClientCard/>
            <ClientCard/>
            <ClientCard/>
            <ClientCard/>
            <ClientCard/>
            <ClientCard/>

        </div>
        <GenericPagination currentPage={1} onPageChange={()=>{}} totalPages={8} key={1}/>
    </div>
)
}