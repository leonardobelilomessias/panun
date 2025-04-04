'use client'
import { fetchTipsPagination, fetchTipsPaginationWithSelect } from '@/lib/supabase/queries/server/fetchTipsPagination';
import { Loader2, Timer } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import SectionContainer from '@/components/modules/Containers/SectionContainer';
import CardTipsContainer from '@/components/modules/Containers/CardsTipsContainer';
import { GenericPagination } from '@/components/modules/Pagination/GenericPagination';
import { SelectGroupTips } from './SelectTips';
import useSWR, { mutate } from 'swr';
import { useSelectStoreContryTips, useSelectStoreThemeTips } from './stores/selectStore';
import { EmptyTips } from '@/components/modules/Tips/EmptyTyps';
import { useStoreUser } from '@/context/store/storeUser';
import { CardListGeneric } from '@/components/modules/Cards/CardQuestionList';
import { deleteTip } from '../CreateTipScreen/actions/delete-tip-action';

const fetcherTips = async ([page, limit, selectedValueThemeTips, selectedValueCountryTips]: [number, number, string, string]) => {
  console.log('buscando dicas ....')
  const result = await fetchTipsPaginationWithSelect(page, limit, selectedValueThemeTips, selectedValueCountryTips,);
  console.log(result)
  return result;
};

export function  AllTips (){
  const { selectedValueThemeTips,  } = useSelectStoreThemeTips();
  const [currentPageTips, setCurrentPage] = useState(1);
  const { selectedValueCountryTips } = useSelectStoreContryTips();
  const { userStored } = useStoreUser();
  const limitTips = 5;
  function onDeleteTip() {
    console.log('ondelet')
    mutate([currentPageTips, limitTips, selectedValueThemeTips, selectedValueCountryTips])
  }
  // Configuração do SWR
  const { data, error, isLoading } = useSWR(
    [currentPageTips, limitTips, selectedValueThemeTips, selectedValueCountryTips],
    fetcherTips,
    {
      revalidateOnFocus: true,
      keepPreviousData: true,
    }
  );
  
  useEffect(()=>{
  // return()=>{mutate([currentPageTips, limitTips, selectedValueThemeTips, selectedValueCountryTips])} 
},[])
  return (
    <SectionContainer IconTitle={Timer} title='Últimas Dicas' className=''>
      <SelectGroupTips />
      <CardTipsContainer>
        {(!data?.tips?.length && !isLoading) && <EmptyTips />}
        {isLoading ?
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-primaryPalet" />
            </div> :
            data?.tips?.map((tipFull) => (
              <CardListGeneric linkToEdit={`/editar-dica/${tipFull.id}`} linkToShow={`/dica/${tipFull.id}`} onDeleteRefresh={onDeleteTip} onDeleteItem={()=> deleteTip(tipFull.id)} currentUser={userStored?.id || ''} key={tipFull.id} itemFull={tipFull} />
            ))}

        {  (!!data?.tips?.length && !isLoading) && <GenericPagination
          currentPage={currentPageTips}
          totalPages={data?.totalPages as number}
          onPageChange={(page) => setCurrentPage(page)}
        />}
      </CardTipsContainer>
    </SectionContainer>
  );
}
