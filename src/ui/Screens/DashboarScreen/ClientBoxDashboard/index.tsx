import { ClientCard } from "./ClientsCard"
import { ContainerBoxDashboard } from "../ContainersBoxDashBoard/ContainerBoxDashboard"
import { EmptyBoxContainer } from "../EmptyContainer"


export default function ClienteBoxDashboard(){
    const allClients:any[] =[]
    return(
        <ContainerBoxDashboard title="Clientes" linkUrl="/clientes/clienteteste">
            { !allClients?.length && <EmptyBoxContainer/>}
            {
                allClients.map((allAgents,key)=>(
                    <ClientCard key={key} agent="name" property="nome propriesda" name="Teste titulo"/>
                ))
            }
        </ContainerBoxDashboard>
    )
}