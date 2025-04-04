import { propertiesData } from "@/common/mocks/datamocks";
import { SalePropertiesScreen } from "@/Screens/SalePropertiesScreen";

export default function venda(){
    return(
        <SalePropertiesScreen propertiesData={propertiesData}/>
    )
}