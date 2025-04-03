import { FC } from 'react';
import Image from 'next/image';
import { IQuestion } from '@/app/types/TypesDB';

interface QuestionCardProps {
  question: IQuestion;
}

export const QuestionCard: FC<QuestionCardProps> = ({ question }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{question.title}</h3>
      <p className="mt-2 text-gray-600">{question.content}</p>
      
      <div className="mt-4 flex items-center">
        {question?.profile && (
          <div className="flex items-center">
            {question.profile.avatar_url ? (
              <Image 
                src={question.profile.avatar_url}
                alt={question.profile.user_name || 'Usuário'}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            )}
            <span className="ml-2 text-sm text-gray-700">
              {question.profile.user_name || 'Usuário'}
            </span>
          </div>
        )}
      </div>

      <div className="mt-2 flex gap-2">
        {question.theme && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {question.theme.name}
          </span>
        )}
        {question.country && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            {question.country.name} ({question.country.code})
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center text-sm text-gray-500">
        <span>{question.likes_count} likes</span>
        <span className="mx-2">•</span>
        <span>{question.views_count} visualizações</span>
        <span className="mx-2">•</span>
        <span className="capitalize">{question.status}</span>
      </div>
    </div>
  );
}; 