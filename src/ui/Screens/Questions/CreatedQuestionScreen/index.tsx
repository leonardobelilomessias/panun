import { ContainerScreen } from '@/ui/components/Containers/ContainerSceen';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function CreatedQuestionScreen({id}:{id?:string}) {
    return (
        <ContainerScreen>
            <div className="flex flex-col align-middle justify-center items-center">
                
                <h1 className="text-2xl font-bold my-4">Pergunta criada com Sucesso!</h1>
                <div className="bg-blue-100 rounded-full flex items-center justify-center p-4">
                    <Check className="text-primaryPalet" size={100}/>
                </div>
                <p className="text-xs my-4 text-gray-700">Sua pergunta foi adiciona com sucesso e esta visível para todos. </p>
                <div className=' flex flex-col items-center mt-4 gap-2 justify-center'>
                    <Link className='bg-primaryPalet text-white p-1 text-sm rounded hover:bg-blue-400 min-w-36 text-center ' href={ id?`/pergunta/${id}`:'/perguntas'}>
                        <p>Ver pergunta criada</p>
                    </Link >
                    <Link className='border border-primaryPalet p-1 hover:bg-blue-100 hover:text-blue-700 text-primaryPalet text-sm rounded min-w-36 text-center ' href={'/perguntas'}>
                        <p>Ir para Todos Perguntas</p>
                    </Link>
                </div>

            </div>
        </ContainerScreen>
    );
};

