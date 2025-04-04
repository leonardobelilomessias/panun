"use client";
import React from 'react';
import { QuestionsSection } from './QuestionsSection';
import { useQuestions } from './hooks/useQuestions';
import { Loader2 } from "lucide-react";
import { supabaseClient } from '@/lib/supabase/client';

export   function QuestionsScreen() {
  const { questions, isLoading, error } = useQuestions();
  const supabase =  supabaseClient()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primaryPalet" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <p className="text-red-500 font-semibold">Erro ao carregar perguntas</p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      
      <QuestionsSection 
        questions={questions}
        isLoading={isLoading}
      />
    </div>
  );
} 