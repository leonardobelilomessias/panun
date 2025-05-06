'use client'
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { FeaturesHomeScreen } from "./FeaturesHomeScrre";
import { Studies } from "./Studies";
import { HeroSearch } from "../../components/modules/Hero/HeroSearch";
import { HousesBlock } from "../../components/modules/Sections/HousesBlock";
import { axiosApi } from "@/lib/axios/axios";
import { propertiesData } from "@/common/mocks/datamocks";

export async function HomeScreen(){
  function getProperties(){
    return 
  }

  const data:any = []

    return(    
      <>
      {/* <Navbar /> */}
      <HeroSearch/>
      <HousesBlock properties={data} title="Propiedades a Venda" description="Nossa coletania de casas a venda"/>
      <Hero />
      <HousesBlock properties={data} title="Propiedades para aluguel" description="nossa coletania de casa para aluguel"/>
      <Cta />
      <HowItWorks />
      <ScrollToTop /> 
      
      {/* 
      <Sponsors />
      <About />
      <Features />
      <Team />
      <Services />
      <Testimonials />
      <Pricing />
      <Newsletter />
      */}

    </>
    )
}