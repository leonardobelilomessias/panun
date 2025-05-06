import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight, SquarePlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

export function EmptyContainer({link , title, iconTitle,titleButton}:{ link?: string, title:string, iconTitle: any,titleButton?:string}) {
  return (
    <section className="container max-w-4xl mx-auto py-8 space-y-2 ">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-2">
          {iconTitle && React.createElement(iconTitle, { size: 20, className: " " })}
          <h2 className="text-xl font-bold ">
            {title}
          </h2>
        </div>
        {
          link &&
          <Link href={link} >
        <Button variant="default" className='bg-primary-palet' size="sm">
        {titleButton}
          <SquarePlus className="ml-2 h-4 w-4" />
        </Button>
        </Link>
        }
      </div>


      <div className="flex flex-col items-center justify-center space-y-4">
        <Sparkles className="h-12 w-12 text-gray-500" />
        <p className="text-center text-gray-500">
          Ainda não há dicas para mostrar
        </p>
      </div>

      <Separator />
    </section>
  );
};

