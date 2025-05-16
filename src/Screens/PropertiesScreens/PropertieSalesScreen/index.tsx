
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Plus, Sparkles } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ContainerScreen } from '@/components/modules/Containers/ContainerSceen';
import { ContainerCardsHouse } from '../../../components/modules/Containers/ContainerCardsHouse/ContainerCardsHouse';
import { CardHouse } from '../../../components/modules/Cards/CardHouse';
import { listSalesProperties } from '@/lib/supabase/queries/client/properties/listSalesProperties';
import { CardHouseDashboard } from '@/components/modules/Cards/DashboardCards/CardHouseDashboard';

export async function PropertiesSalesScreens({properties}:{properties:any}) {
  const supabase = await createClient()
  // const respTips = await getQuestions()
  const dataSales = await listSalesProperties()
  console.log('dataSales', dataSales)
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
          <Button size={'sm'} className='bg-primary-palet max-w-xs hover:bg-blue-800'><Plus size={14}/><p className='text-xs'>Adicionar Imóvel</p></Button>
        </Link>
      </div>
      
      <Separator className='h-2'/>
        <div className='flex gap-4 flex-wrap'>

                    {(dataSales==null && dataSales==undefined || dataSales?.length===0) &&
                        <div className='flex flex-col items-center justify-center w-full h-full'>
                            <Sparkles size={100} className='text-primary-palet'/>
                            <p className='text-2xl font-bold'>Nenhum imóvel encontrado</p>
                            <p className='text-sm text-gray-500'>Adicione um imóvel para começar</p>
                        </div>
                    }
                    {
                      (dataSales!==null && dataSales!==undefined && dataSales?.length>0) &&
                                dataSales.map((property)=>(
                                <CardHouseDashboard area={property.details[0].total_area} 
                                id={property.id}
                                propurse={'Venda'}
                                bathrooms={property.details[0].bathroom}
                                 bedrooms={property.details[0].bedroom} 
                                 city={property.cities.name} description={property.details[0].shot_description}
                                neighborhood={property.neighborhoods.name}
                                garage={property.details[0].garage} 
                                price={String(property.financeiro[0]?.price || '10')} 
                                title={property.details[0].title|| "sem titulo"}
                                key={property.id} />))
                            }
        </div>
    </ContainerScreen>

  );
  
    

};

