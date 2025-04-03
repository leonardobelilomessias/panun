import { CreatedQuestionScreen } from "@/app/ui/Screens/Questions/CreatedQuestionScreen";

export default async function dicas({params}:{params:{id:string}}){

    return(<CreatedQuestionScreen id={params.id} />)
}
