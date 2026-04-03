import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Handshake, Banknote, Wifi, ArrowRight, Users, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function Parceiros() {
  // Dados fictícios de parceiros
  const parceiros = [
    {
      nome: "Construmaq Engenharia",
      setor: "Construção Civil",
      descricao: "Líder em construção sustentável com mais de 30 projetos entregues em Minas Gerais",
      desde: 2012,
      imagem: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=200&auto=format&fit=crop",
    },
    {
      nome: "FinanciaSafe Crédito",
      setor: "Financiamento Imobiliário",
      descricao: "Soluções financeiras personalizadas para aquisição de imóveis",
      desde: 2015,
      imagem: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=200&auto=format&fit=crop",
    },
    {
      nome: "TechCasa Soluções",
      setor: "Tecnologia Imobiliária",
      descricao: "Plataformas inovadoras para gestão e visualização de imóveis",
      desde: 2020,
      imagem: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200&auto=format&fit=crop",
    },
    {
      nome: "DecoraAí Design",
      setor: "Decoração e Arquitetura",
      descricao: "Serviços completos de arquitetura e design de interiores",
      desde: 2018,
      imagem: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=200&auto=format&fit=crop",
    },
    {
      nome: "SeguraTudo Seguros",
      setor: "Seguros Residenciais",
      descricao: "Coberturas completas para proteger seu patrimônio",
      desde: 2016,
      imagem: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=200&auto=format&fit=crop",
    },
    {
      nome: "LegalHouse Advocacia",
      setor: "Direito Imobiliário",
      descricao: "Assessoria jurídica especializada em transações imobiliárias",
      desde: 2014,
      imagem: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=200&auto=format&fit=crop",
    },
  ]

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-[#272525] to-[#00a0bf] text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container mx-auto px-4 text-center relative z-10 space-y-8">
          <Badge
            variant="outline"
            className="text-lg py-2 px-6 border-white text-white font-medium bg-white/10 backdrop-blur-sm"
          >
            <Handshake className="mr-2 h-5 w-5" />
            Parcerias Estratégicas
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">Parcerias que Transformam o Mercado Imobiliário</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Nossa rede de parceiros qualificados garante soluções completas e serviços especializados em todas as etapas
            do processo imobiliário.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="mt-4 font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            Conheça nossos parceiros
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Categorias de Parceiros */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="flex items-center justify-center mb-8">
          <div className="h-1 w-16 bg-[#272525] mr-4"></div>
          <h2 className="text-3xl font-bold text-center">Nossas Áreas de Parceria</h2>
          <div className="h-1 w-16 bg-[#272525] ml-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-t-4 border-t-[#272525] hover:shadow-lg transition-all group">
            <CardHeader className="pb-2">
              <div className="bg-[#272525]/10 p-4 rounded-full w-fit mb-4 group-hover:bg-[#272525]/20 transition-colors">
                <Building className="h-10 w-10 text-[#272525]" />
              </div>
              <CardTitle className="text-[#272525]">Construção Civil</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Construtores e incorporadoras que compartilham nosso compromisso com qualidade e inovação.
              </p>
              <div className="space-y-3">
                <p className="font-medium text-[#272525]">Parceiros Destaque:</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#272525]" />
                    <span>Construmaq Engenharia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#272525]" />
                    <span>UrbanizaBH Construtora</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#272525] hover:shadow-lg transition-all group">
            <CardHeader className="pb-2">
              <div className="bg-[#272525]/10 p-4 rounded-full w-fit mb-4 group-hover:bg-[#272525]/20 transition-colors">
                <Banknote className="h-10 w-10 text-[#272525]" />
              </div>
              <CardTitle className="text-[#272525]">Soluções Financeiras</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Instituições financeiras que oferecem as melhores condições para seu financiamento imobiliário.
              </p>
              <div className="space-y-3">
                <p className="font-medium text-[#272525]">Parceiros Destaque:</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#272525]" />
                    <span>FinanciaSafe Crédito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#272525]" />
                    <span>Banco Seguro</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#272525] hover:shadow-lg transition-all group">
            <CardHeader className="pb-2">
              <div className="bg-[#272525]/10 p-4 rounded-full w-fit mb-4 group-hover:bg-[#272525]/20 transition-colors">
                <Wifi className="h-10 w-10 text-[#272525]" />
              </div>
              <CardTitle className="text-[#272525]">Tecnologia e Inovação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Empresas que desenvolvem as ferramentas que tornam sua experiência imobiliária mais eficiente.
              </p>
              <div className="space-y-3">
                <p className="font-medium text-[#272525]">Parceiros Destaque:</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#272525]" />
                    <span>TechCasa Soluções</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#272525]" />
                    <span>ImobiTech Sistemas</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Destaques */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <div className="h-1 w-16 bg-[#272525] mr-4"></div>
            <h2 className="text-3xl font-bold text-center">Parceiros em Destaque</h2>
            <div className="h-1 w-16 bg-[#272525] ml-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {parceiros.slice(0, 3).map((parceiro, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all group border-0 shadow-md">
                <div className="h-48 relative">
                  <Image
                    src={parceiro.imagem || "/placeholder.svg"}
                    alt={`Logo ${parceiro.nome}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#272525]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <Badge variant="outline" className="border-white text-white mb-2">
                        {parceiro.setor}
                      </Badge>
                      <h3 className="text-xl font-bold">{parceiro.nome}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-[#272525]">{parceiro.nome}</h3>
                    <Badge variant="outline" className="bg-[#272525]/10 text-[#272525] border-[#272525]/20">
                      {parceiro.setor}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{parceiro.descricao}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Parceiros desde:</span>{" "}
                      <span className="font-medium text-[#272525]">{parceiro.desde}</span>
                    </div>
                    <Button variant="outline" size="sm" className="text-[#272525] border-[#272525]/30">
                      Saiba mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de Parceiros */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="flex items-center justify-center mb-8">
          <div className="h-1 w-16 bg-[#272525] mr-4"></div>
          <h2 className="text-3xl font-bold text-center">Todos os Parceiros</h2>
          <div className="h-1 w-16 bg-[#272525] ml-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parceiros.map((parceiro, index) => (
            <Card key={index} className="hover:shadow-lg transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative rounded-lg overflow-hidden w-20 h-20 flex-shrink-0 border-2 border-[#272525]/10">
                    <Image
                      src={parceiro.imagem || "/placeholder.svg"}
                      alt={`Logo ${parceiro.nome}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-[#272525]">{parceiro.nome}</h3>
                    <Badge variant="outline" className="bg-[#272525]/10 text-[#272525] border-[#272525]/20">
                      {parceiro.setor}
                    </Badge>
                    <p className="text-muted-foreground text-sm">{parceiro.descricao}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Parceiros desde:</span>
                      <span className="font-medium text-[#272525]">{parceiro.desde}</span>
                    </div>
                    <Button variant="link" className="px-0 text-[#272525] hover:text-[#006a80] hover:no-underline">
                      Visitar Site
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Parcerias */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-[#272525]/90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 text-center space-y-8 text-white max-w-4xl mx-auto border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold">Quer se tornar um parceiro?</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Junte-se à nossa rede de parceiros estratégicos e amplie suas oportunidades no mercado imobiliário.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="font-medium shadow-lg hover:shadow-xl transition-shadow">
                Saiba Mais
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-[#272525]"
              >
                Enviar Proposta
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios das Parcerias */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="flex items-center justify-center mb-8">
          <div className="h-1 w-16 bg-[#272525] mr-4"></div>
          <h2 className="text-3xl font-bold text-center">Vantagens de Nossas Parcerias</h2>
          <div className="h-1 w-16 bg-[#272525] ml-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center border-0 shadow-md hover:shadow-xl transition-all group">
            <CardContent className="p-8">
              <div className="bg-[#272525]/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 group-hover:bg-[#272525]/20 transition-colors flex items-center justify-center">
                <Handshake className="h-12 w-12 text-[#272525]" />
              </div>
              <h3 className="text-xl font-semibold text-[#272525] mb-3">Oportunidades Exclusivas</h3>
              <p className="text-muted-foreground">
                Acesso prioritário a projetos e negócios em desenvolvimento antes do mercado.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-md hover:shadow-xl transition-all group">
            <CardContent className="p-8">
              <div className="bg-[#272525]/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 group-hover:bg-[#272525]/20 transition-colors flex items-center justify-center">
                <Wifi className="h-12 w-12 text-[#272525]" />
              </div>
              <h3 className="text-xl font-semibold text-[#272525] mb-3">Visibilidade</h3>
              <p className="text-muted-foreground">
                Exposição da sua marca em nossos canais digitais, eventos e material promocional.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-md hover:shadow-xl transition-all group">
            <CardContent className="p-8">
              <div className="bg-[#272525]/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 group-hover:bg-[#272525]/20 transition-colors flex items-center justify-center">
                <Banknote className="h-12 w-12 text-[#272525]" />
              </div>
              <h3 className="text-xl font-semibold text-[#272525] mb-3">Condições Especiais</h3>
              <p className="text-muted-foreground">
                Benefícios financeiros e condições diferenciadas para clientes em comum.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-md hover:shadow-xl transition-all group">
            <CardContent className="p-8">
              <div className="bg-[#272525]/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 group-hover:bg-[#272525]/20 transition-colors flex items-center justify-center">
                <Users className="h-12 w-12 text-[#272525]" />
              </div>
              <h3 className="text-xl font-semibold text-[#272525] mb-3">Networking</h3>
              <p className="text-muted-foreground">
                Conexões estratégicas com outros players do mercado e eventos exclusivos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <div className="h-1 w-16 bg-[#272525] mr-4"></div>
            <h2 className="text-3xl font-bold text-center">O Que Nossos Parceiros Dizem</h2>
            <div className="h-1 w-16 bg-[#272525] ml-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-8 relative">
                <div className="text-[#272525] text-6xl font-serif absolute top-4 left-4 opacity-20">${`"`}</div>
                <p className="text-muted-foreground mb-6 relative z-10">
                  A parceria com a Panun Imobiliária tem sido fundamental para o crescimento da nossa construtora. A
                  sinergia entre nossas empresas resultou em projetos de sucesso e clientes satisfeitos.
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative rounded-full overflow-hidden w-12 h-12">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop"
                      alt="Foto do parceiro"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Roberto Almeida</h4>
                    <p className="text-sm text-muted-foreground">Diretor, Construmaq Engenharia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-8 relative">
                <div className="text-[#272525] text-6xl font-serif absolute top-4 left-4 opacity-20">${`"`}</div>
                <p className="text-muted-foreground mb-6 relative z-10">
                  Nossa parceria com a Panun nos permitiu oferecer soluções financeiras mais adequadas para os clientes.
                  A transparência e profissionalismo da equipe fazem toda a diferença.
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative rounded-full overflow-hidden w-12 h-12">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
                      alt="Foto do parceiro"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Carla Mendonça</h4>
                    <p className="text-sm text-muted-foreground">CEO, FinanciaSafe Crédito</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-8 relative">
                <div className="text-[#272525] text-6xl font-serif absolute top-4 left-4 opacity-20">${`"`}</div>
                <p className="text-muted-foreground mb-6 relative z-10">
                  Como empresa de tecnologia, encontramos na Panun um parceiro que valoriza a inovação e está sempre
                  aberto a implementar novas soluções para melhorar a experiência do cliente.
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative rounded-full overflow-hidden w-12 h-12">
                    <Image
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop"
                      alt="Foto do parceiro"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Marcos Silva</h4>
                    <p className="text-sm text-muted-foreground">Fundador, TechCasa Soluções</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 text-center py-12 space-y-8">
        <h2 className="text-3xl font-bold text-[#272525]">Pronto para fazer parte da nossa rede?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Entre em contato conosco hoje mesmo e descubra como podemos crescer juntos no mercado imobiliário.
        </p>
        <Button size="lg" className="bg-[#272525] hover:bg-[#006a80]">
          Iniciar Parceria
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>
    </div>
  )
}
