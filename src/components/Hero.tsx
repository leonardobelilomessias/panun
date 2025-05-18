import Link from "next/link"
import Image from "next/image"
import Heroflags from "@/public/images/Home/home-section-hero.webp"
import { Building2, ChevronRight, DollarSign, Home, PiggyBank, ShieldCheck } from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      {/* Círculos decorativos */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-primary-palet/5 z-0"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-primary-palet/5 z-0"></div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Coluna de texto */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6 z-10">
            <div className="inline-flex items-center bg-primary-palet/10 text-primary-palet px-4 py-2 rounded-full text-sm font-medium mb-2">
              <DollarSign className="w-4 h-4 mr-2" />
              Soluções financeiras para seu imóvel
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-800">Especialistas em </span>
              <span className="text-primary-palet">Financiamento Imobiliário</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
              Temos os melhores especialistas em financiamento para auxiliar em todo o processo de compra do seu imóvel.
            </p>

            {/* Cards de benefícios */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-primary-palet/10 p-2 rounded-lg">
                  <PiggyBank className="w-5 h-5 text-primary-palet" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-800">Melhores taxas</h3>
                  <p className="text-sm text-gray-500">Condições exclusivas</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-primary-palet/10 p-2 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-primary-palet" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-800">Segurança</h3>
                  <p className="text-sm text-gray-500">Processo garantido</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/entrar"
                className="px-6 py-3.5 bg-primary-palet text-white rounded-lg font-medium shadow-lg shadow-primary-palet/20 hover:bg-primary-palet/90 transition-all flex items-center justify-center group"
              >
                Saber Mais
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/cadastro"
                className="px-6 py-3.5 border-2 border-primary-palet text-primary-palet rounded-lg font-medium hover:bg-primary-palet/5 transition-all flex items-center justify-center"
              >
                Entrar em contato
              </Link>
            </div>
          </div>

          {/* Coluna de imagem */}
          <div className="order-1 lg:order-2 z-10 relative">
            <div className="relative mx-auto max-w-md lg:max-w-full">
              {/* Círculo decorativo atrás da imagem */}
              <div className="absolute inset-0 bg-primary-palet/10 rounded-full transform scale-95 -translate-x-6 translate-y-6"></div>

              {/* Imagem principal */}
              <div className="relative bg-white p-3 rounded-2xl shadow-xl">
                <Image
                  src={Heroflags || "/placeholder.svg"}
                  alt="Casa com financiamento"
                  width={600}
                  height={600}
                  className="rounded-xl w-full h-auto object-cover"
                  priority
                />

                {/* Badge flutuante */}
                <div className="absolute -bottom-6 -left-6 bg-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Aprovação rápida</p>
                    <p className="text-xs text-gray-500">Em até 48 horas</p>
                  </div>
                </div>

                {/* Badge flutuante */}
                <div className="absolute -top-6 -right-6 bg-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
                  <div className="bg-primary-palet p-2 rounded-lg">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">+1000 imóveis</p>
                    <p className="text-xs text-gray-500">Financiados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
