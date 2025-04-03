"use client";
import { useState, useEffect } from 'react';
import { IQuestion, ListItemGenericFull } from '@/app/types/TypesDB';
import { getQuestions } from '@/lib/supabase/queries/Questions';
import { fetchQuestionsPaginationWithSelect } from '@/lib/supabase/queries/server/questions/fetchQuestionsPaginationWithSelect';


export const useQuestions = () => {
  const [questions, setQuestions] = useState<ListItemGenericFull[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await fetchQuestionsPaginationWithSelect(1);
        console.log('quationn, fetchQuestionsPaginationWithSelect', data)
        setQuestions(data.questions);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar perguntas'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, isLoading, error };
}; 