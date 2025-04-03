import { Tip, TipsFull } from '@/app/types/TypesDB';
import { truncateText } from '@/app/util/textTrincate';
import { Calendar, LucideProps, Timer } from 'lucide-react';
import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { DropdownCard } from '../../Screens/Tips/TipsScreen/DropDownCard';
import { formatDate } from '@/app/util/FormatDate';
interface ItemsPros { 
    linkButton: string, 
    title: string, 
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, 
    status?: string 
    tips:TipsFull[]
    userId?:string |null | undefined
    hasButton?:boolean
}

export default function ListTipsWithPagination({ items }: { items: ItemsPros }) {
    return (
        <div className="mb-8 bg-white rounded-lg  pt-8 w-full">
            <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-2"><items.icon/></span>
                <h2 className="text-lg md:text-xl font-semibold">{items.title}</h2>
            </div>
            <div className="space-y-3 md:space-y-4">
                {items.tips.map((tipFull) => (
                    <Link href={`/dica/${tipFull.id}`} className="block hover:bg-gray-100 rounded-md cursor-pointer transition duration-200 px-4 py-2 max-w-5xl" key={tipFull.id}>
                        <div className="border-b border-gray-100 pb-3 md:pb-4 last:border-b-0 last:pb-0 relative">
                            {
                                tipFull.profile?.id ===  items.userId &&                             
                                      <div className='absolute right-0 top-0 sm:right-2 sm:top-2 w-8'>
                                        <DropdownCard onDelete={()=>null} tipId={tipFull.id}  />
                                      </div>
                            }
                            <h3 className="font-medium text-gray-800 mb-1 text-sm md:text-base line-clamp-1">{tipFull.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                <p className="text-xs text-gray-500 flex justify-start items-center">
                                    <Calendar  className="mr-1 h-3 w-3" />
                                 <span> {formatDate(tipFull.created_at).extendTime}</span>
                                </p>
                                <p className="text-xs text-gray-500">
                                    por <span className="text-primaryPalet font-medium">@{truncateText(tipFull.profile?.user_name || "", 8).toLowerCase()}</span>
                                </p>
                                <p className="text-xs text-gray-500">{tipFull.likes_count} Likes</p>
                                <p className="text-xs text-gray-500">{tipFull.comments.length} Comentários</p>
                                <p className='text-primaryPalet font-semibold text-xs'>Pais: {tipFull.country.name}</p>
                                <p className='text-primaryPalet font-semibold text-xs'>Tema: {tipFull.theme.name}</p>

                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            { items.hasButton &&

                <Link href={items.linkButton}>
                <div className="mt-4 flex justify-end">
                    <button className="bg-primaryPalet text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm hover:bg-blue-600 transition duration-200">
                        Ver todas
                    </button>
                </div>
            </Link>
            }
        </div>
    );
}