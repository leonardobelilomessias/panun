import { PropertiesScreenDashboard } from "@/Screens/PropertiesScreens/PropertieScreeenDashboard";

export default function ficha({ params }: { params: { id: string } }) {  
    const { id } = params;
    return (
        <PropertiesScreenDashboard id={id} />
    );
    }