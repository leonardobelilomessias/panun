import Link from "next/link";

export function EmptyBoxContainer({message="Nenhum elemento encontrado"}:{message?:string}){
    return(
        <div className="border  p-6   rounded-sm flex   gap-4">
            {message}
        </div>
)
}