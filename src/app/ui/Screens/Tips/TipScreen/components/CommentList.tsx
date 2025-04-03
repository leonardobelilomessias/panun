import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from '@/app/util/FormatDate';
import { DeleteCommentButton } from './DeleteCommentButton';
import ImageDefault from '@/app/public/images/profile/default/avatar-default.jpg'
import Image from "next/image";

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

interface CommentListProps {
  comments: Comment[];
  currentUserId?: string;
}

export function CommentList({ comments, currentUserId }: CommentListProps) {
  console.log('currentUserId', currentUserId, comments);
  return (
    <div className="space-y-4">
      {comments?.map((comment) => (
        <Card key={comment.id}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center space-x-3">
              <Avatar className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image width={40} height={10} className="rounded-full"  style={{objectFit:"cover"}} src={comment.profile.avatar_url || ImageDefault} alt={`${comment.profile.user_name}'s avatar`} /> 
 
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{comment.profile.full_name || 'Usuário Desconhecido'}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(comment.created_at).extendTime}
                </span>
              </div>
            </div>
            <DeleteCommentButton 
              commentId={comment.id}
              userId={comment.profile.id}
              currentUserId={currentUserId}
            />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 