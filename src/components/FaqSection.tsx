"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Button } from "./ui/button"

interface FaqItem {
  question: string
  answer: string
  category: string
}

const faqItems: FaqItem[] = [
  {
    question: "Quais documentos são necessários para iniciar um financiamento imobiliário?",
    answer:
      "Para iniciar um financiamento imobiliário, você precisará de documentos pessoais (RG, CPF, comprovante de residência, certidão de estado civil), documentos de renda (holerites, declaração de IR, extratos bancários) e documentos do imóvel (matrícula atualizada, IPTU). Nossa equipe irá orientá-lo sobre documentos específicos conforme seu caso.",
    category: "Financiamento",
  },
  {
    question: "Qual é o valor mínimo de entrada para financiar um imóvel?",
    answer:
      "O valor mínimo de entrada varia conforme a instituição financeira e o tipo de financiamento, mas geralmente fica entre 20% e 30% do valor do imóvel. Em alguns casos especiais, como financiamentos pelo programa Casa Verde e Amarela, esse percentual pode ser menor. Podemos analisar seu caso e encontrar a melhor opção.",
    category: "Financiamento",
  },
  {
    question: "Quanto tempo leva para aprovar um financiamento imobiliário?",
    answer:
      "O tempo médio para aprovação de um financiamento imobiliário é de 30 a 45 dias, desde a entrega de toda a documentação até a liberação do crédito. Com nossa assessoria especializada, conseguimos agilizar esse processo, identificando previamente possíveis pendências e orientando sobre a documentação correta.",
    category: "Financiamento",
  },
  {
    question: "Posso financiar um imóvel usado?",
    answer:
      "Sim, é possível financiar imóveis usados. A maioria dos bancos oferece linhas de crédito tanto para imóveis novos quanto usados. No entanto, o imóvel precisa estar em boas condições e ter documentação regularizada. Alguns bancos podem solicitar uma avaliação do imóvel antes de aprovar o financiamento.",
    category: "Imóveis",
  },
  {
    question: "É possível usar o FGTS para comprar um imóvel?",
    answer:
      "Sim, é possível usar o FGTS para comprar um imóvel, desde que você atenda a alguns requisitos: ter pelo menos 3 anos de trabalho sob o regime do FGTS (consecutivos ou não), não possuir financiamento ativo no SFH, não ser proprietário de outro imóvel na mesma cidade, entre outros. Nossa equipe pode verificar se você se enquadra nas condições.",
    category: "Financiamento",
  },
  {
    question: "Quais são as taxas de juros praticadas atualmente?",
    answer:
      "As taxas de juros para financiamento imobiliário variam conforme o banco, o tipo de imóvel e o perfil do cliente. Atualmente, as taxas estão entre 7% e 11% ao ano, podendo ser prefixadas ou pós-fixadas (indexadas à TR ou IPCA). Trabalhamos com diversos bancos para encontrar a melhor taxa para o seu perfil.",
    category: "Financiamento",
  },
]

export const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const filterByCategory = (category: string | null) => {
    setActiveCategory(category)
    setActiveIndex(null)
  }

  const categories = Array.from(new Set(faqItems.map((item) => item.category)))
  const filteredItems = activeCategory ? faqItems.filter((item) => item.category === activeCategory) : faqItems

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center bg-primary-palet/10 text-primary-palet px-4 py-2 rounded-full text-sm font-medium mb-4">
            Dúvidas Frequentes
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Respostas para suas <span className="text-primary-palet">principais dúvidas</span>
          </h2>

          <p className="text-lg text-gray-600">
            Encontre informações sobre financiamento imobiliário e o processo de compra
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            onClick={() => filterByCategory(null)}
            variant={activeCategory === null ? "default" : "outline"}
            className={activeCategory === null ? "bg-primary-palet" : ""}
          >
            Todas
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => filterByCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={activeCategory === category ? "bg-primary-palet" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden hover:border-primary-palet/30 transition-colors"
            >
              <button
                className="w-full flex items-center justify-between p-5 bg-white text-left"
                onClick={() => toggleQuestion(index)}
              >
                <div className="flex items-start">
                  <HelpCircle className="w-5 h-5 text-primary-palet mr-3 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">{item.question}</span>
                </div>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary-palet" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {activeIndex === index && (
                <div className="p-5 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-primary-palet/5 p-6 rounded-xl max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ainda tem dúvidas?</h3>
          <p className="text-gray-600 mb-4">
            Nossa equipe está pronta para esclarecer qualquer dúvida sobre financiamento imobiliário
          </p>
          <Button className="bg-primary-palet hover:bg-primary-palet/90 text-white">Fale Conosco</Button>
        </div>
      </div>
    </section>
  )
}
