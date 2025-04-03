import React from 'react';
import { ContainerCardsHouse } from '../Containers/ContainerCardsHouse/ContainerCardsHouse';
import { CardHouse } from '../Cards/CardHouse';
import imagescrol from '@/app/public/images/Home/scroll.gif'
import Image from 'next/image';
import { HouseSearchFilter } from '../HouseSearchFilter';
export function HouseResultSearch() {
    return (
        <div className='bg-gray-100 flex flex-col py-8 '>

            <ContainerCardsHouse>
                <div className='mb-4'>

                <h1 className='text-xl font-extrabold'>Resultados da pesquisa</h1>
                <p className='text-xs text-gray-600'>Resultado dos da pesquisa de acordo com suas preferencias.</p>
                <HouseSearchFilter/>
                </div>
                <div className="  sm:pl-0 flex gap-4 md:gap-8  pb-4 w-full  flex-wrap items-center justify-center">

                    <CardHouse />
                    <CardHouse />
                    <CardHouse />
                    <CardHouse />
                    <CardHouse />
                    <CardHouse />
                    <CardHouse />
                    <CardHouse />
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

