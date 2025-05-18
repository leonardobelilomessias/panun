import {
  Mail,
  Phone,
  Share2,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Clock,
  ArrowRight,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import imageLogo from "@/public/images/Home/logo_white_full.svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function ContactScreen() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left section - Background and Logo */}
      <div className="bg-primary-palet lg:w-2/5 relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-palet to-primary-palet/80 z-10" />

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 10 + 2}rem`,
                  height: `${Math.random() * 10 + 2}rem`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.6,
                }}
              />
            ))}
          </div>
        </div>

        {/* Centered logo and content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-4/5 max-w-md px-8">
            <Image src={imageLogo || "/placeholder.svg"} alt="Panun Imobiliária" className="w-full h-auto" priority />
            <p className="text-white text-xl mt-8 text-center font-light leading-relaxed">
              Transformando sonhos em endereços desde 2010
            </p>

            {/* Address block with glass effect */}
            <div className="mt-16 bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl">
              <div className="flex items-start gap-4 text-white">
                <MapPin className="mt-1 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-xl">Escritório Central</h3>
                  <p className="opacity-90 mt-2 text-lg">
                    Av. Afonso Pena, 1500
                    <br />
                    Centro, Belo Horizonte - MG
                    <br />
                    CEP: 30130-921
                  </p>

                  <div className="flex items-center gap-3 mt-6 text-white/90">
                    <Clock className="h-5 w-5" />
                    <p className="text-sm">Segunda a Sexta: 9h às 18h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section - Content and Form */}
      <div className="lg:w-3/5 flex flex-col p-6 lg:p-0 min-h-screen">
        {/* Mobile logo */}
        <div className="flex justify-center my-6 lg:hidden">
          <div className="bg-primary-palet p-4 rounded-xl shadow-lg">
            <Image
              src={imageLogo || "/placeholder.svg"}
              width={180}
              height={70}
              alt="Panun Imobiliária"
              className="h-12 w-auto"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col px-4 lg:px-16 py-8 lg:py-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Fale <span className="text-primary-palet">Conosco</span>
            </h1>
            <p className="text-gray-600 mt-4 text-lg max-w-xl">
              Estamos à disposição para atender você. Entre em contato pelos canais abaixo ou preencha o formulário.
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-primary-palet/30 group">
              <div className="w-16 h-16 rounded-full bg-primary-palet/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-palet/20 transition-colors">
                <Mail size={28} className="text-primary-palet" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Email</h3>
              <Link href="mailto:contato@panun.com" className="text-primary-palet hover:underline transition-colors">
                contato@panun.com
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-primary-palet/30 group">
              <div className="w-16 h-16 rounded-full bg-primary-palet/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-palet/20 transition-colors">
                <Phone size={28} className="text-primary-palet" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Telefone</h3>
              <Link href="tel:+553199999999" className="text-primary-palet hover:underline transition-colors block">
                (31) 9999-9999
              </Link>
              <Link
                href="tel:+553199999999"
                className="text-primary-palet hover:underline transition-colors block mt-1"
              >
                (31) 9999-9999
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-primary-palet/30 group">
              <div className="w-16 h-16 rounded-full bg-primary-palet/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-palet/20 transition-colors">
                <Share2 size={28} className="text-primary-palet" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Redes Sociais</h3>
              <div className="flex justify-center gap-5 mt-3">
                <Link
                  href="https://instagram.com/panun"
                  className="text-gray-500 hover:text-primary-palet transition-colors"
                >
                  <Instagram size={24} />
                </Link>
                <Link
                  href="https://facebook.com/panun"
                  className="text-gray-500 hover:text-primary-palet transition-colors"
                >
                  <Facebook size={24} />
                </Link>
                <Link
                  href="https://linkedin.com/company/panun"
                  className="text-gray-500 hover:text-primary-palet transition-colors"
                >
                  <Linkedin size={24} />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-palet/10 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-primary-palet" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Envie uma mensagem</h2>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome completo
                  </label>
                  <Input
                    id="name"
                    placeholder="Digite seu nome"
                    className="w-full border-gray-300 focus:border-primary-palet focus:ring focus:ring-primary-palet/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full border-gray-300 focus:border-primary-palet focus:ring focus:ring-primary-palet/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  className="w-full border-gray-300 focus:border-primary-palet focus:ring focus:ring-primary-palet/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Assunto
                </label>
                <Input
                  id="subject"
                  placeholder="Do que se trata sua mensagem?"
                  className="w-full border-gray-300 focus:border-primary-palet focus:ring focus:ring-primary-palet/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  placeholder="Como podemos ajudar?"
                  className="w-full min-h-32 border-gray-300 focus:border-primary-palet focus:ring focus:ring-primary-palet/20 transition-all"
                />
              </div>

              <Button className="w-full bg-primary-palet hover:bg-primary-palet/90 text-white py-6 text-lg font-medium transition-all group">
                Enviar mensagem
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Mobile address block */}
          <div className="lg:hidden bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 text-primary-palet" />
              <div>
                <h3 className="font-medium text-lg text-gray-800">Escritório Central</h3>
                <p className="text-gray-600 mt-1">
                  Av. Afonso Pena, 1500
                  <br />
                  Centro, Belo Horizonte - MG
                  <br />
                  CEP: 30130-921
                </p>
                <div className="flex items-center gap-2 mt-3 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <p className="text-sm">Segunda a Sexta: 9h às 18h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-auto pt-6 border-t border-gray-200">
            © {new Date().getFullYear()} Panun Imobiliária. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  )
}
