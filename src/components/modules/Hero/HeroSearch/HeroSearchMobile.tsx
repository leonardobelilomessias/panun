"use client"

import Image from "next/image"
import { HeroSearchForm } from "./HeroSearchForm"
import ImageSearch from "@/public/images/Home/searchImage.png"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function HeroSearchMobile() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <div className="relative w-full mb-8">
      {/* Banner com imagem de fundo */}
      <div className="relative h-[250px] w-full overflow-hidden">
        {/* Imagem de fundo */}
        <Image src={ImageSearch || "/placeholder.svg"} alt="Busca de imóveis" fill className="object-cover" priority />

        {/* Overlay escuro para melhorar contraste */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Conteúdo do banner */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-2xl font-bold text-center mb-3 drop-shadow-lg">Encontre o imóvel dos seus sonhos</h1>
          <p className="text-sm text-center max-w-xs drop-shadow-md mb-4">Milhares de opções para comprar ou alugar</p>

          <Button
            onClick={() => setShowSearch(!showSearch)}
            className="bg-primary-palet hover:bg-primary-palet/90 text-white"
          >
            <Search className="mr-2 h-4 w-4" />
            Buscar Imóveis
          </Button>
        </div>
      </div>

      {/* Formulário de busca expansível */}
      {showSearch && (
        <div className="px-4 py-6 bg-white shadow-md">
          <HeroSearchForm />
        </div>
      )}
    </div>
  )
}
