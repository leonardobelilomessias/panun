
import { PropertieRentScreen } from "@/Screens/PropertiesScreens/PropertieRentScreen";
import { PropertiesSalesScreens } from "@/Screens/PropertiesScreens/PropertieSalesScreen";
import { QuestionsScreen2 } from "@/Screens/Questions/QuestionsScreen2";
import { propertiesData } from "@/common/mocks/datamocks";

export default function perguntas(){
    return(<PropertieRentScreen properties={propertiesData}/>)
}