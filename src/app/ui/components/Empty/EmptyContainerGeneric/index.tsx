import { LucideProps, SearchX } from "lucide-react"
import Link from "next/link"
import React from "react"

type EmptyContainerProps={
    title:string,
    description:string
    iconLucid:React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}
export function EmptyContainerGeneric({description="Tente mudar ou limpar os filtros.",iconLucid=SearchX,title="Nenhum resultado encontrado",textLink,linkText}:{
    title?:string,
    description?:string
    iconLucid?:React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    linkText?:string
    textLink?:string
}){
    return(
        <div className=" my-4">
            <div className=" flex flex-col gap-2 items-center justify-center bg-blue-50 text-primaryPalet text-center min-h-52">
                {React.createElement(iconLucid, { size: 38, className: "text-primaryPalet" })}
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-gray-500">{description} {linkText&&<Link href={linkText||''} className="text-blue-600 underline">{textLink}</Link>}</p>
            </div>
        </div>
    )
}