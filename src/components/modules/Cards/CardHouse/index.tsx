import imageexample from '@/public/images/Home/searchImage.png'
import { truncateText } from '@/util/textTrincate'
import { Bath, Bed, Car, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type CardHouseProps={
    id:string
    title:string,
    description:string
    price:string,
    bedrooms:number
    bathrooms:number
    area:number,
    garage:number
    city:string,
    neighborhood:string,
    propurse:string
}
export function CardHouse({area,bathrooms,bedrooms,description,garage,price,title,neighborhood, city, propurse,id}:CardHouseProps) {
    return (
        <Link href={`/imovel/${title.split(" ").join('-')}/${id}`} className="min-w-72 max-w-[24rem] h-[28rem]  md:h-[28rem] md:pb-4 flex flex-col bg-white  border-primary-palet  rounded-lg   shadow-primary-palet drop-shadow-xl">
            <div className='object-cover relative'>
                <p className='bg-primary-palet p-2 rounded-xl text-white absolute top-2 right-2 text-xs font-bold px-4'>{propurse}</p>
                <Image 
                    src={imageexample} 
                    width={300} 
                    height={300} 
                    alt="image card" 
                    className="w-full h-auto"  // Adicionei para melhor responsividade
                />
            </div>
            <div className='flex flex-col h-full justify-between p-4 '>  {/* Adicionei justify-between */}
                <div className='flex gap-1 items-center'>
                    <MapPin size={12} className='text-primary-palet'/>
                    <p className='text-sm'>{neighborhood}</p> - <p className='text-sm'>{city}</p>
                </div>
                <div>  {/* Agrupei o conteúdo superior */}
                    <div className='h-11'>
                        <p className="font-bold">{title}</p>
                    </div>
                    <p className='text-sm text-gray-500'>{ truncateText(description,120)}</p>
                    <p className='text-lg font-bold text-primary-palet'>R${price}</p>
                </div>
                <div className='flex  mt-auto gap-2 justify-around content-around'>  {/* Adicionei mt-auto */}
                    <div className='flex flex-col items-center'>
                        <Bed size={24} className='text-primary-palet'/>
                        <p className='text-gray-500 font-bold text-sm'>{bedrooms}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Bath size={24} className='text-primary-palet'/>
                        <p className='text-gray-500 font-bold text-sm'>{bathrooms}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Car size={24} className='text-primary-palet'/>
                        <p className='text-gray-500 font-bold text-sm'>{garage}</p>

                    </div>
                    <div className='flex flex-col items-center'>
                        <Ruler size={24} className='text-primary-palet'/>
                        <p className='text-gray-500 font-bold text-sm'>{area}M²</p>

                    </div>


                </div>
            </div>
        </Link>
    )
}