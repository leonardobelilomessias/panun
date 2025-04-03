'use client'
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { FeaturesHomeScreen } from "./FeaturesHomeScrre";
import { Studies } from "./Studies";
import { HeroSearch } from "../../components/Hero/HeroSearch";
import { HousesBlock } from "../../components/Sections/HousesBlock";
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
      <HousesBlock properties={data}/>
      <Hero />
      <HousesBlock properties={data}/>
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