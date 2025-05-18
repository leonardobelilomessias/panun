import { Bath, Bed, Car, MapPin, Ruler } from "lucide-react"
import Image from "next/image"
import { formatCurrency2 } from "@/lib/utils"
import { TransformedProperty } from "../../Sections/HousesBlock"

export function CardHousePreview({
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
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Esta é uma visualização de como o card ficará com a imagem em destaque */}
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl shadow-xl">
        <Image
          src={cover || "/placeholder.svg?height=800&width=1200"}
          fill
          sizes="100vw"
          priority
          alt={`Imóvel: ${title}`}
          className="object-cover"
        />

        {/* Badge de propósito (venda/aluguel) */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary-palet text-white font-bold py-2 px-5 rounded-full shadow-lg text-sm">
            {propurse}
          </span>
        </div>

        {/* Overlay com gradiente e informações */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center text-white mb-2">
            <MapPin size={18} className="mr-2" />
            <p className="text-lg font-medium">
              {neighborhood} - {city}
            </p>
          </div>

          <h3 className="text-white text-3xl font-bold mb-3">{title}</h3>

          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-white">{formatCurrency2(String(price))}</p>

            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Bed size={18} className="text-white" />
                <span className="text-white font-medium">{bedrooms}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Bath size={18} className="text-white" />
                <span className="text-white font-medium">{bathrooms}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Car size={18} className="text-white" />
                <span className="text-white font-medium">{garageSpaces}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Ruler size={18} className="text-white" />
                <span className="text-white font-medium">{totalArea}m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-gray-500">
        <p>Visualização da imagem em destaque (proporção 3:2)</p>
      </div>
    </div>
  )
}
