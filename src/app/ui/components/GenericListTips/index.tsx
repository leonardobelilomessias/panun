'use client'
import { Tip, TipsFull } from '@/app/types/TypesDB';
import { Calendar, LucideProps, Timer } from 'lucide-react';
import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from 'react';
import { TipCard } from '../TipCard';
import { supabaseClient } from '@/lib/supabase/client';
import useSWR, { mutate } from 'swr';
import { fetchTipsPagination } from '@/lib/supabase/queries/server/fetchTipsPagination';
import { useUserData } from '@/app/context/ContextUserAccont';
import { User } from '@supabase/supabase-js';
import SectionContainer from '../Containers/SectionContainer';
import CardTipsContainer from '../Containers/CardsTipsContainer';
interface ItemsPros {
    linkButton: string,
    title: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    status?: string
    tips: TipsFull[]
    userId?: string | null | undefined
    hasButton?: boolean
}

const fetcher = async ([page, limit]: [number, number]) => {
    const result = await fetchTipsPagination(page, limit);
    return result;
};

export default function GenericTipList() {
    const [user, setUser] = useState<User | null>()
    const { dataUser } = useUserData();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 5;
    function onDeleteTip() {
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
    async function getDatauser() {

        const { data: { user } } = await supabaseClient().auth.getUser()
        setUser(user)
    }

    // Função para carregar as dicas


    // Carrega as dicas ao mudar a página
    useEffect(() => {
        getDatauser()
    }, [currentPage]);


    return (
        <SectionContainer IconTitle={Timer} title='Últimas Dicas' >
            <CardTipsContainer>
                {/* <>{JSON.stringify(data?.tips)}</> */}
                {data?.tips.map((tipFull) => (
                    <TipCard onDelete={onDeleteTip} tipFull={tipFull} key={tipFull.id} currentUser={dataUser?.id || ""} />
                ))}

            </CardTipsContainer>
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