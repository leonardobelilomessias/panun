import React from 'react';
import { ContainerCardsHouse } from '../Containers/ContainerCardsHouse/ContainerCardsHouse';
import { CardHouse } from '../Cards/CardHouse';
import imagescrol from '@/app/public/images/Home/scroll.gif'
import Image from 'next/image';
import { propertiesData } from '@/app/common/mocks/datamocks';
export function HousesBlock({properties}:{properties:typeof propertiesData}) {
    return (
        <div className='bg-gray-100 flex flex-col py-8 '>

            <ContainerCardsHouse>
                <div className='mb-4'>

                <h1 className='text-2xl font-extrabold'>Produtos em Destaque</h1>
                <p className='text-lg text-gray-600'>Coletania dos melhores produtos do portifolio.</p>
                </div>
                <div className=" pl-60 sm:pl-0 flex gap-4 md:gap-8 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory w-full hide-scrollbar md:flex-wrap items-center justify-center">
                    {
                        properties.map((property)=>(
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
                <div>
                    <div className='md:hidden'>
                        <Image src={imagescrol} alt="scrool secitosn" width={50} height={50} />
                    </div>
                </div>
            </ContainerCardsHouse>
        </div>
    );
}

