import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import Link from "next/link";
import Image from "next/image";
import TravelImage from '@/app/public/images/travel5.jpg'
import Heroflags from '@/app/public/images/Home/house-green.png'
// import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-10  md:py-40 gap-10">
            <div className="z-10">
        <Image src={Heroflags} alt="" width={500} height={500}/>
        {/* <HeroCards /> */}
        {/* <iframe className="w-[320px] hidden sm:flex h-[220px] md:w-[720px] md:h-[385px] lg:w-[590px] lg:h-[345px] "  width="560" height="315" src="https://www.youtube.com/embed/e-VjPNciRT4?si=jgH5uEeBf3QHLGmx" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe> */}
      </div>
      <div className="text-center lg:text-start space-y-6">
        <main className="text-4xl md:text-6xl font-bold">
          {/* <h3 className="text-gray-400 text-sm">Faça parte!</h3> */}
          <h1 className="inline text-primaryPalet">
          Expecialistas em Financiamento Imobiliario
          </h1>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Temos os melhores especialistas em financiamento para auxiliar em todo o processo de compra.
        </p>

        <div className=" flex gap-4 flex-col md:flex-row ">
        <Link  className="w-full   text-center border-[1px] p-2 rounded-lg bg-primaryPalet text-white " href={'/entrar'}   >Saber Mais</Link>

        <Link  className="w-full   text-center border-[1px] p-2 rounded-lg border-primaryPalet  text-primaryPalet  " href={'/cadastro'}   >
            Entrar em contato
            {/* <GitHubLogoIcon className="ml-2 w-5 h-5" /> */}
          </Link>
        </div>
      </div>



    </section>
  );
};
