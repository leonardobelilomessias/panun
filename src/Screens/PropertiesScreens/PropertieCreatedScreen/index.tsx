'use client'

import { useSearchParams } from "next/navigation"
import { HousesBlock } from "../../../components/modules/Sections/HousesBlock"
import { HeroSearch } from "../../../components/modules/Hero/HeroSearch"
import { HouseResultSearch } from "../../../components/modules/Sections/HouseResultSearch"
import { ContainerSceenClient } from "@/components/modules/Containers/ContainerSceenClient"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export function PropertieCreatedScreen({id}:{id:string}){
    

    return(
<ContainerSceenClient>
        <div className="flex flex-col gap-10">
        <p>Propiedade criada com sucesso</p>
        <p>Agora você pode visualizar a sua propiedade na aba de produtos</p>
        <p>Você pode criar mais produtos ou visualizar os produtos</p>
        <Link href={`/imovel/${id}`} className="flex gap-2 items-center">
        <Button>Ver imovel</Button>
        </Link>
        <Link href={`/properties/${id}`} className="flex gap-2 items-center">
        <Button>Cadastrar novo imovel.</Button>
        </Link>
        </div>
        {/* <HouseResultSearch/> */}
</ContainerSceenClient>
    )
}