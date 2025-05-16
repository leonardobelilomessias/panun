import { NewProductScreen } from "@/Screens/NewProductScreen";
import { AddNewPropertie } from "@/Screens/PropertiesScreens/AddNewPropertie";
import { PropertieCreatedScreen } from "@/Screens/PropertiesScreens/PropertieCreatedScreen";

export default function newProduct({params}:{params:{id:string}}){
    return(
        <PropertieCreatedScreen id={params.id}/>
    )
}