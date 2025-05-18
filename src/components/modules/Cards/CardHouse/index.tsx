import { Bath, Bed, Car, MapPin, Ruler } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { truncateText } from "@/util/textTrincate"
import { formatCurrency2 } from "@/lib/utils"
import { TransformedProperty } from "../../Sections/HousesBlock"

export function CardHouse({
  totalArea,
  bathrooms,
  bedrooms,
  description,
  garageSpaces,
  price,
  title,
  neighborhood,
  city,
  propurse,
  id,
  cover,
}: TransformedProperty) {
  return (
    <Link
      href={`/imovel/${title?.split(" ").join("-")}/${id}`}
      className="group w-full min-w-[280px] max-w-[350px] h-[500px] flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 snap-start"
    >
      <div className="relative w-full h-72 overflow-hidden">
        <Image
          src={cover || "/placeholder.svg"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          alt={`Imóvel: ${title}`}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start">
          <span className="bg-primary-palet text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-lg">
            {propurse}
          </span>
        </div>

        {/* Gradient overlay at the bottom of the image */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="flex flex-col h-full p-5 justify-between">
        <div className="space-y-3">
          <div className="flex items-center text-gray-600 text-sm bg-gray-100 rounded-full px-3 py-1.5 w-fit">
            <MapPin size={14} className="text-primary-palet mr-1.5" />
            <p className="truncate font-medium">
              {neighborhood} - {city}
            </p>
          </div>

          <h3 className="font-bold text-xl text-gray-800 line-clamp-2 min-h-[56px]">{title}</h3>

          <p className="text-sm text-gray-500 line-clamp-3 min-h-[60px]">{truncateText(description, 120)}</p>

          <p className="text-2xl font-bold text-primary-palet mt-3">{formatCurrency2(String(price))}</p>
        </div>

        <div className="flex mt-4 pt-4 border-t border-gray-200 justify-between">
          <div className="flex flex-col items-center gap-1" title="Quartos">
            <div className="bg-primary-palet/10 p-1.5 rounded-full">
              <Bed size={18} className="text-primary-palet" />
            </div>
            <span className="text-sm font-medium text-gray-700">{bedrooms}</span>
          </div>

          <div className="flex flex-col items-center gap-1" title="Banheiros">
            <div className="bg-primary-palet/10 p-1.5 rounded-full">
              <Bath size={18} className="text-primary-palet" />
            </div>
            <span className="text-sm font-medium text-gray-700">{bathrooms}</span>
          </div>

          <div className="flex flex-col items-center gap-1" title="Vagas de Garagem">
            <div className="bg-primary-palet/10 p-1.5 rounded-full">
              <Car size={18} className="text-primary-palet" />
            </div>
            <span className="text-sm font-medium text-gray-700">{garageSpaces}</span>
          </div>

          <div className="flex flex-col items-center gap-1" title="Área Total">
            <div className="bg-primary-palet/10 p-1.5 rounded-full">
              <Ruler size={18} className="text-primary-palet" />
            </div>
            <span className="text-sm font-medium text-gray-700">{totalArea}m²</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
