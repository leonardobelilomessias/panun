import { ClientCard } from "./ClientsCard"
import { ContainerBoxDashboard } from "../ContainersBoxDashBoard/ContainerBoxDashboard"
import { EmptyBoxContainer } from "../EmptyContainer"


export default function ClienteBoxDashboard({allClients}:{allClients:any[]}){
    console.log("all client cliente box dashboard", allClients)
    return(
        <ContainerBoxDashboard title="Clientes" linkUrl="/clientes/clienteteste">
            { !allClients?.length && <EmptyBoxContainer/>}
            {
                allClients.map(()=>(
                    <ClientCard agent="name" property="nome propriesda" name="Teste titulo"/>
                ))
            }
        </ContainerBoxDashboard>
    )
}