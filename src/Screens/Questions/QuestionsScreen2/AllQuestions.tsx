'use client'
import { Loader2, Timer } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import SectionContainer from '@/components/modules/Containers/SectionContainer';
import { GenericPagination } from '@/components/modules/Pagination/GenericPagination';
import { supabaseClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import useSWR, { mutate } from 'swr';
import { fetchQuestionsPaginationWithSelect } from '@/lib/supabase/queries/server/questions/fetchQuestionsPaginationWithSelect';
import { useSelectStoreContryQuestions, useSelectStoreThemeQuestions } from './stores/selectStore';
import CardTipsContainer from '@/components/modules/Containers/CardsTipsContainer';
import { EmptyContainerGeneric } from '@/components/modules/Empty/EmptyContainerGeneric';
import { SelectGroupQuestions } from './SelectGroupQuestions';
import { CardListGeneric } from '@/components/modules/Cards/CardQuestionList';
import { deleteQuestionById } from '@/lib/supabase/queries/server/questions/deleteQuestionById';
import { usePathname } from 'next/navigation';

const fetcherQuestions = async ([page, limit, selectedValueThemeQuestions, selectedValueCountryQuestions]: [number, number, string, string]) => {
  console.log('buscando perguntas....')
  const result = await fetchQuestionsPaginationWithSelect(page, limit, selectedValueThemeQuestions, selectedValueCountryQuestions,);
  console.log(result)
  return result;
};

export function AllQuestions() {
  const { selectedValueThemeQuestions, setSelectedValueThemeQuestions } = useSelectStoreThemeQuestions();
  const { selectedValueCountryQuestions } = useSelectStoreContryQuestions();

  const [user, setUser] = useState<User | null>()
  const [currentPageQuestions, setCurrentPage] = useState(1);
  const limitQuestions = 5;
  function onDeleteQuestion() {
    mutate([currentPageQuestions, limitQuestions, selectedValueThemeQuestions, selectedValueCountryQuestions])
  }
  // Configuração do SWR
  const { data, error, isLoading } = useSWR(
    [currentPageQuestions, limitQuestions, selectedValueThemeQuestions, selectedValueCountryQuestions],
    fetcherQuestions,
    {
      // revalidateOnFocus: true,
      // keepPreviousData: true,
    }
  );
  async function getDatauser() {
    const { data: { user } } = await supabaseClient().auth.getUser()
    setUser(user)
  }

  // Função para carregar as dicas


  // Carrega as dicas ao mudar a página
  useEffect(() => {
    getDatauser()
    
  }, [currentPageQuestions]);



  return (
    <SectionContainer IconTitle={Timer} title='Últimas Perguntas' className=''>
      <SelectGroupQuestions />

      <CardTipsContainer>
        {

          isLoading ?
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-primaryPalet" />
            </div> :
            data?.questions?.map((questionFull) => (
              <CardListGeneric linkToShow={`/pergunta/${questionFull.id}`} itemFull={questionFull} linkToEdit={`/perguntas/editar-pergunta/${questionFull.id}`} onDeleteItem={()=>deleteQuestionById(questionFull.id)} onDeleteRefresh={onDeleteQuestion} currentUser={user?.id || ''} key={questionFull.id}  />
            ))
        }
        {
          (!data?.questions?.length && !isLoading) && <EmptyContainerGeneric />
        }
      </CardTipsContainer>
      <GenericPagination
        currentPage={currentPageQuestions}
        totalPages={data?.totalPages as number}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </SectionContainer>
  );
}




