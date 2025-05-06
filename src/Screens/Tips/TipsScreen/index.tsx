
'use client'
import React from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AllTips } from './AllTips';
import { ContainerScreen } from '@/components/modules/Containers/ContainerSceen';

export  function TipsScreen() {
  return (
    <ContainerScreen>
      <div className='flex justify-between'>
        <div className='mb-4'>
            <h1 className='text-3xl font-bold'>Dicas</h1>
            <p className='text-sm text-gray-500 '>Encontre e  crie dicas sobre paises que você imigrou ou pretende imigrar.</p>
        </div>
        <Link href={'dicas/criar-dica'} className='flex align-bottom gap-2 self-start md:self-end'>
          <Button size={'sm'} className='bg-primary-palet max-w-xs'><Plus size={14}/><p className='text-xs'>Criar dicar</p></Button>
        </Link>
      </div>
      <Separator className='h-2'/>
        <AllTips   />
    </ContainerScreen>

  );
  
    

};

