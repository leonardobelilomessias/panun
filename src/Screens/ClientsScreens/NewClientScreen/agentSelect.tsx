"use client"
import { useState, useEffect } from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { listAgents } from "@/lib/supabase/queries/client/Agents/listAgents"


interface SelectAgentFieldProps {
  form: any
  defaultValue?: string
}

export function SelectAgentField({ form, defaultValue }: SelectAgentFieldProps) {
  const [agents, setAgents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAgents() {
      setIsLoading(true)
      try {
        const agentsData = await listAgents()
        // Filtrar apenas agentes ativos
        const activeAgents = agentsData.filter((agent) => agent.status === "Ativo")
        setAgents(activeAgents)
      } catch (error) {
        console.error("Erro ao carregar agentes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAgents()
  }, [])

  if (isLoading) {
    return <Skeleton className="h-10 w-full" />
  }

  return (
    <FormField
      control={form.control}
      name="agent_id"
      rules={{ required: "Agente responsável é obrigatório" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Agente Responsável <span className="text-red-500">*</span>
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={defaultValue || field.value} value={field.value}>
            <FormControl>
              <div className="relative">
                <UserCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Selecione o agente responsável" />
                </SelectTrigger>
              </div>
            </FormControl>
            <SelectContent>
              {agents.length === 0 ? (
                <SelectItem value="no-agents" disabled>
                  Nenhum agente disponível
                </SelectItem>
              ) : (
                agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name} {agent.creci ? `(CRECI: ${agent.creci})` : ""}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
