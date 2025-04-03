import { Timer } from 'lucide-react';
import React from 'react';

export default function RecentQuestionsSection() {
  const questions = [
    {
      id: 1,
      title: "Qual a melhor estrategia para imigrar para Europa?",
      date: "20/02/2025",
      time: "09:45",
      author: "@exemplousuario"
    },
    {
      id: 2,
      title: "Portugal está permitindo regularização de turistas?",
      date: "20/02/2025",
      time: "09:45",
      author: "@exemplousuario"
    },
    {
      id: 3,
      title: "Quanto em media eu preciso para imigrar com minha familia?",
      date: "20/02/2025",
      time: "09:45",
      author: "@exemplousuario"
    },
    {
      id: 4,
      title: "Qual a cidade com melhor oferta de emprego na irlanda",
      date: "20/02/2025",
      time: "09:45",
      author: "@exemplousuario"
    }
  ];
  
  return (
    <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <span className="text-gray-600 mr-2"><Timer/></span>
        <h2 className="text-xl font-semibold">Últimas Perguntas</h2>
      </div>
      
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <h3 className="font-medium text-gray-800 mb-1">{question.title}</h3>
            <p className="text-xs text-gray-500">
              Criado em {question.date} às {question.time} por <span className="text-primaryPalet">{question.author}</span>
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="bg-primaryPalet text-white px-4 py-2 rounded-md text-sm">
          Ver todas
        </button>
      </div>
    </div>
  );
}