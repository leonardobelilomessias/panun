"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addComment } from "@/lib/supabase/queries/server/Tips";

const commentSchema = z.object({
  content: z.string().min(1, 'Por favor, digite um comentário'),
  tipId: z.string()
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  tipId: string;
  currentUserId: string | undefined;
}

export function CommentForm({ tipId,currentUserId }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      tipId,
      content: ''
    }
  });

  const onSubmit = async (data: CommentFormData) => {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('tipId', data.tipId);
    if (!currentUserId) return;
    await addComment({tipId, userId: currentUserId, content: data.content});
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
      <input type="hidden" {...register('tipId')} />
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