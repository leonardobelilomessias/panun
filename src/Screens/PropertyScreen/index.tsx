'use client'
import { Input } from "@/components/ui/input";
import { Bath, Bed, Car, MapPin, Ruler } from "lucide-react"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { ContainerCardsHouse } from "../../components/modules/Containers/ContainerCardsHouse/ContainerCardsHouse";
import { CardHouseSmall } from "../../components/modules/Cards/CardHouseSmall/index.tsx";
import { RelationedHousesBlock } from "../../components/modules/Sections/ReletionedHousesBlock";
import { axiosApi } from "@/lib/axios/axios";
import { PropertySingle } from "@/types/typesPropeties";
import { useEffect, useState } from "react";
import { formatCurrency2 } from "@/lib/utils";
import { AmenitiesCompenet } from "./AmenitiesCompenet";
import { Amenity } from "@/types";
import { CarouselProperty } from "./carousel";
type FormatAmeties ={
    amenities:{
        amenities:{amenities:Amenity}
    }
}
export function PropertyScreen({id}:{id:string}) {
    const [property, setProperty] = useState<PropertySingle | null>(null);
    const [loading, setLoading] = useState(true);
    const amenities = property?.amenities_details.map((amenitie:any)=>{return amenitie.amenities})
    
    useEffect(() => {
        async function fetchProperty() {
            try {
                setLoading(true);
                const response = await axiosApi.get(`/api/getProperty/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error("Erro ao carregar propriedade:", error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchProperty();
    }, [id]);
    
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Carregando informações do imóvel...</div>;
    }
    
    if (!property) {
        return <div className="min-h-screen flex items-center justify-center">Imóvel não encontrado</div>;
    }

    return (
        <div className="min-h-[100vh] flex flex-col gap-8 md:mb-24">
            <CarouselProperty gallery={property.property_images.map((image)=>(image.url))} />
            <div className="container flex flex-col gap-8">
                <HeaderContentPropety 
                full_description={property.details[0].full_description}
                    area={property.details[0].total_area} 
                    bathrooms={property.details[0].bathroom}
                    bedrooms={property.details[0].bedroom}
                    city={property.cities.name}
                    shot_description={property.details[0].shot_description}
                    garage={property.details[0].garage}
                    id={property.id}
                    neighborhood={property.neighborhoods.name}
                    price={String(property.financeiro[0].price)}
                    purpose={property.purpose}
                    street={property.street}
                    title={property.details[0].title}
                    reference_point={property.details[0].reference_point}
                /> 
                <AmenitiesCompenet amenities={property.amenities_details.map((amenitie:any)=>{return amenitie.amenities})} />
                <LocationPropety city={property.cities.name} neighborhood={property.neighborhoods.name}  />
            </div>
            <RelationedHousesBlock />
            <OptionBottonStyckMobile/>
        </div>
    )
}

function OptionBottonStyckMobile() {
    return (
        <div className="sticky bottom-0 md:hidden">
            <div className="flex bg-white border-t-2 p-4 gap-2">
                <Button className="border-primary-palet text-primary-palet flex-1 gap-1" variant={"outline"}>Fazer simulação</Button>
                <Button className="bg-primary-palet flex flex-1"  > <FaWhatsapp size={36} className="mr-2" /> <p>Chamar no whatsapp</p> </Button>
            </div>
        </div>
    )
}

type HeaderPropertyProsp={
    id:string
    title:string,
    shot_description:string
    full_description:string
    price:string,
    bedrooms:number
    bathrooms:number
    area:number,
    garage:number
    city:string,
    neighborhood:string,
    street:string
    purpose:string;
    reference_point:string
}

function HeaderContentPropety({reference_point,title,area,bathrooms,bedrooms,city, shot_description,garage,id,neighborhood,price,purpose,street,full_description}:HeaderPropertyProsp) {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="mt-6 flex flex-col flex-1 gap-8">
                <div>
                    <p className="bg-primary-palet text-white text-xs font-semibold p-1 px-3 rounded-xl max-w-fit text-center">{purpose}</p>
                    <h1 className="text-xl md:text-4xl font-bold mt-2">{`${title}`}</h1>
                    <div className="text-sm font-medium text-gray-500 flex items-center gap-1 flex-wrap mt-1">
                        <MapPin size={16} /> 
                        <p>{street}, {neighborhood}</p> - <p>{city}</p>
                    </div>
                    
                    <div className="flex flex-col mb-4">
                        <p className="text-2xl md:text-4xl text-primary-palet font-bold">
                            {formatCurrency2(price)}
                        </p>
                    </div>
                    <div className="text-sm md:pr-8 mb-8">
                    <p className="text-xl font-semibold mb-2" >Descrição:</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ whiteSpace: "pre-wrap" }}>
                        {shot_description}
                    </p>
                </div>
                    <ElementsPropiety area={area} bathrooms={bathrooms} bedrooms={bedrooms} garage={garage} />
                </div>
        
                <div className="text-sm md:pr-8">
                    <p className="text-xl font-semibold ">Detalhes Sobre o imóvel:</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {full_description}
                    </p>
                </div>
                <div className="text-sm md:pr-8">
                    <p className="text-xl font-semibold mb-2">Ponto de Referencia:</p>
                    <p className="text-gray-700 leading-relaxed">
                        {reference_point}
                    </p>
                </div>
            </div>
            
            <div className="border-2 p-6 rounded-xl border-primary-palet lg:w-[28rem] mt-6 lg:mt-6 lg:ml-6 hidden sm:flex flex-col">
                <p className="text-2xl font-bold">Entre em contato e garanta Agora</p>
                <p className="text-gray-500 mt-2 mb-4">Entre em contato com nossa equipe para te auxiliar na aquisição do seu imóvel</p>
                
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="text-xs font-bold mb-1">Nome</p>
                        <Input placeholder="Nome" />
                    </div>
                    <div>
                        <p className="text-xs font-bold mb-1">Telefone</p>
                        <Input placeholder="Telefone" />
                    </div>
                    <div>
                        <p className="text-xs font-bold mb-1">Email</p>
                        <Input placeholder="Email" />
                    </div>
                    <Button className="bg-primary-palet hover:bg-primary-palet/90 mt-2">Enviar</Button>
                </div>

                <p className="text-center my-3">ou</p>
                <Separator className="mb-3" />
                <Button className="border-primary-palet text-primary-palet hover:bg-primary-palet/10 flex items-center justify-center gap-2" variant={"outline"}>
                    <FaWhatsapp size={20} className="text-primary-palet" />
                    <span>Chamar no whatsapp</span>
                </Button>
            </div>
        </div>
    )
}

function LocationPropety({neighborhood,city}:{neighborhood:string,city:string}) {
    return (
        <div className="flex">
            <div className="mt-6 flex flex-col flex-1 gap-8">
                <div className="text-sm">
                    <p className="text-xl font-semibold mb-3">Localização no mapa:</p>
                    <div className="w-full h-[400px] rounded-lg overflow-hidden">
                        <iframe
                            width="100%"
                            height="100%"
                            loading="lazy"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBnn_SK-u5M9BYGIJQ8TDTssee0vJ_3v08&q=${neighborhood},${city}&zoom=15`}
                            className="border-0">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ElementsPropiety({bathrooms,bedrooms,area,garage}:{bathrooms:number,bedrooms:number, area:number,garage:number}) {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-4 mt-2 max-w-md">
            <div className="flex flex-col items-center">
                <Bed size={36} className="text-primary-palet" />
                <p className="text-gray-700 font-bold text-sm mt-1">{bedrooms} Quartos</p>
            </div>
            <div className="flex flex-col items-center">
                <Bath size={36} className="text-primary-palet" />
                <p className="text-gray-700 font-bold text-sm mt-1">{bathrooms} Banheiros</p>
            </div>
            <div className="flex flex-col items-center">
                <Car size={36} className="text-primary-palet" />
                <p className="text-gray-700 font-bold text-sm mt-1">{garage} Vagas</p>
            </div>
            <div className="flex flex-col items-center">
                <Ruler size={36} className="text-primary-palet" />
                <p className="text-gray-700 font-bold text-sm mt-1">{area}m²</p>
            </div>
        </div>
    )
}