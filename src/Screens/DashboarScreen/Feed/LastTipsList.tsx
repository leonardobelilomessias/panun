'use client'; // Transforma o componente em Client Component
import { TipsFull } from '@/types/TypesDB';
import { fetchTipsPagination } from '@/lib/supabase/queries/server/fetchTipsPagination';
import { Timer } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SectionContainer from '../../../components/modules/Containers/SectionContainer';
import CardTipsContainer from '../../../components/modules/Containers/CardsTipsContainer';
import { TipCard } from '../../../components/modules/TipCard';
import { useUserData } from '@/context/ContextUserAccont';
import useSWR,{mutate} from 'swr';
const fetcher = async ([page, limit]: [number, number]) => {
  const result = await fetchTipsPagination(page, limit);
  return result;
};
export function LastTipsList() {
  const { dataUser } = useUserData();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
    function onDeleteTip(){
      mutate([currentPage, limit])
    }
  // Configuração do SWR
  const { data, error, isLoading } = useSWR(
    [currentPage, limit],
    fetcher,
    {
      revalidateOnFocus: true,
      // keepPreviousData: true,
    }
  );

  

  return (
    <SectionContainer IconTitle={Timer} title='Últimas Dicas' className=''>
      <CardTipsContainer>
      {
        
        isLoading?'carregando..':
        data?.tips.map((tipFull) => (
          <TipCard onDelete={onDeleteTip} currentUser={dataUser?.id|| ''} key={tipFull.id} tipFull={tipFull} />
        ))
      }
      </CardTipsContainer>

      {/* Paginação */}
      <div className="">
        <Link href="/dicas">
          <button className="bg-primaryPalet text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-sm hover:bg-blue-600 transition duration-200 mt-4">
            Ver todas
          </button>
        </Link>

      </div>
    </SectionContainer>
  );
}




