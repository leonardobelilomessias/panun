import { FC } from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle, SquarePlus } from "lucide-react";
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import { QuestionCard } from './QuestionCard';
import { IQuestion, ListItemGenericFull } from '@/app/types/TypesDB';
import { EmptyContainerGeneric } from '@/app/ui/components/Empty/EmptyContainerGeneric';
import { CardListGeneric } from '@/app/ui/components/Cards/CardQuestionList';
import { deleteQuestionById } from '@/lib/supabase/queries/server/questions/deleteQuestionById';

interface QuestionsSectionProps {
  questions: ListItemGenericFull[];
  isLoading: boolean;
}

export const QuestionsSection: FC<QuestionsSectionProps> = ({ questions, isLoading }) => {
  if (isLoading) {
    return <div>Carregando perguntas...</div>;
  }

  return (
    <section className="container max-w-4xl mx-auto py-8 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HelpCircle size={24} className="text-gray-700" />
          <h2 className="text-2xl font-bold">Perguntas da Comunidade</h2>
        </div>
        <Link href="/perguntas/criar-pergunta">
          <Button variant="default" className="bg-primaryPalet hover:bg-blue-600">
            Fazer Pergunta
            <SquarePlus className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Separator className="my-4" />
      {!questions.length ? (
        <EmptyContainerGeneric/>
      ) : (
        <div className="grid gap-4">
          {questions?.map((question) => (
            <CardListGeneric key={question.id} onDeleteItem={()=>deleteQuestionById(question.id)} linkToEdit={`/perguntas/editar-pergunta/${question.id}`} linkToShow={`/pergunta/${question.id}`} itemFull={question} currentUser='' onDeleteRefresh={()=>null} />
          ))}
        </div>
      )}
    </section>
  );
}; 