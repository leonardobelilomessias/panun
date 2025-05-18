"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchCities, fetchEstates, fetchNeighborhoods } from "@/lib/supabase/queries/client/locations"
import { Search } from "lucide-react"

interface HouseSearchFilterProps {
  initialCategoria?: string
  initialTipo?: string
  initialCidade?: string
  initialBairro?: string
}

export function HouseSearchFilter({
  initialCategoria = "",
  initialTipo = "",
  initialCidade = "",
  initialBairro = "",
}: HouseSearchFilterProps) {
  const router = useRouter()

  const [categoria, setCategoria] = useState(initialCategoria || "all")
  const [tipo, setTipo] = useState(initialTipo || "all")
  const [cidade, setCidade] = useState(initialCidade || "all")
  const [bairro, setBairro] = useState(initialBairro || "all")
  const [estado, setEstado] = useState("all")

  const [estados, setEstados] = useState<any[]>([])
  const [cidades, setCidades] = useState<any[]>([])
  const [bairros, setBairros] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCities, setIsLoadingCities] = useState(false)
  const [isLoadingNeighborhoods, setIsLoadingNeighborhoods] = useState(false)

  const tiposImoveis = ["Casa", "Apartamento", "Lote", "Loja"]

  // Carregar estados ao montar o componente
  useEffect(() => {
    async function loadEstates() {
      try {
        const estatesData = await fetchEstates()
        setEstados(estatesData)
      } catch (error) {
        console.error("Erro ao carregar estados:", error)
      }
    }

    loadEstates()
  }, [])

  // Carregar cidades quando o estado mudar
  useEffect(() => {
    async function loadCities() {
      setIsLoadingCities(true)
      try {
        // Se estado for "all", buscar todas as cidades
        // Caso contrário, buscar cidades do estado selecionado
        const citiesData = await fetchCities(estado !== "all" ? estado : undefined)
        setCidades(citiesData)
      } catch (error) {
        console.error("Erro ao carregar cidades:", error)
      } finally {
        setIsLoadingCities(false)
      }
    }

    loadCities()
  }, [estado])

  // Carregar bairros quando a cidade mudar
  useEffect(() => {
    async function loadNeighborhoods() {
      if (cidade === "all") {
        setBairros([])
        return
      }

      setIsLoadingNeighborhoods(true)
      try {
        const neighborhoodsData = await fetchNeighborhoods(cidade)
        setBairros(neighborhoodsData)
      } catch (error) {
        console.error("Erro ao carregar bairros:", error)
      } finally {
        setIsLoadingNeighborhoods(false)
      }
    }

    loadNeighborhoods()
  }, [cidade])

  // Inicializar os valores dos filtros com os parâmetros da URL
  useEffect(() => {
    setCategoria(initialCategoria || "all")
    setTipo(initialTipo || "all")
    setCidade(initialCidade || "all")
    setBairro(initialBairro || "all")
  }, [initialCategoria, initialTipo, initialCidade, initialBairro])

  const handleSearch = () => {
    setIsLoading(true)

    // Construir a URL com os parâmetros selecionados
    const params = new URLSearchParams()

    if (categoria && categoria !== "all") params.set("categoria", categoria)
    if (tipo && tipo !== "all") params.set("tipo", tipo)
    if (cidade && cidade !== "all") params.set("cidade", cidade)
    if (bairro && bairro !== "all") params.set("bairro", bairro)

    // Navegar para a URL com os parâmetros
    router.push(`/imoveis?${params.toString()}`)

    setIsLoading(false)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <Select value={categoria} onValueChange={setCategoria}>
            <SelectTrigger>
              <SelectValue placeholder="Comprar ou Alugar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="comprar">Comprar</SelectItem>
              <SelectItem value="alugar">Alugar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Imóvel</label>
          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {tiposImoveis.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <Select
            value={estado}
            onValueChange={(value) => {
              setEstado(value)
              setCidade("all") // Resetar cidade quando o estado mudar
              setBairro("all") // Resetar bairro quando o estado mudar
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {estados.map((estado) => (
                <SelectItem key={estado.id} value={estado.id}>
                  {estado.name} ({estado.uf})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
          <Select
            value={cidade}
            onValueChange={(value) => {
              setCidade(value)
              setBairro("all") // Resetar bairro quando a cidade mudar
            }}
            disabled={isLoadingCities}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  isLoadingCities ? "Carregando..." : estado !== "all" ? "Selecione a cidade" : "Todas as cidades"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {cidades.map((cidade) => (
                <SelectItem key={cidade.id} value={cidade.name}>
                  {cidade.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
          <Select value={bairro} onValueChange={setBairro} disabled={cidade === "all" || isLoadingNeighborhoods}>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  isLoadingNeighborhoods
                    ? "Carregando..."
                    : cidade !== "all"
                      ? "Selecione o bairro"
                      : "Selecione uma cidade primeiro"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {bairros.map((bairro) => (
                <SelectItem key={bairro.id} value={bairro.name}>
                  {bairro.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={handleSearch} disabled={isLoading} className="bg-primary-palet hover:bg-primary-palet/90">
          <Search className="mr-2 h-4 w-4" />
          Buscar Imóveis
        </Button>
      </div>
    </div>
  )
}
