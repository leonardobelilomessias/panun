"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {  deleteCommentTip } from '@/lib/supabase/queries/server/Tips';

interface DeleteCommentButtonProps {
  commentId: string;
  userId: string;
  currentUserId?: string;
}

export function DeleteCommentButton({ commentId, userId, currentUserId }: DeleteCommentButtonProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const result = await deleteCommentTip(commentId);
      if (result.success) {
        toast({
          title: "Sucesso",
          description: "Comentário deletado com sucesso"
        });
      } else {
        throw new Error(result.error || 'Erro ao deletar comentário');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao deletar comentário"
      });
    }
  };

  if (currentUserId !== userId) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 hover:bg-red-100"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
} 