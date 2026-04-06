import { Star } from 'lucide-react'
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
  property: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Silva",
    role: "Comprou apartamento em Belo Horizonte",
    content:
      "O processo de financiamento foi muito mais simples do que eu imaginava. A equipe me orientou em cada etapa e consegui taxas excelentes. Recomendo a todos que estão pensando em comprar um imóvel.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=11",
    property: "Apartamento - Savassi",
  },
  {
    id: 2,
    name: "Mariana Costa",
    role: "Comprou casa em Contagem",
    content:
      "Já tinha tentado financiamento em outros lugares, mas só aqui consegui aprovação rápida e condições que cabiam no meu orçamento. O atendimento online facilitou muito, pois pude resolver tudo sem sair de casa.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=47",
    property: "Casa - Eldorado",
  },
  {
    id: 3,
    name: "Roberto Almeida",
    role: "Comprou imóvel comercial",
    content:
      "Como empresário, precisava de um financiamento para meu novo escritório. A assessoria especializada fez toda diferença, entendendo exatamente o que eu precisava e oferecendo as melhores opções do mercado.",
    rating: 4,
    image: "https://i.pravatar.cc/100?img=52",
    property: "Sala Comercial - Centro",
  },
]

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center bg-primary-palet/10 text-primary-palet px-4 py-2 rounded-full text-sm font-medium mb-4">
            Clientes Satisfeitos
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            O que nossos clientes <span className="text-primary-palet">dizem sobre nós</span>
          </h2>

          <p className="text-lg text-gray-600">
            Histórias reais de pessoas que realizaram o sonho da casa própria com nossa ajuda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-8 relative hover:shadow-xl transition-shadow"
            >
              <div className="absolute top-0 right-0 bg-primary-palet text-white rounded-bl-xl rounded-tr-xl py-2 px-4 text-sm font-medium">
                {testimonial.property}
              </div>

              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary-palet/20">
                  <Image 
                    src={testimonial.image || "/placeholder.svg"} 
                    alt={testimonial.name} 
                    width={64}
                    height={64}
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-gray-600 italic relative">
                <span className="text-primary-palet text-4xl absolute -top-2 -left-1 opacity-20">&ldquo;</span>
                {testimonial.content}
                <span className="text-primary-palet text-4xl absolute -bottom-6 -right-1 opacity-20">&rdquo;</span>
              </blockquote>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#verMais"
            className="inline-flex items-center text-primary-palet font-medium hover:underline transition-colors"
          >
            Ver mais depoimentos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
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