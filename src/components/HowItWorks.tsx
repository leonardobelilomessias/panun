import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons"
import type React from "react" // Import React to declare JSX.Element

interface FeatureProps {
  icon: React.JSX.Element
  title: string
  description: string
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Imóveis Selecionados",
    description: "Salve seus imóveis favoritos e receba atualizações com base no seu perfil de busca.",
  },
  {
    icon: <MapIcon />,
    title: "Localização Estratégica",
    description: "Informações completas sobre bairros e regiões para te ajudar na escolha do imóvel ideal.",
  },
  {
    icon: <PlaneIcon />,
    title: "Novos Lançamentos",
    description: "Fique por dentro dos empreendimentos recém-lançados e aproveite oportunidades exclusivas.",
  },
  {
    icon: <GiftIcon />,
    title: "Ofertas e Condições",
    description: "Receba alertas de promoções, descontos especiais e condições facilitadas para compra ou aluguel.",
  },
]

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-palet/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-palet/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center bg-primary-palet/10 text-primary-palet px-4 py-2 rounded-full text-sm font-medium mb-4">
            Recursos exclusivos
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Facilitamos <span className="text-primary-palet">sua</span> jornada no mercado imobiliário
          </h2>

          <p className="text-lg text-gray-600 mx-auto">
            Conte com nossos recursos para encontrar o imóvel ideal, com acesso a informações confiáveis, suporte especializado
            e uma plataforma pensada para facilitar sua decisão de compra ou aluguel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }: FeatureProps, index) => (
            <Card
              key={title}
              className="bg-white border border-gray-100 hover:border-primary-palet/30 hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-palet to-primary-palet/70"></div>

              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-palet/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary-palet/10 transition-colors duration-300"></div>

              <CardHeader className="pt-8 pb-2">
                <CardTitle className="flex flex-col items-center gap-4">
                  <div className="p-3 bg-primary-palet/10 rounded-xl group-hover:bg-primary-palet/20 transition-colors duration-300">
                    <div className="text-primary-palet w-8 h-8">{icon}</div>
                  </div>
                  <p className="text-xl font-bold text-gray-800 group-hover:text-primary-palet transition-colors duration-300">
                    {title}
                  </p>
                </CardTitle>
              </CardHeader>

              <CardContent className="text-gray-600 pb-8">{description}</CardContent>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-palet/0 via-primary-palet/30 to-primary-palet/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-primary-palet/10 text-primary-palet font-bold">
                {index + 1}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#saibaMais" className="inline-flex items-center text-primary-palet font-medium hover:underline">
            Saiba mais sobre nossos recursos
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
