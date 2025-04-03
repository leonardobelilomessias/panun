
import { propertiesData } from "@/app/common/mocks/datamocks";
import { PropertiesSalesScreens } from "@/app/ui/Screens/PropertieSalesScreen";
import { QuestionsScreen2 } from "@/app/ui/Screens/Questions/QuestionsScreen2";

export default function perguntas(){
    
    return(<PropertiesSalesScreens properties={propertiesData}/>)
}