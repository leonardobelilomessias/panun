'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
interface AddCommentParams {
    questionId: string;
    userId: string;
    content: string;
  }
  

export const addCommentQuestion = async ({ questionId, userId, content }: AddCommentParams) => {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('questions_comments')
      .insert({
        question_id: questionId,
        user_id: userId,
        content: content
      });
      revalidatePath(`/pergunta/${questionId}`);
    if (error) throw error;
  };
  