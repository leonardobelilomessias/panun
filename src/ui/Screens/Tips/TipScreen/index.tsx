import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { TipHeader } from './components/TipHeader';
import { TipContent } from './components/TipContent';
import { TipFooter } from './components/TipFooter';
import { CommentSection } from './components/CommentSection';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { fetchTips, getTipById } from '@/lib/supabase/queries/server/Tips';
import { ContainerScreen } from '@/ui/components/Containers/ContainerSceen';

interface TipScreenProps {
  tipId: string;
}

export async function TipScreen({ tipId }: TipScreenProps) {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()
  const currentUserId = data.user?.id
  console.log('currentUserId em TipScreen', currentUserId)
  try{

    const tip = await getTipById(tipId);
    return (
      <ContainerScreen>
        <Card>
          <CardHeader className="space-y-0 pb-4">
            <TipHeader 
              avatarUrl={tip.profile.avatar_url}
              userName={tip.profile.full_name}
              createdAt={tip.created_at}
              countryName={tip.country.name}
            />
          </CardHeader>
  
          <CardContent>
            <TipContent 
              imageUrl={tip.image_url}
              title={tip.title}
              content={tip.content}
              themeName={tip.theme.name}
              countryName={tip.country.name}
            />
          </CardContent>
  
          <CardFooter>
            <TipFooter 
              tipId={tipId}
              currentUserId={currentUserId}
              likesCount={tip.likes_count}
              commentsCount={tip.comments.length || 0}
            />
          </CardFooter>
        </Card>
  
        <CommentSection 
          currentUserId={currentUserId}
          comments={tip.comments} 
          tipId={tipId}
          commentsCount={tip.comments.length || 0}
        />
      </ContainerScreen>
    );
  
  }catch(error){
     return (
      <ContainerScreen>
        <Card className="text-center p-8">
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">Ops! Dica não encontrada</h2>
            <p className="text-gray-500">Desculpe, não conseguimos encontrar a dica que você está procurando.</p>
            <div className="text-6xl">😕</div>
          </CardContent>
        </Card>
      </ContainerScreen>
    )
    
  }

;


}
