import { Button } from "./ui/button"
import { ArrowRight, CheckCircle2, Clock, Headset } from "lucide-react"

export const Cta = () => {
  return (
    <section id="cta" className="relative overflow-hidden py-20 my-24 sm:my-32">
      {/* Background com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-palet/10 to-primary-palet/5 z-0"></div>

      {/* Círculos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-palet/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-palet/10 rounded-full translate-y-1/2 -translate-x-1/3"></div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center bg-primary-palet/20 text-primary-palet px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Headset className="w-4 h-4 mr-2" />
              Assessoria Imobiliária Online
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Tudo Que Você Precisa
              <span className="block mt-2 mb-2">
                <span className="bg-primary-palet text-white px-3 py-1 rounded-lg">Totalmente Online</span>
              </span>
              em um só Lugar
            </h2>

            <p className="text-gray-600 text-lg mt-6 max-w-xl">
              Evite perda de tempo com visitas e atendimentos desnecessários. Na nossa assessoria online e personalizada
              você recebe informações com transparência.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-primary-palet flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-800">Atendimento Personalizado</h3>
                  <p className="text-gray-600">Consultores especializados para cada tipo de imóvel</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-primary-palet flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-800">Documentação Simplificada</h3>
                  <p className="text-gray-600">Todo o processo documental feito digitalmente</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-palet flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-800">Resposta Rápida</h3>
                  <p className="text-gray-600">Retorno em até 24 horas para suas solicitações</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Comece Agora Mesmo</h3>
            <p className="text-gray-600 mb-8">
              Preencha seus dados e um de nossos consultores entrará em contato para uma avaliação personalizada.
            </p>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-palet/20 focus:border-primary-palet transition-colors"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-palet/20 focus:border-primary-palet transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-palet/20 focus:border-primary-palet transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button className="w-full sm:flex-1 bg-primary-palet hover:bg-primary-palet/90 text-white py-6 text-base font-medium group">
                  Quero participar
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-primary-palet text-primary-palet hover:bg-primary-palet/5"
                >
                  Saber Mais
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
