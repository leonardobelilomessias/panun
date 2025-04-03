import { ContainerScreen } from "../../components/Containers/ContainerSceen";
import { axiosApi } from "@/lib/axios/axios";

import { AgentBoxDashboard } from "./AgentBoxDashboard";
import { LastPropertiesSales } from "./LastPropertiesSales";
import { LastPropertiesRent } from "./LastPropertiesRent";
import ClienteBoxDashboard from "./ClientBoxDashboard";
import { ReactQueryClientProviders } from "@/app/providers/ReactQueryClientProviders";


export  async function DashboardScreen(){
    const lastPropertiesRentAdd = await axiosApi.get('/api/lastPropertiesRentAdd')
    const lastPropertiesSalesAdd = await axiosApi.get('/api/lastPropertiesSalesAdd')
    const lastAgents = await axiosApi.get('/api/lastAgents')
    const lastClients = await axiosApi.get('/api/lastClients')
    console.log("Dashboard console lastProperties", lastPropertiesRentAdd.data)
    console.log("Dashboard console lastProperties", lastPropertiesRentAdd.data)
    console.log("Dashboard console lastProperties", lastPropertiesRentAdd.data)
    console.log("Dashboard console lastClients", lastClients.data)

    return(
    
            <ContainerScreen>
                    <ReactQueryClientProviders>
                <div className="flex flex-col gap-6">

                    <div className="flex gap-6 flex-wrap">
                        <ClienteBoxDashboard allClients={lastClients.data} />
                        <AgentBoxDashboard allAgents={lastClients.data}/>
                    </div>
                        <LastPropertiesSales lastPropertiesRent={lastPropertiesSalesAdd.data}/>
                        <LastPropertiesRent lastPropertiesRent={lastPropertiesRentAdd.data}/>
                </div>
                    </ReactQueryClientProviders>
            </ContainerScreen>

    )
}







