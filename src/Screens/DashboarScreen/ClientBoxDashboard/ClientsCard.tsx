import Link from "next/link";

export function ClientCard({name,agent, property}:{name:string,agent:string,property:string}){
    return(
    <Link href={'/clientes/clienteteste'} className="bg-primary-palet bg-opacity-[0.03] w-full p-2 rounded-lg relative"> 
        <div>
            <p className="text-sm font-semibold">{name}</p>
        </div>
        <div className="flex gap-2 text-xs">
            <div className="flex ">
                <p className="font-semibold">Imovel:</p>
                <p>{property}</p>
            </div>
            <div className="flex">
                <p className="font-semibold">Corretor:</p>
                <p>{agent}</p>
            </div>
        </div>
        <div className="absolute border top-2 right-4 rounded flex items-center justify-center place-items-center border-primary-palet px-4 p-0 ">
            <p className="text-sm text-primary-palet font-medium">status</p>
        </div>
        
    </Link>
)
}
