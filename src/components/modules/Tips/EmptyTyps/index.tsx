import { SearchX } from "lucide-react"
import Link from "next/link"

export function EmptyTips(){
    return(
        <div className=" my-4">
            <div className=" flex flex-col gap-2 items-center justify-center bg-blue-50 text-primaryPalet text-center min-h-52">
                <SearchX size={38} className="text-primaryPalet"/>
                <p className="font-semibold">Nenhuma dica encontrada</p>
                <p className="text-sm text-gray-500">Tente mudar ou limpar os filtros, ou você pode <Link href={'/criar-dica'} className="text-blue-600 underline">criar nova dica</Link></p>
            </div>
        </div>
    )
}