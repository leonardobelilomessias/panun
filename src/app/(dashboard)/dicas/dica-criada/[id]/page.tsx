import {CreatedTipsScreen} from "@/app/ui/Screens/Tips/CreatedTipsScreen";

export default async function dicas({params}:{params:{id:string}}){

    return(<CreatedTipsScreen id={params.id} />)
}
