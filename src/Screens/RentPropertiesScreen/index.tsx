'use client'
import { Separator } from "@/components/ui/separator";
import { ContainerCardsHouse } from "../../components/modules/Containers/ContainerCardsHouse/ContainerCardsHouse";
import { ContainerScreen } from "../../components/modules/Containers/ContainerSceen";
import { HousesBlock } from "../../components/modules/Sections/HousesBlock";
import { CardHouse } from "../../components/modules/Cards/CardHouse";
import { GenericPagination } from "../../components/modules/Pagination/GenericPagination";

export function RentPropertiesScreen(){
    return(
        <ContainerCardsHouse>
            <h1 className="text-5xl font-extrabold">Aluguel</h1>
            <p className="text-gray-500 font-medium">Nossa lista de ultimos imoveispara locação</p>
            <Separator/>
        <div className=" flex flex-wrap gap-4">

        </div>
        <GenericPagination currentPage={4} onPageChange={()=>null} totalPages={6}/>


            
        </ContainerCardsHouse>
    )
}