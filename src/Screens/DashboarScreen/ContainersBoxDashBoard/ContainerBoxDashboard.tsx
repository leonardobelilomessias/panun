import { clientsData } from "@/common/mocks/datamocks";
import { ReactQueryClientProviders } from "@/providers/ReactQueryClientProviders";
import Link from "next/link";
import { ReactNode } from "react";

export function ContainerBoxDashboard({children, title, linkUrl}:{title:string,linkUrl:string,children:ReactNode}){
    return(

        <div className="border  p-6 min-w-80 h-[27rem]  rounded-xl flex flex-col flex-1 gap-4">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="flex flex-col gap-2 flex-wrap flex-1 items-center ">
        <ReactQueryClientProviders>
            {children}
        </ReactQueryClientProviders>
        </div>
        <Link href={linkUrl} className="flex justify-self-end">
            <button className="bg-primaryPalet text-white font-semibold p-2 px-6 rounded flex">ver todos</button>
        </Link>
    </div>
)
}