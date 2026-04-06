import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mail, Phone, ArrowRight, Building2, Users, Clock, Award } from "lucide-react"
import Image from "next/image"
import AlanPhoto from "@/public/images/profile/team/alan.jpeg"
import LeoPhoto from "@/public/images/profile/team/leo.jpeg"
import Renataphoto from "@/public/images/profile/team/renata.jpeg"

export default function Sobre() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-gradient-to-r from-[#272525] to-[#00a0bf] text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Transformando sonhos em endereços desde 2010</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            A Panun Imobiliária une experiência de mercado, atendimento personalizado e segurança jurídica para oferecer
            a melhor experiência em negócios imobiliários em Minas Gerais e Santa Catarina.
          </p>
          <Button size="lg" variant="secondary" className="font-medium">
            Fale com um especialista
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Nossa História */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <div className="h-1 w-16 bg-[#272525] mr-4"></div>
          <h2 className="text-3xl font-bold text-center">Nossa História</h2>
          <div className="h-1 w-16 bg-[#272525] ml-4"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              A Panun Imobiliária nasceu em 2010 em Belo Horizonte, fruto da visão empreendedora de profissionais
              apaixonados pelo mercado imobiliário e comprometidos com a excelência no atendimento.
            </p>
            <p className="text-lg leading-relaxed">
              Ao longo dos anos, expandimos nossa atuação para Santa Catarina, levando nosso know-how e compromisso com
              a qualidade para novas regiões, sempre mantendo nossa essência de atendimento personalizado e foco nas
              necessidades específicas de cada cliente.
            </p>
            <p className="text-lg leading-relaxed">
              Hoje, somos reconhecidos pela capacidade de unir tecnologia de ponta, conhecimento profundo do mercado e
              um time de especialistas dedicados a transformar a experiência de comprar, vender ou alugar um imóvel em
              algo simples, seguro e satisfatório.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl h-[500px] relative">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=600')] bg-cover bg-center transform transition-transform duration-700 hover:scale-105" />
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <div className="h-1 w-16 bg-[#272525] mr-4"></div>
            <h2 className="text-3xl font-bold text-center">Nossos Diferenciais</h2>
            <div className="h-1 w-16 bg-[#272525] ml-4"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-t-4 border-t-[#272525] hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Building2 className="h-12 w-12 text-[#272525] mb-4" />
                <h3 className="text-xl font-bold mb-2">Portfólio Exclusivo</h3>
                <p className="text-muted-foreground">
                  Acesso a imóveis selecionados e oportunidades exclusivas em localizações privilegiadas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#272525] hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-[#272525] mb-4" />
                <h3 className="text-xl font-bold mb-2">Atendimento Personalizado</h3>
                <p className="text-muted-foreground">
                  Consultores dedicados que entendem suas necessidades e encontram a solução ideal.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#272525] hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-[#272525] mb-4" />
                <h3 className="text-xl font-bold mb-2">Agilidade</h3>
                <p className="text-muted-foreground">
                  Processos otimizados para garantir negociações rápidas e eficientes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-[#272525] hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-[#272525] mb-4" />
                <h3 className="text-xl font-bold mb-2">Segurança Jurídica</h3>
                <p className="text-muted-foreground">Assessoria jurídica completa em todas as etapas da negociação.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <div className="h-1 w-16 bg-[#272525] mr-4"></div>
            <h2 className="text-3xl font-bold text-center">Missão, Visão e Valores</h2>
            <div className="h-1 w-16 bg-[#272525] ml-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-[#272525]/10 pb-4">
                <CardTitle className="text-[#272525] flex items-center">
                  <span className="bg-[#272525] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    1
                  </span>
                  Missão
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Proporcionar experiências imobiliárias transformadoras, conectando pessoas a espaços que atendam suas
                  necessidades e realizem seus sonhos, com segurança, transparência e excelência.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-[#272525]/10 pb-4">
                <CardTitle className="text-[#272525] flex items-center">
                  <span className="bg-[#272525] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    2
                  </span>
                  Visão
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Ser reconhecida como referência em soluções imobiliárias personalizadas em Minas Gerais e Santa
                  Catarina, expandindo continuamente nosso alcance e mantendo a excelência em cada interação.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-[#272525]/10 pb-4">
                <CardTitle className="text-[#272525] flex items-center">
                  <span className="bg-[#272525] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                    3
                  </span>
                  Valores
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-[#272525] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                      •
                    </span>
                    <span>
                      <strong className="text-[#272525]">Personalização:</strong> Cada cliente é único, assim como suas
                      necessidades.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#272525] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                      •
                    </span>
                    <span>
                      <strong className="text-[#272525]">Transparência:</strong> Clareza em todas as etapas do processo.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#272525] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                      •
                    </span>
                    <span>
                      <strong className="text-[#272525]">Excelência:</strong> Compromisso com a qualidade em cada
                      detalhe.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#272525] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                      •
                    </span>
                    <span>
                      <strong className="text-[#272525]">Inovação:</strong> Busca constante por soluções criativas e
                      eficientes.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
{/* Equipe */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <div className="h-1 w-16 bg-[#272525] mr-4"></div>
          <h2 className="text-3xl font-bold text-center">Nossa Equipe</h2>
          <div className="h-1 w-16 bg-[#272525] ml-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Ricardo Oliveira",
              role: "Especialista em Financiamento",
              desc: "Com mais de 15 anos de experiência no mercado imobiliário, Ricardo já ajudou centenas de famílias a conquistarem o sonho da casa própria.",
              image: "https://i.pravatar.cc/400?img=69",
            },
            {
              name: "Alan Nunes",
              role: "Consultor Imobiliário",
              desc: "Especialista em encontrar o imóvel perfeito para cada perfil de cliente, com olhar apurado para detalhes e conhecimento profundo do mercado.",
              image: AlanPhoto.src,
            },
            {
              name: "Leonardo Belilo",
              role: "Marketing e Vendas",
              desc: "Especializado em Marketing e vendas, trabalha para garantir as melhores estratégias considerando cada cenário e necessidade.",
              image: LeoPhoto.src,
            },
            {
              name: "Renata Carvalho",
              role: "Especialista em Processos Gerenciais",
              desc: "Especialista em processos gerenciais, garante eficiência e qualidade em todas as etapas do processo.",
              image: Renataphoto.src,
            },
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all group">
              <CardContent className="p-0">
                <div className="h-64 bg-slate-200 relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#272525] to-transparent h-1/2" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#272525]">{member.name}</h3>
                  <p className="text-sm font-medium text-[#272525]/70 mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" className="border-[#272525] text-[#272525] hover:bg-[#272525] hover:text-white">
            Conheça toda a equipe
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      {/* Formulário de Contato */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <div className="h-1 w-16 bg-[#272525] mr-4"></div>
            <h2 className="text-3xl font-bold text-center">Entre em Contato</h2>
            <div className="h-1 w-16 bg-[#272525] ml-4"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#272525] p-3 rounded-full text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#272525]">Sede em Belo Horizonte</h3>
                  <p className="text-muted-foreground">
                    Av. Afonso Pena, 1500 - Centro, Belo Horizonte - MG, 30130-921
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#272525] p-3 rounded-full text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#272525]">Filial em Florianópolis</h3>
                  <p className="text-muted-foreground">
                    Av. Beira Mar Norte, 2000 - Centro, Florianópolis - SC, 88020-300
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#272525] p-3 rounded-full text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#272525]">Telefones</h3>
                  <p className="text-muted-foreground">(31) 3333-4444 | (48) 5555-6666</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#272525] p-3 rounded-full text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#272525]">E-mail</h3>
                  <p className="text-muted-foreground">contato@panunimobiliaria.com.br</p>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden border-0 shadow-lg">
              <CardHeader className="bg-[#272525] text-white">
                <CardTitle>Envie sua mensagem</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#272525]">
                      Nome completo
                    </Label>
                    <Input id="name" required className="border-[#272525]/20 focus-visible:ring-[#272525]" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#272525]">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="border-[#272525]/20 focus-visible:ring-[#272525]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#272525]">
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      className="border-[#272525]/20 focus-visible:ring-[#272525]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#272525]">
                      Mensagem
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      required
                      className="border-[#272525]/20 focus-visible:ring-[#272525]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#272525] hover:bg-[#006a80] text-white">
                    Enviar mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[#272525] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar seus sonhos imobiliários em realidade?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Nossa equipe está preparada para encontrar o imóvel perfeito para você ou para ajudar a vender seu imóvel
            pelo melhor valor.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Button variant="secondary" size="lg" className="font-medium">
              Fale com um especialista
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-[#272525]">
              Ver imóveis disponíveis
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
