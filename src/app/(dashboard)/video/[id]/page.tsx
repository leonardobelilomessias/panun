import { VideoScreen } from "@/ui/Screens/VideoScreen";

export  default function video({params:{id}}:{params:{id:string}}){
    return(<VideoScreen id={id}/>)
}