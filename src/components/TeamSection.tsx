import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  contact: {
    email: string
    phone: string
  }
  social: {
    linkedin?: string
    instagram?: string
    facebook?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ricardo Oliveira",
    role: "Especialista em Financiamento",
    bio: "Com mais de 15 anos de experiência no mercado imobiliário, Ricardo já ajudou centenas de famílias a conquistarem o sonho da casa própria com as melhores condições de financiamento.",
    image: "https://i.pravatar.cc/400?img=69",
    contact: {
      email: "ricardo@panun.com",
      phone: "(31) 99999-9999",
    },
    social: {
      linkedin: "https://linkedin.com/in/ricardo",
      instagram: "https://instagram.com/ricardo",
    },
  },
  {
    id: 2,
    name: "Amanda Santos",
    role: "Consultora Imobiliária",
    bio: "Especialista em encontrar o imóvel perfeito para cada perfil de cliente. Amanda tem um olhar apurado para detalhes e conhece profundamente o mercado imobiliário da região.",
    image: "https://i.pravatar.cc/400?img=25",
    contact: {
      email: "amanda@panun.com",
      phone: "(31) 99999-8888",
    },
    social: {
      linkedin: "https://linkedin.com/in/amanda",
      instagram: "https://instagram.com/amanda",
      facebook: "https://facebook.com/amanda",
    },
  },
  {
    id: 3,
    name: "Marcelo Costa",
    role: "Analista Financeiro",
    bio: "Especializado em análise de crédito e condições financeiras, Marcelo trabalha para garantir as melhores taxas e condições para cada cliente, considerando seu perfil e necessidades.",
    image: "https://i.pravatar.cc/400?img=57",
    contact: {
      email: "marcelo@panun.com",
      phone: "(31) 99999-7777",
    },
    social: {
      linkedin: "https://linkedin.com/in/marcelo",
    },
  },
  {
    id: 4,
    name: "Juliana Mendes",
    role: "Especialista em Documentação",
    bio: "Juliana cuida de toda a parte burocrática do processo, garantindo que a documentação esteja completa e correta para agilizar a aprovação do seu financiamento.",
    image: "https://i.pravatar.cc/400?img=44",
    contact: {
      email: "juliana@panun.com",
      phone: "(31) 99999-6666",
    },
    social: {
      instagram: "https://instagram.com/juliana",
      facebook: "https://facebook.com/juliana",
    },
  },
]

export const TeamSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center bg-primary-palet/10 text-primary-palet px-4 py-2 rounded-full text-sm font-medium mb-4">
            Nossa Equipe
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Conheça nossos <span className="text-primary-palet">especialistas</span>
          </h2>

          <p className="text-lg text-gray-600">
            Profissionais dedicados a tornar sua experiência de compra ou financiamento a melhor possível
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-primary-palet/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                  <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-white/90 mb-4">{member.role}</p>
                  <div className="flex space-x-3">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                      >
                        <Instagram className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {member.social.facebook && (
                      <a
                        href={member.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                      >
                        <Facebook className="w-5 h-5 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-1">{member.name}</h3>
                <p className="text-primary-palet font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>

                <div className="flex flex-col space-y-2">
                  <a
                    href={`mailto:${member.contact.email}`}
                    className="flex items-center text-gray-600 hover:text-primary-palet transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{member.contact.email}</span>
                  </a>
                  <a
                    href={`tel:${member.contact.phone}`}
                    className="flex items-center text-gray-600 hover:text-primary-palet transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{member.contact.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/equipe"
            className="inline-flex items-center text-primary-palet font-medium hover:underline transition-colors"
          >
            Conheça toda nossa equipe
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
