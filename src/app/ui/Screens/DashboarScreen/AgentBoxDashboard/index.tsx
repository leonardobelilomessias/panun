'use client'
import { useState } from "react";
import { ClientCard } from "../ClientBoxDashboard/ClientsCard";
import { ContainerBoxDashboard } from "../ContainersBoxDashBoard/ContainerBoxDashboard";
import { EmptyBoxContainer } from "../EmptyContainer";
import { useAgents } from "@/app/hooks/useAgents";
import { LoadingSpinner } from "video-react";
import { AgentsCard } from "./AgentsCard";

export  function AgentBoxDashboard({allAgents}:{allAgents:any[]}){
    const [page, setPage] = useState(1)
    const { data, isLoading, isError, error } = useAgents(page)
    if (isLoading) return <ContainerBoxDashboard title="Agentes" linkUrl="/corretores"><p className="text-2xl">caregando..</p></ContainerBoxDashboard>
    if (isError) return <ContainerBoxDashboard title="Agentes" linkUrl="/corretores"><p>{error.message}</p></ContainerBoxDashboard> 
    return(
        
        <ContainerBoxDashboard title="Agentes" linkUrl="/corretores">
                { !data?.agents?.length && <EmptyBoxContainer/>}
                {
                    data?.agents.slice(0,5).map((agent)=>(
                        <AgentsCard name={agent.name} />
                    ))
                }
                {/* {JSON.stringify(data)} */}
        </ContainerBoxDashboard>
    )
}