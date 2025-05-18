"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatCurrency2 } from "@/lib/utils"
import { Home, MapPin, Calendar } from "lucide-react"
import { getRecentProperties } from "@/lib/supabase/queries/client/dashboard/getRecentProperties"
import { Property } from "@/types/typesPropeties"

interface RecentPropertiesProps {
  title: string
  purpose: "Venda" | "Aluguel"
}

export function RecentProperties({ title, purpose }: RecentPropertiesProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        const result = await getRecentProperties(purpose)
        
        if (result.error) {
          setError(result.error)
          return
        }
        
        setProperties(result.properties)
      } catch (err) {
        console.error("Erro ao carregar imóveis:", err)
        setError(`Erro ao carregar imóveis para ${purpose.toLowerCase()}`)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [purpose])

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).format(date)
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Últimos imóveis para {purpose.toLowerCase()} adicionados</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          // Skeleton loading
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-2 border rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div className="w-2/3">
                  <div className="h-5 w-full bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-20 bg-muted rounded animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-28 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum imóvel para {purpose.toLowerCase()} encontrado.
          </div>
        ) : (
          properties.map((property) => (
            <div key={property.id} className="flex flex-col space-y-2 border rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{property.details[0].title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span>
                      {property.cities.name}, {property.cities.name}
                    </span>
                  </div>
                </div>
                <Badge variant={property.status === "Disponível" ? "default" : "secondary"}>
                  {property.status}
                </Badge>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">
                    {formatCurrency2(String(property?.financeiro[0]?.price))}
                    {purpose === "Aluguel" && <span className="text-sm font-normal">/mês</span>}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {property?.details[0]?.bedroom && (
                      <span className="flex items-center">
                        <Home className="mr-1 h-3 w-3" />
                        {property?.details[0].bedroom} quartos
                      </span>
                    )}
                    {property?.details[0].total_area && <span>{property?.details[0].total_area}m²</span>}
                  </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>Adicionado em {formatDate(property.created_at)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}