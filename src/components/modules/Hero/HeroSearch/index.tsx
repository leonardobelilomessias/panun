import Image from "next/image";
import { HeroSearchForm } from "./HeroSearchForm";
import ImageSearch from '@/public/images/Home/searchImage.png'

export function HeroSearch() {
    return (
        <div className="relative h-[100-vh] w-full bg-yellow-300 mb-[26rem] md:mb-20 max-w-full ">

        <div className="relative bg-green-400  h-36 md:h-80 w-full max-w-[100vw]"> {/* Container principal com altura fixa e relativo */}
            {/* Imagem de fundo - absolute com fill e object-cover para manter proporção */}
            <div className="absolute inset-0 z-0"> {/* Container para a imagem */}
                <Image 
                    src={ImageSearch} 
                    alt="Background" 
                    fill
                    className="object-cover" // Isso previne distorção mantendo a proporção
                    priority // Opcional: se for a imagem principal
                />
            </div>
            
            {/* Conteúdo sobreposto - com z-index maior */}
            <div className="relative z-10 h-full flex items-end justify-center shadow-2xl">
                <HeroSearchForm />
            </div>
        </div>
        </div>
    )
}