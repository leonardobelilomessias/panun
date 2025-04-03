
'use client'
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import { likeTip, unlikeTip } from "@/lib/supabase/queries/server/Tips";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface TipFooterProps {
  likesCount: number;
  commentsCount: number;
  currentUserId:string |null|undefined
  tipId:string 
}

export function TipFooter({ likesCount, commentsCount,currentUserId,tipId }: TipFooterProps) {
  const [ammountLikes,setAmmountLikes] = useState<number>(0)
  const [isLiked, setIsLiked] = useState(false) 
  async function  getIsLiked(){
  try{
    const { data: likeData, error: likeError } = await supabaseClient()
  .from("tips_likes")
  .select("user_id")
  .eq('tip_id', tipId)
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
      console.log('click like like', tipId)
      
      await likeTip(tipId)
      setIsLiked(true)
      setAmmountLikes((element)=> ( element+1))
    } catch (error) {
      console.log(error)
    }
  }else{
    console.log('click like unlike', tipId)

    try {
      
      await unlikeTip(tipId)
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
        <ThumbsUp  className={`h-4 w-4 ${isLiked&&'text-primaryPalet'}`} />
        <span className={` ${isLiked&&'text-primaryPalet'}`}>{ammountLikes}</span>
      </Button>
    </div>
  );
} 