
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
import { listSalesProperties } from "@/lib/supabase/queries/client/properties/listSalesProperties";
import { listRentProperties } from "@/lib/supabase/queries/client/properties/listRentProperties";
import { PropertySingle } from "@/types/typesPropeties";
import { listSalesPropertiesPublic } from "@/lib/supabase/queries/client/properties/listSalesPropertiesPublic";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TeamSection } from "@/components/TeamSection";
import { FaqSection } from "@/components/FaqSection";

export async function HomeScreen() {
  const listSales = await listSalesProperties()
  console.log("lista de propriedades component home", listSales)
  const listRent = await listRentProperties()

  const changeData = listSales?.map((property: any) => {
    const details = property.details?.[0] || {}
    const financeiro = property.financeiro?.[0] || {}
    const cover = property.property_covers?.[0]?.url || ""

    return {
      id: property.id,
      price: financeiro.price,
      title: details.title,
      description: details.shot_description,
      status: details.status,
      type: details.type,
      totalArea: details.total_area,
      usableArea: details.usable_area,
      bedrooms: details.bedroom,
      bathrooms: details.bathroom,
      suites: details.suites,
      garageSpaces: details.garage,
      floor: details.flor,
      furnished: details.furnished,
      gallery: cover,
      cover: cover,
      neighborhood: property?.neighborhoods?.name || "",
      city: property?.cities?.name || "",
      propurse: property.purpose,
    }
  }) || []

  const changeDataRent = listRent?.map((property: PropertySingle) => {
    const details = property.details?.[0] || {}
    const financeiro = property.financeiro?.[0] || {}
    const cover = property.property_covers?.[0]?.url || ""

    return {
      id: property.id,
      price: financeiro.price,
      title: details.title,
      description: details.shot_description,
      status: details.status,
      type: details.type,
      totalArea: details.total_area,
      usableArea: details.usable_area,
      bedrooms: details.bedroom,
      bathrooms: details.bathroom,
      suites: details.suites,
      garageSpaces: details.garage,
      floor: details.flor,
      furnished: details.furnished,
      gallery: cover,
      cover: cover,
      neighborhood: property?.neighborhoods?.name || "",
      city: property?.cities?.name || "",
      propurse: property.purpose,
    }
  }) || []

  return (
    <>
      <HeroSearch />
      <HousesBlock
        properties={changeData}
        title="Propriedades à Venda"
        description="Nossa coletânea de casas à venda"
      />
      <Hero />

      <HousesBlock
        properties={changeDataRent}
        title="Propriedades para Aluguel"
        description="Nossa coletânea de casas para aluguel"
      />
      <TestimonialsSection/>
      <TeamSection/>
      <HowItWorks />
      <Cta />
      <FaqSection/>
      <ScrollToTop />
    </>
  )
}
