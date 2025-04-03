"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addComment } from "@/lib/supabase/queries/server/Tips";
import { addCommentQuestion } from "@/lib/supabase/queries/server/questions/addCommentQuestion";

const commentSchema = z.object({
  content: z.string().min(1, 'Por favor, digite um comentário'),
  questionId: z.string()
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  questionId: string;
  currentUserId: string | undefined;
}

export function CommentForm({ questionId,currentUserId }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      questionId,
      content: ''
    }
  });

  const onSubmit = async (data: CommentFormData) => {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('questionId', data.questionId);
    if (!currentUserId) return;
    await addCommentQuestion({questionId, userId: currentUserId, content: data.content});
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
      <input type="hidden" {...register('questionId')} />
      <div className="space-y-2">
        <Textarea 
        disabled={!currentUserId}
          {...register('content')}
          placeholder="Deixe seu comentário..."
          className={`min-h-[100px] ${errors.content ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {errors.content && (
          <p className="text-sm text-red-500">
            {errors.content.message}
          </p>
        )}
      </div>
      <Button disabled={ !currentUserId} type="submit" className="bg-primaryPalet">
        Enviar Comentário
      </Button>
    </form>
  );
} 