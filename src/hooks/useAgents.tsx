// hooks/useAgents.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

interface Agent {
  id: number
  name:string
  title: string
  content: string
  createdAt: string
}

interface AgentsResponse {
  agents: Agent[]
  currentPage: number
  totalPages: number
  hasNextPage: boolean
}

const fetchAgents = async (page: number): Promise<AgentsResponse> => {
  const response = await fetch(`/api/getAgents?page=${page}&limit=10`)
  if (!response.ok) {
    throw new Error('Falha ao carregar agents')
  }
  return response.json()
}

export const useAgents = (page: number) => {
  const queryOptions: UseQueryOptions<AgentsResponse, Error> = {
    queryKey: ['agents', page],
    queryFn: () => fetchAgents(page),
    placeholderData: (previousData) => previousData, // Substitui keepPreviousData
    staleTime: 5 * 60 * 1000, // 5 minutos
  }

  return useQuery(queryOptions)
}