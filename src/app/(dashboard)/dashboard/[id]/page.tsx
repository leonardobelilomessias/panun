
import { DashboardScreen } from "@/app/ui/Screens/DashboarScreen";
import { axiosApi } from "@/lib/axios/axios";

export default async function HomePage({ params }: { params: { id: string } }) {
    const lastPropertiesRentAdd = await axiosApi.get('/api/lastPropertiesRentAdd')
    const lastPropertiesSalesAdd = await axiosApi.get('/api/lastPropertiesSalesAdd')
    const lastAgents = await axiosApi.get('/api/lastAgents')
    const lastClients = await axiosApi.get('/api/lastClients')
    return (<DashboardScreen />);
}
