'use client';
import { TipsFull } from '@/app/types/TypesDB';
import { fetchTipsPagination } from '@/lib/supabase/queries/server/fetchTipsPagination';
import { Timer } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import useSWR, {mutate} from 'swr';
import SectionContainer from '../../../components/Containers/SectionContainer';
import CardTipsContainer from '../../../components/Containers/CardsTipsContainer';
import { TipCard } from '../../../components/TipCard';
import { useUserData } from '@/app/context/ContextUserAccont';
import { GenericPagination } from '../../../components/Pagination/GenericPagination';

// Configuração do fetcher
const fetcher = async ([page, limit]: [number, number]) => {
  const result = await fetchTipsPagination(page, limit);
  return result;
};

export function TopTipsListSection() {
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
      keepPreviousData: true,
    }
  );

  // Função de paginação otimizada
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (data?.totalPages || 1)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <SectionContainer IconTitle={Timer} title='Últimas Dicas' className=''>
      <CardTipsContainer>
        {error && <div>Erro ao carregar dicas</div>}
        
        {isLoading ? (
          'Carregando...'
        ) : (
          data?.tips.map((tipFull) => (
            <TipCard
              onDelete={onDeleteTip}
              currentUser={dataUser?.id || ''}
              key={tipFull.id}
              tipFull={tipFull}
            />
          ))
        )}
      </CardTipsContainer>
        <GenericPagination currentPage={currentPage} onPageChange={(page)=>setCurrentPage(page)} totalPages={data?.totalPages as number}/>
      {/* Paginação */}

    </SectionContainer>
  );
}