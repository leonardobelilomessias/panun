"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStatsDashboard } from "@/lib/supabase/queries/client/dashboard/getStatsDashboard"
import { Users, Home, Building2, UserCheck } from "lucide-react"
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalClients}</div>
          )}
          <p className="text-xs text-muted-foreground">Clientes cadastrados no sistema</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Corretores</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalAgents}</div>
          )}
          <p className="text-xs text-muted-foreground">Corretores ativos</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Proprietários</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalOwners}</div>
          )}
          <p className="text-xs text-muted-foreground">Proprietários cadastrados</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Imóveis</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
          )}
          <p className="text-xs text-muted-foreground">Total de imóveis cadastrados</p>
        </CardContent>
      </Card>
      
      {error && (
        <div className="col-span-full mt-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
    </div>
  )
}