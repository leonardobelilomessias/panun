import Link from "next/link";
import { ReactNode } from "react";

export function ContainerLastProperties({title,children}:{title:string, children:ReactNode}){
    return(
<div className="border  p-6 min-w-80  rounded-xl flex   flex-col  gap-4 h-[27rem]">
            <h2 className="text-2xl font-bold">{title}</h2>
                {children}
            <Link href={'/lista-venda'} className="">
            <button className="bg-primaryPalet text-white font-semibold p-2 px-6 rounded flex">ver todos</button>
            </Link>
        </div>
    )
}
