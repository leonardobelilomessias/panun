import { propertiesData } from "@/app/common/mocks/datamocks";
import { SalePropertiesScreen } from "@/app/ui/Screens/SalePropertiesScreen";

export default function venda(){
    return(
        <SalePropertiesScreen propertiesData={propertiesData}/>
    )
}