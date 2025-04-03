'use client'
import { Separator } from "@/components/ui/separator";
import { ContainerCardsHouse } from "../../components/Containers/ContainerCardsHouse/ContainerCardsHouse";
import { ContainerScreen } from "../../components/Containers/ContainerSceen";
import { HousesBlock } from "../../components/Sections/HousesBlock";
import { CardHouse } from "../../components/Cards/CardHouse";
import { GenericPagination } from "../../components/Pagination/GenericPagination";
import { propertiesSalesData } from "@/common/mocks/datamockPropertiesSales";

export function SalePropertiesScreen({propertiesData}:{propertiesData:any}){
    return(
        <div >
        <ContainerCardsHouse>
            <h1 className="text-5xl font-extrabold">Imoveis a venda</h1>
            <p className="text-gray-500 font-medium">Nossa lista de ultimos imoveis a venda</p>
            <Separator/>
        <div className=" flex flex-wrap gap-4">

                                        {
                                            propertiesSalesData.map((property:any)=>(
                                            <CardHouse area={property.displayInfo.totalArea} 
                                            id={property.id}
                                            bathrooms={property.displayInfo.bathrooms}
                                             bedrooms={property.displayInfo.bedrooms} 
                                             city={property.location.city} description={property.displayInfo.description}
                                            neighborhood={property.location.neighborhood}
                                            garage={property.displayInfo.garageSpaces} 
                                            price={property.financial.salePrice} 
                                            title={property.displayInfo.title}
                                            propurse={property.displayInfo.purpose}
                                            key={property.id} />))
                                        }
        </div>
        <GenericPagination currentPage={4} onPageChange={()=>null} totalPages={6}/>


            
        </ContainerCardsHouse>
        </div>
    )
}