import { FormSingIn } from "@/components/modules/FormSigin";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { Navbar } from "./Navbar";
import Image from "next/image";
import WorldMap from '@/public/images/Landing/hero-flags.png'
export const HeroLogin = () => {
  return (
    <div className=" min-h-screen">

    <section className="container p-4 flex flex-col   gap-10">
      {/* Título - Comunidade Apartamento na Planta Belo Horizonte */}
      <div className=" p-4 rounded-xl  pb-60 pt-4 gap-6 ">

      <div className="text-center lg:text-start  mb-6 space-y-6 lg:w-full ">
        <main className="text-center text-xl sm:text-5xl  md:text-6xl font-bold">
         <div>

      <h1></h1>
         </div>
        </main>
      </div>
<div className=" flex flex-row sm:gap-10  flex-col justify-center lg:flex-row ">
    <div className="flex  min-h-60  flex-1 ">
    <Image src={WorldMap} width={500} height={500} alt=""/>
    {/* <iframe
    className="min-h-60 md:min-h-[420px] xl:min-h-[420px]"
    width={'100%'}
    height={"100%"}
src="https://www.youtube.com/embed/OhagXaxl72k?si=uoYsOfHG1GuVS2NL&amp;controls=0"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe> */}
    </div>


        {/* Descrição e Botões */}
        <div className=" px-2 flex flex-col flex-1  max-w-lg m-auto ">

          <p className="flex text-center text-primary-palet text-2xl font-bold mb-10">
            Faça seu login e tenha acesso a dicas e suporte para brazileiros imigrantes.
          </p>
          <FormSingIn/>
          <div className="flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-6 mt-6 lg:mt-10 ">

          </div>
        </div>

        {/* Video Section */}
        <div className="">

        </div>
            
      </div>
    
    </div>
    </section>
    </div>
  );
};
