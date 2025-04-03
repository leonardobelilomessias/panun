import { ContainerScreen } from "../../components/Containers/ContainerSceen";
import { axiosApi } from "@/lib/axios/axios";

import { AgentBoxDashboard } from "./AgentBoxDashboard";
import { LastPropertiesSales } from "./LastPropertiesSales";
import { LastPropertiesRent } from "./LastPropertiesRent";
import ClienteBoxDashboard from "./ClientBoxDashboard";
import { ReactQueryClientProviders } from "@/providers/ReactQueryClientProviders";


export  async function DashboardScreen(){


    return(
    
            <ContainerScreen>
                    <ReactQueryClientProviders>
                <div className="flex flex-col gap-6">

                    <div className="flex gap-6 flex-wrap">
                        <ClienteBoxDashboard />
                        <AgentBoxDashboard />
                    </div>
                        <LastPropertiesSales />
                        <LastPropertiesRent />
                </div>
                    </ReactQueryClientProviders>
            </ContainerScreen>

    )
}







