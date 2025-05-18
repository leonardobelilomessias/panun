import { EditOwnerScreen } from "@/Screens/OwnersScreens/EditOwnerScreen";

export default function novoPropietario({params}:{params:{id:string}}){
    return(
        
        <EditOwnerScreen id={params.id}/>
    )
}