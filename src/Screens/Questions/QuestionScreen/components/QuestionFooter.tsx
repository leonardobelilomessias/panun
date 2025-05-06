
'use client'
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import { likeQuestion } from "@/lib/supabase/queries/server/questions/likeQuestion";
import { unlikeQuestion } from "@/lib/supabase/queries/server/questions/unlikeQuestion";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface TipFooterProps {
  likesCount: number;
  commentsCount: number;
  currentUserId:string |null|undefined
  questionId:string 
}

export function QuestionFooter({ likesCount, commentsCount,currentUserId,questionId }: TipFooterProps) {
  const [ammountLikes,setAmmountLikes] = useState<number>(0)
  const [isLiked, setIsLiked] = useState(false) 
  async function  getIsLiked(){
  try{
    const { data: likeData, error: likeError } = await supabaseClient()
  .from("questions_likes")
  .select("user_id")
  .eq('question_id', questionId)
  const conjuntoDeIds: Set<string> = new Set(likeData?.map(obj => obj.user_id));
  const idExists: boolean = conjuntoDeIds.has(String(currentUserId));
  console.log('existe',conjuntoDeIds, currentUserId)
  setAmmountLikes(Number(likeData?.length))
  if(idExists){
    setIsLiked(true)
  }else{
    setIsLiked(false)
  }
  }catch(error){
    console.log(error,"erro ao busca o like")
  }

}
async function addLike(){
  if(!isLiked){
    try {
      console.log('click like like', questionId)
      
      await likeQuestion(questionId)
      setIsLiked(true)
      setAmmountLikes((element)=> ( element+1))
    } catch (error) {
      console.log(error)
    }
  }else{
    console.log('click like unlike', questionId)

    try {
      
      await unlikeQuestion(questionId)
      setAmmountLikes((element)=> ( element-1))

      setIsLiked(false)
    } catch (error) {
      console.log(error)
    }
  }
} 
useEffect(()=>{
   getIsLiked()
},[])

  return (
    <div className="flex items-center gap-4">
      <Button onClick={()=>addLike()} variant="ghost" className={`flex items-center gap-2 ${isLiked&& 'bg-blue-50'}`}>
        <ThumbsUp  className={`h-4 w-4 ${isLiked&&'text-primary-palet'}`} />
        <span className={` ${isLiked&&'text-primary-palet'}`}>{ammountLikes}</span>
      </Button>
    </div>
  );
} 