import Link from "next/link";
import ImageDefault from '@/public/images/profile/default/avatar-default.jpg'
import Image from "next/image";
export function AgentsCard({name,}:{name:string}){
    return(
    <Link href={'/corretores/coretor-teste'} className="bg-primary-palet bg-opacity-[0.03] w-full p-2 rounded-lg relative"> 
        <div className="flex gap-2  items-center ">
            <div className="bg-primary-palet bg-opacity-40 w-8 h-8 rounded-full relative">
                <Image src={ImageDefault} fill alt="image-avatar" className="absolute rounded-full"/>
            </div>
            <p className="text-sm font-semibold">{name}</p>
        </div>
    </Link>
)
}
