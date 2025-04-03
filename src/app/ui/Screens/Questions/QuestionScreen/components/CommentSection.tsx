"use client";

import { Separator } from "@/components/ui/separator";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

interface CommentSectionProps {
  comments: Comment[];
  questionId: string;
  currentUserId?: string;
  commentsCount:number | string
}

interface User {
  id: string;
  user_name: string | null;
  avatar_url: string | null;
  full_name: string | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profile: User;
}


export function CommentSection({ comments, questionId, currentUserId, commentsCount }: CommentSectionProps) {
  const sortedComments = [...comments].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{commentsCount} Comentários</h2>
      <Separator />
      <CommentForm questionId={questionId} currentUserId={currentUserId} />
      <CommentList comments={sortedComments} currentUserId={currentUserId} />
    </div>
  );
}