import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import imageProperty from '@/public/images/Home/searchImage.png'
import Image from "next/image"
import LightboxImages from "./LightboxImages"
export function CarouselProperty({ gallery }: { gallery: string[] }) {

  return (
    <Carousel className="w-[99%] max-w-[150rem] self-center   justify-self-center">
      <CarouselContent className="">
        {gallery.map((photo, index) => (
          <CarouselItem key={index} className="basis-10/12 md:basis-1/4 lg:basis-1/4">
            <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg">
            <LightboxImages images={gallery} initialIndex={index}>   
              
              <Image
                src={photo}
                alt="image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
                </LightboxImages>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

