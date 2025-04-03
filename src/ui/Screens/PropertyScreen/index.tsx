'use client'
import { Input } from "@/components/ui/input";
import { CarouselProperty } from "./carousel";
import { Bath, Bed, Car, MapPin, Ruler } from "lucide-react"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { ContainerCardsHouse } from "../../components/Containers/ContainerCardsHouse/ContainerCardsHouse";
import { CardHouseSmall } from "../../components/Cards/CardHouseSmall/index.tsx";
import { RelationedHousesBlock } from "../../components/Sections/ReletionedHousesBlock";
import { axiosApi } from "@/lib/axios/axios";

export async function PropertyScreen({id}:{id:string}) {
    const {data} = await  axiosApi.get(`/api/getProperty/${id}`) 
    console.log(data.displayInfo.purpose)

    return (
        <div className="min-h-[100vh] flex flex-col gap-8 md:mb-24">
            <CarouselProperty gallery={data.displayInfo.gallery} />
            <div className="container flex flex-col gap-8">
                <HeaderContentPropety area={data.displayInfo.totalArea} 
                bathrooms={data.displayInfo.bathrooms}
                bedrooms={data.displayInfo.bedrooms}
                city={data.location.city}
                description={data.displayInfo.description}
                garage={data.displayInfo.garageSpaces}
                id={data.id}
                neighborhood={data.location.neighborhood}
                price={data.financial.salePrice}
                purpose={data.displayInfo.purpose}
                street={data.location.street}
                title={data.displayInfo.title}

                /> 
                <LocationPropety />
            </div>
            <RelationedHousesBlock/>
            <OptionBottonStyckMobile/>
        </div>
    )
}

function OptionBottonStyckMobile() {
    return (
        <div className=" sticky bottom-0 bg-red-400 md:hidden">
            <div className="flex bg-white border-t-2 p-4 gap-2">
                <Button className=" border-primaryPalet text-primaryPalet flex-1 gap-1" variant={"outline"}>Fazer simulação</Button>
                <Button className="bg-primaryPalet flex flex-1"  > <FaWhatsapp size={24} className="text-white" /> <p>Chamar no whatsapp</p> </Button>
            </div>
        </div>
    )
}

type HeaderPropertyProsp={
    id:string
    title:string,
    description:string
    price:string,
    bedrooms:number
    bathrooms:number
    area:number,
    garage:number
    city:string,
    neighborhood:string,
    street:string
    purpose:String

}
function HeaderContentPropety({title,area,bathrooms,bedrooms,city, description,garage,id,neighborhood,price,purpose,street}:HeaderPropertyProsp) {
    return (
        <div className="flex ">
            <div className=" mt-6 flex flex-col flex-1 gap-8">
                <div>

                    <p className="bg-primaryPalet text-white text-xs font-semibold p-1 rounded-xl max-w-16 text-center">{purpose}</p>
                    <p className=" text-xl md:text-2xl font-bold">{title}</p>
                    <div className="text-sm font-medium text-gray-500 flex items-center gap-1 flex-wrap"><MapPin size={16} /> <p>{street} , {neighborhood}</p> - <p>{city}</p></div>
                    <div className="flex flex-col my-2 ">
                        <p className=" text-2xl md:text-4xl text-primaryPalet font-bold">R$ {price}</p>
                    </div>
                    <ElementsPropiety area={area} bathrooms={bathrooms} bedrooms={bedrooms} garage={garage}  />
                </div>
                <div className="text-sm  md:pr-8 ">
                    <p className="text-xl font-semibold">Descrição:</p>
                    <p>
                        {description}
                    </p>

                </div>
            </div>
            <div className=" border-2 p-6 rounded-xl border-primaryPalet flex-2  w-[28rem] max-h-[28rem] hidden sm:flex flex-col ml-2">
                <p className="text-2xl font-bold"> Entre em contato e garanta Agora</p>
                <p className="text-gray-500">Entre em contato com nossa equipe para te auxiliar na aquisição do seu imovel</p>
                <div className="flex flex-col gap-2 p-2">
                    <div>
                        <p className="text-xs font-bold">Nome</p>
                        <Input placeholder="Nome" />
                    </div>
                    <div>
                        <p className="text-xs font-bold">Telefone</p>

                        <Input placeholder="Telefone" />
                    </div>
                    <div>
                        <p className="text-xs font-bold">Email</p>

                        <Input placeholder="Email" />
                    </div>
                    <Button className="bg-primaryPalet">Enviar</Button>
                </div>

                <p className="text-center" >ou</p>
                <Separator className="my-2" />
                <Button className=" border-primaryPalet text-primaryPalet flex gap-1" variant={"outline"} > <FaWhatsapp size={24} className="text-primaryPalet" /> <p>Chamar no whatsapp</p> </Button>

            </div>

        </div>
    )
}

function LocationPropety() {
    return (
        <div className="flex ">
            <div className=" mt-6 flex flex-col flex-1 gap-8">
                <div className="text-sm  ">
                    <p className="text-xl font-semibold">Localização no mapa:</p>
                    <div style={{ height: '400px', width: '100%' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            loading="lazy"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBnn_SK-u5M9BYGIJQ8TDTssee0vJ_3v08&q=SÃO+GABRIEL,BH&zoom=15">
                        </iframe>
                    </div>
                </div>
            </div>


        </div>
    )
}

function ElementsPropiety({bathrooms,bedrooms,area,garage}:{bathrooms:number,bedrooms:number, area:number,garage:number}) {
    return (
        <div className='flex  mt-auto gap-10'>  {/* Adicionei mt-auto */}
            <div className='flex flex-col items-center'>
                <Bed size={24} className='text-primaryPalet' />
                <p className='text-gray-500 font-bold text-sm'>{bedrooms}</p>
            </div>
            <div className='flex flex-col items-center'>
                <Bath size={24} className='text-primaryPalet' />
                <p className='text-gray-500 font-bold text-sm'>{bathrooms}</p>
            </div>
            <div className='flex flex-col items-center'>
                <Car size={24} className='text-primaryPalet' />
                <p className='text-gray-500 font-bold text-sm'>{garage}</p>

            </div>
            <div className='flex flex-col items-center'>
                <Ruler size={24} className='text-primaryPalet' />
                <p className='text-gray-500 font-bold text-sm'>{area}M²</p>

            </div>


        </div>
    )
}

