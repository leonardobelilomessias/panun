
import { DashboardScreen } from "@/Screens/DashboarScreen";
import { axiosApi } from "@/lib/axios/axios";

export default async function HomePage({ params }: { params: { id: string } }) {

    return (<DashboardScreen />);
}
