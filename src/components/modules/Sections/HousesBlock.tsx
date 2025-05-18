"use client"

import React from "react"
import { ContainerCardsHouse } from "../Containers/ContainerCardsHouse/ContainerCardsHouse"
import { CardHouse } from "../Cards/CardHouse"
import imagescrol from "@/public/images/Home/scroll.gif"
import Image from "next/image"
import { ChevronRight, ChevronLeft, Home } from "lucide-react"

export interface TransformedProperty {
  id: string
  price: number
  title: string
  description: string
  status: string
  type: string
  totalArea: string
  usableArea: string
  bedrooms: string
  bathrooms: string
  suites: string
  garageSpaces: string
  floor: string
  furnished: string
  cover: string
  neighborhood: string
  city: string
  propurse: string
}

interface PropertiesType {
  title: string
  description: string
  properties?: TransformedProperty[]
}

export function HousesBlock({ description, properties, title }: PropertiesType) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <section className="bg-gray-50 py-4">
      <ContainerCardsHouse>
        <div className="mb-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-3">
            <div className="h-1.5 w-16 bg-primary-palet rounded-full"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">{title}</h2>
          <p className="text-lg text-center text-gray-600">{description}</p>
        </div>

        {/* Navigation buttons for desktop */}
        <div className="hidden md:flex justify-end gap-2 mb-4 px-4">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-primary-palet/10 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-primary-palet" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-primary-palet/10 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-primary-palet" />
          </button>
        </div>

        {/* Properties container */}
        <div
          ref={scrollContainerRef}
          className="px-4 md:px-2 flex gap-6 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory w-full md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {(!properties || properties.length === 0) && <EmptyContainer />}

          {!!properties &&
            properties.length > 0 &&
            properties.map((property) => (
              <CardHouse
                key={property.id}
                cover={property.cover}
                floor={property.floor}
                furnished={property.furnished}
                status={property.status}
                suites={property.suites}
                type={property.type}
                usableArea={property.usableArea}
                totalArea={property.totalArea}
                id={property.id}
                bathrooms={property.bathrooms}
                bedrooms={property.bedrooms}
                city={property.city}
                description={property.description}
                neighborhood={property.neighborhood}
                garageSpaces={property.garageSpaces}
                price={property.price}
                title={property.title}
                propurse={property.propurse}
              />
            ))}
        </div>

        {/* Mobile scroll indicator */}
        <div className="md:hidden flex justify-center items-center mt-2 gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Image
              src={imagescrol || "/placeholder.svg"}
              alt="Deslize para ver mais"
              width={30}
              height={30}
              className="animate-pulse"
            />
            <span className="text-sm font-medium text-gray-600">Deslize para ver mais</span>
          </div>
        </div>
      </ContainerCardsHouse>
    </section>
  )
}

function EmptyContainer() {
  return (
    <div className="col-span-full bg-white rounded-xl p-10 shadow-md flex flex-col items-center justify-center text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Home className="h-10 w-10 text-primary-palet" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum imóvel encontrado</h3>
      <p className="text-gray-600">Ainda não foi cadastrado nenhum imóvel nesta categoria.</p>
    </div>
  )
}
