
import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Plus, Sparkles } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AllQuestions } from './AllQuestions';
import { ContainerScreen } from '@/components/modules/Containers/ContainerSceen';

export async function QuestionsScreen2() {
  const supabase = await createClient()
  // const respTips = await getQuestions()

  const {data:{user}}= await supabase.auth.getUser()

  // const questions = respTips as TipsFull[]

  return (
    <ContainerScreen>
      <div className='flex justify-between'>
        <div className='mb-4'>
            <h1 className='text-3xl font-bold'>Perguntas</h1>
            <p className='text-sm text-gray-500 '>Encontre e  crie perguntas sobre paises que você imigrou ou pretende imigrar.</p>
        </div>
        <Link href={'/perguntas/criar-pergunta'} className='flex align-bottom gap-2 self-start md:self-end'>
          <Button size={'sm'} className='bg-primaryPalet max-w-xs hover:bg-blue-800'><Plus size={14}/><p className='text-xs'>Criar Pergunta</p></Button>
        </Link>
      </div>
      
      <Separator className='h-2'/>
        <AllQuestions   />
    </ContainerScreen>

  );
  
    

};

