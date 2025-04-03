
import Link from "next/link";
import Image from "next/image";
import StudiesImage from '@/app/public/images/Landing/studies.png'

export const Studies = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-2  md:py-10 gap-10 flex-row-reverse ">

<div className="z-10">
        <Image src={StudiesImage} alt="" width={500} height={500}/>
        {/* <HeroCards /> */}
        {/* <iframe className="w-[320px] hidden sm:flex h-[220px] md:w-[720px] md:h-[385px] lg:w-[590px] lg:h-[345px] "  width="560" height="315" src="https://www.youtube.com/embed/e-VjPNciRT4?si=jgH5uEeBf3QHLGmx" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe> */}
      </div>
      <div className="text-center lg:text-start space-y-6">
        <main className="text-4xl md:text-6xl font-bold">
          {/* <h3 className="text-gray-400 text-sm">Faça parte!</h3> */}
          <h1 className="inline text-primaryPalet">
          Cursos de Idiomas e Profissionalizantes
          </h1>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Conectamos brasileiros espalhados por todo o mundo para tornar a jornada do imigrante simplificada e prazerosa.
        </p>

      </div>


    </section>
  );
};
