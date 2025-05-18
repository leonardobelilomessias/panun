import Image from "next/image"
import { HeroSearchForm } from "./HeroSearchForm"
import ImageSearch from "@/public/images/Home/searchImage.png"

export function HeroSearch() {
  return (
    <div className="relative w-full mb-8 md:mb-16">
      {/* Banner com imagem de fundo */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
        {/* Imagem de fundo */}
        <Image src={ImageSearch || "/placeholder.svg"} alt="Busca de imóveis" fill className="object-cover" priority />

        {/* Overlay escuro para melhorar contraste */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Conteúdo do banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 drop-shadow-lg">
            Encontre o imóvel dos seus sonhos
          </h1>
          <p className="text-lg md:text-xl text-center max-w-2xl drop-shadow-md">
            Milhares de opções para comprar ou alugar em toda a região
          </p>
        </div>
      </div>

      {/* Container do formulário de busca */}
      <div className="relative mx-auto px-4 md:px-8 max-w-7xl">
        <div className="relative -mt-16 md:-mt-24">
          <HeroSearchForm />
        </div>
      </div>
    </div>
  )
}
