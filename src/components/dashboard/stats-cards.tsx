"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStatsDashboard } from "@/lib/supabase/queries/client/dashboard/getStatsDashboard"
import { Users, Home, Building2, UserCheck, TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

interface StatsData {
  totalClients: number
  totalAgents: number
  totalOwners: number
  totalProperties: number
}

export function StatsCards() {
  const [stats, setStats] = useState<StatsData>({
    totalClients: 0,
    totalAgents: 0,
    totalOwners: 0,
    totalProperties: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await getStatsDashboard()

        if (data.error) {
          setError(data.error)
          return
        }

        setStats({
          totalClients: data.totalClients,
          totalAgents: data.totalAgents,
          totalOwners: data.totalOwners,
          totalProperties: data.totalProperties,
        })
      } catch (err) {
        setError("Erro ao carregar estatísticas")
        console.error("Erro ao carregar estatísticas:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-l-4 border-l-[#272525] hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          <div className="bg-[#272525]/10 p-2 rounded-full">
            <Users className="h-4 w-4 text-[#272525]" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalClients}</div>
          )}
          <div className="flex items-center mt-2">
            <div className="text-xs text-green-600 font-medium flex items-center mr-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8%
            </div>
            <p className="text-xs text-muted-foreground">desde o mês passado</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Corretores</CardTitle>
          <div className="bg-green-100 p-2 rounded-full">
            <UserCheck className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalAgents}</div>
          )}
          <div className="flex items-center mt-2">
            <div className="text-xs text-green-600 font-medium flex items-center mr-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5%
            </div>
            <p className="text-xs text-muted-foreground">desde o mês passado</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Proprietários</CardTitle>
          <div className="bg-amber-100 p-2 rounded-full">
            <Building2 className="h-4 w-4 text-amber-600" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalOwners}</div>
          )}
          <div className="flex items-center mt-2">
            <div className="text-xs text-green-600 font-medium flex items-center mr-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12%
            </div>
            <p className="text-xs text-muted-foreground">desde o mês passado</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Imóveis</CardTitle>
          <div className="bg-blue-100 p-2 rounded-full">
            <Home className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
          )}
          <div className="flex items-center mt-2">
            <div className="text-xs text-red-600 font-medium flex items-center mr-2">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3%
            </div>
            <p className="text-xs text-muted-foreground">desde o mês passado</p>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="col-span-full mt-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      )}
    </div>
  )
}
