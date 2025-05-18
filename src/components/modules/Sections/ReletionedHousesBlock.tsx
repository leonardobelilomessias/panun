'use client'
import React, { useEffect, useState } from 'react';
import { ContainerCardsHouse } from '../Containers/ContainerCardsHouse/ContainerCardsHouse';
import Image from 'next/image';
import { CardHouseSmall } from '../Cards/CardHouseSmall/index.tsx';
import imagescrol from '@/public/images/Home/scroll.gif';
import { listRentProperties } from '@/lib/supabase/queries/client/properties/listRentProperties';
import { PropertySingle } from '@/types/typesPropeties';
import { listSalesProperties } from '@/lib/supabase/queries/client/properties/listSalesProperties';

export function RelationedHousesBlock() {
  const [properties, setProperties] = useState<PropertySingle[] | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true);
        const response = await listSalesProperties()
        setProperties(response);
      } catch (error) {
        console.error("Erro ao carregar propriedade:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando informações do imóvel...</div>;
  }
  
  if (!properties) {
    return <div className="min-h-screen flex items-center justify-center">Imóvel não encontrado</div>;
  }
  
  return (
    <div className='bg-gray-100 flex flex-col py-8'>
      <ContainerCardsHouse>
        <div className='mb-6'>
          <h1 className='text-2xl font-extrabold'>Produtos Relacionados</h1>
          <p className='text-lg text-gray-600'>Selecionamos alguns produtos relacionados que você pode gostar.</p>
        </div>
        
        {/* Container dos cards com rolagem horizontal no mobile */}
        <div className="relative w-full">
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory w-full hide-scrollbar ">
            {properties.slice(0, 4).map((property) => (
              <div key={property.id} className="w-72  flex-shrink-0 snap-start">
                <CardHouseSmall
                  cover={property.property_covers[0].url}
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
                />
              </div>
            ))}
          </div>
          
          {/* Indicador de rolagem no mobile */}
          <div className='md:hidden flex mt-2'>
            <Image 
              src={imagescrol} 
              alt="Deslize para ver mais" 
              width={40} 
              height={40} 
              className="opacity-60"
            />
          </div>
        </div>
      </ContainerCardsHouse>
    </div>
  );
}