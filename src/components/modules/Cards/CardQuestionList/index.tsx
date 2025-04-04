import React from 'react';
import Link from 'next/link';
import { truncateText } from '@/util/textTrincate';
import { Calendar, MessageCircle, ThumbsUp, User2 } from 'lucide-react';
import { formatDate } from '@/util/FormatDate';
import { ListItemGenericFull, TipsFull } from '@/types/TypesDB';
import { DropdownCardGeneric } from './drop';
import Image from 'next/image';
import ImageDefault from '@/public/images/profile/default/avatar-default.jpg'
interface TipCardProps {
    id: string;
    title: string;
    created_at: string,
    user_name: string
    likes: string | number
    comments: any[]
}

export function CardListGeneric({ itemFull, currentUser, onDeleteRefresh,linkToShow , linkToEdit,onDeleteItem}: { itemFull: ListItemGenericFull, currentUser: string, onDeleteRefresh:()=>void,linkToShow:string, linkToEdit:string,onDeleteItem:()=>void }) {
    return (
        <div className='relative  mb-2 flex shadow-sm md:items-center ' >
            <AvatarCardGeneric userId={itemFull.profile.id}  imageUrl={itemFull.profile.avatar_url}/>
            <div className="border-b border-gray-100 pb-3 md:pb-4 last:border-b-0 last:pb-0 relative flex-1 ">
                {
                    itemFull.profile?.id === currentUser &&
                    <div className='absolute right-0 top-0 sm:right-2 sm:top-4  rounded w-8 min-h-8 flex items-center justify-center'>
                        <DropdownCardGeneric linkToEdit={linkToEdit} onDeleteRefresh={onDeleteRefresh} deleteFunction={onDeleteItem} idItem={itemFull.id} />
                    </div>
                }
                <Link href={`${linkToShow}`} className="block hover:bg-gray-100 rounded-md cursor-pointer transition duration-200 px-4 py-2 max-w-5xl" >
                    <h3 className="font-medium text-blue-950 mb-1 text-sm md:text-base line-clamp-2 max-w-[90%]">{itemFull.title}</h3>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <p className="text-xs text-gray-500 flex justify-start items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{formatDate(itemFull.created_at).extendTime}</span>
                    </p>
                    <p className="text-xs text-gray-500 flex items-center justify-center">
                    <User2 size={12}/> <span className="text-gray-500 "> {truncateText(itemFull.profile?.user_name || "", 10).toLowerCase()}</span>
                    </p>
                    <p className=" flex text-xs text-gray-500 items-center"><ThumbsUp  size={12}/> {itemFull.likes_count} </p>
                    <p className=" flex text-xs text-gray-500 items-center"><MessageCircle size={12} /> {itemFull.comments.length} </p>
                    <p className='text-gray-500 font-medium text-xs items-center bg-blue-50 px-2 py-1 rounded-lg'> {itemFull.country.name}</p>
                    <p className='text-gray-500 font-semibold text-xs items-center bg-blue-50 px-2 py-1 rounded-lg'> {itemFull.theme.name}</p>

                </div>
                </Link>
            </div>
        </div>
    );
};

function AvatarCardGeneric({imageUrl,userId}:{imageUrl:string| null|undefined,userId:string}){
    return (
    <Link href={`/perfil/${userId}`} className=' cursor-pointer    py-2 '>
    <Image src={imageUrl || ImageDefault} alt='' width={150} height={150} className='w-12 h-12 object-cover rounded-2xl border  shadow-lg'   />
    </Link>
)
}