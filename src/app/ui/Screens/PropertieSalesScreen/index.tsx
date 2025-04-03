
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Plus, Sparkles } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContainerScreen } from '@/app/ui/components/Containers/ContainerSceen';
import { ContainerCardsHouse } from '../../components/Containers/ContainerCardsHouse/ContainerCardsHouse';
import { CardHouse } from '../../components/Cards/CardHouse';

export async function PropertiesSalesScreens({properties}:{properties:any}) {
  const supabase = await createClient()
  // const respTips = await getQuestions()

  const {data:{user}}= await supabase.auth.getUser()

  // const questions = respTips as TipsFull[]

  return (
    <ContainerScreen>
      <div className='flex justify-between'>
        <div className='mb-4'>
            <h1 className='text-3xl font-bold'>Imoveis a Venda</h1>
            <p className='text-sm text-gray-500 '>Ultimos imoveis a venda adicionado</p>
        </div>
        <Link href={'/adicionar-imovel'} className='flex align-bottom gap-2 self-start md:self-end'>
          <Button size={'sm'} className='bg-primaryPalet max-w-xs hover:bg-blue-800'><Plus size={14}/><p className='text-xs'>Adicionar Imóvel</p></Button>
        </Link>
      </div>
      
      <Separator className='h-2'/>
        <div className='flex gap-4 flex-wrap'>

                    {
                                properties.map((property:any)=>(
                                <CardHouse area={property.displayInfo.totalArea} 
                                id={property.id}
                                propurse={property.displayInfo.propurse}
                                bathrooms={property.displayInfo.bathrooms}
                                 bedrooms={property.displayInfo.bedrooms} 
                                 city={property.location.city} description={property.displayInfo.description}
                                neighborhood={property.location.neighborhood}
                                garage={property.displayInfo.garageSpaces} 
                                price={property.financial.salePrice} 
                                title={property.displayInfo.title}
                                key={property.id} />))
                            }
        </div>
    </ContainerScreen>

  );
  
    

};

