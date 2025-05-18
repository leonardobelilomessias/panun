import { truncateText } from '@/util/textTrincate'
import { Bath, Bed, Car, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type CardHouseProps = {
  id: string
  title: string,
  price: string,
  bedrooms: number
  bathrooms: number
  area: number,
  garage: number
  city: string,
  neighborhood: string,
  full_description: string
  shot_description: string,
  purpose: string
  street: string
  cover: string
}

export function CardHouseSmall({
  area,
  bathrooms,
  bedrooms,
  garage,
  price,
  title,
  neighborhood,
  city,
  id,
  shot_description,
  cover,
  purpose
}: CardHouseProps) {
  return (
    <Link 
      href={`/imovel/${id}`} 
      className="group w-full sm:w-64 md:w-72 h-auto min-h-80 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
    >
      {/* Imagem e Tag de Propósito */}
      <div className='relative w-full aspect-video'>
        <Image
          src={cover}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
          alt={`Imóvel: ${title}`}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className='absolute top-3 right-3'>
          <span className='bg-primary-palet text-white text-xs font-bold py-1 px-3 rounded-full shadow-md'>
            {purpose}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className='flex flex-col flex-grow p-3 sm:p-4 justify-between'>
        {/* Localização */}
        <div>
          <div className='flex items-center text-gray-600 mb-2'>
            <MapPin size={14} className='text-primary-palet flex-shrink-0 mr-1'/>
            <p className='text-sm font-medium truncate'>{neighborhood} - {city}</p>
          </div>

          {/* Título e Descrição */}
          <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 overflow-hidden">{title}</h3>
          <p className='text-sm text-gray-500 line-clamp-2 min-h-10 mb-2'>{truncateText(shot_description, 80)}</p>
          <p className='text-lg font-bold text-primary-palet mt-1'>R$ {price}</p>
        </div>

        {/* Características */}
        <div className='mt-auto pt-3 border-t border-gray-100'>
          <div className='grid grid-cols-4 gap-1 text-center'>
            <div className='flex flex-col items-center'>
              <Bed size={18} className='text-primary-palet mb-1'/>
              <p className='text-gray-700 text-xs sm:text-sm'>{bedrooms}</p>
            </div>
            <div className='flex flex-col items-center'>
              <Bath size={18} className='text-primary-palet mb-1'/>
              <p className='text-gray-700 text-xs sm:text-sm'>{bathrooms}</p>
            </div>
            <div className='flex flex-col items-center'>
              <Car size={18} className='text-primary-palet mb-1'/>
              <p className='text-gray-700 text-xs sm:text-sm'>{garage}</p>
            </div>
            <div className='flex flex-col items-center'>
              <Ruler size={18} className='text-primary-palet mb-1'/>
              <p className='text-gray-700 text-xs sm:text-sm'>{area}m²</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}