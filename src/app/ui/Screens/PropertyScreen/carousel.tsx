import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import imageProperty from '@/app/public/images/Home/searchImage.png'
import Image from "next/image"
export function CarouselProperty({gallery}:{gallery:string[]}) {

    return (
        <Carousel className="w-[99%] max-w-[150rem] self-center   justify-self-center">
        <CarouselContent className="">
          {gallery.map((photo, index) => (
            <CarouselItem key={index} className="  basis-10/12 md:basis-1/4 lg:basis-1/4">
              <div className=" bg-white h-52 w-96 md:min-h-72 md:min-w-[52rem] relative object-cover">
                    <Image src={photo} alt="image" fill   className="absolute  pl-1 object-cover h-52 w-96"/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      )
}

