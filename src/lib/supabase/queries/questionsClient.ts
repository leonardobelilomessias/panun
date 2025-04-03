
import { IQuestion } from '@/app/types/TypesDB';
import { supabaseClient } from '../client';

// export const getQuestions = async (): Promise<IQuestion[]> => {
//   const { data: questions, error } = await supabaseClient()
//     .from('questions')
//     .select(`
//       *,
//       profiles (
//         id,
//         user_name,
//         avatar_url
//       ),
//       themes (
//         id,
//         name
//       ),
//       countries (
//         id,
//         name,
//         code
//       )
//     `);

//   if (error) throw error;
//   return questions;
// };

export const getQuestionById = async (questionId: string): Promise<IQuestion | null> => {
  const { data: question, error } = await supabaseClient()
    .from('questions')
    .select(`
      *,
      profiles (
        id,
        user_name,
        avatar_url
      ),
      themes (
        id,
        name
      ),
      countries (
        id,
        name,
        code
      )
    `)
    .eq('id', questionId)
    .single();

  if (error) throw error;
  return question;
}; 