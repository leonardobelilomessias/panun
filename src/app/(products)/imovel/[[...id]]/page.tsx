import { PropertiesScreen } from "@/Screens/PropertiesScreen";
import { PropertyScreen } from "@/Screens/PropertyScreen";

export default function Property({params}:{params:{id:string}}){
    // const title  = params.id.split('#')[0]
    // const id =  params.id.split('#')[1]
    return(
        <PropertyScreen id={params.id[1]}/>
    )
}