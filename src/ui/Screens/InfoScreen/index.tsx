'use client'
import { Smartphone } from "lucide-react";
import { ContainerScreen } from "../../components/Containers/ContainerSceen";
import { Progress } from "@/components/ui/progress";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useStoreUser } from "@/context/store/storeUser";

export function InfoScreen(){
  const {setUserStored,userStored} = useStoreUser()
    return(
        <ContainerScreen>
            <h1 className=" font-bold text-4xl">Info</h1>
            <p className="text-gray-600 text-sm">Informativos sobre a prataforma.</p>
            <p className="mt-4">Todos os meses estamos implementando novos recursos na plataforma, 
              para fornecer ferramentas e informações a nossos membros de forma que possam ter uma excelente experiencia de imigração. 
            </p>
            <AccordionDemo/>
        </ContainerScreen>
    )
}

function CardSpeedUp(){
    return(
        <div className="flex flex-col border max-w-96 p-4 rounded  shadow-lg shadow-gray-50">
        <Smartphone />
        <h2 className="font-semibold ">Desenvolvimento Android</h2>
        <p className="text-gray-600 text-sm"> Criação de versão da plataforma para dispositivos mobile compatíveis com sistema Android.</p>
        <div className="my-4 flex flex-col">
        <Progress  indicatorColor="bg-gray-500" color="blue" value={33} />
        <p className="text-gray-500 text-xs font-medium">30% concluido</p>
        </div>
        <Button className="bg-primaryPalet justify-self-end font-semibold hover:bg-blue-800">Contibuir</Button>
        <Link href={''} className="text-primaryPalet  text-center mt-2 text-sm">Ver contribuintes</Link>
        </div>
    )
}
function ContainerCard({children}:{children:ReactNode}){
    return(
        <div className="p-4 flex flex-wrap gap-4">
            {children}
        </div>
    )
}




  
  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Como surgiu a ideia da comunidade?</AccordionTrigger>
          <AccordionContent>
            Brasa network surgiu com a crescente demanda de brasileiros imigrando para o exterior. 
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Qual o proposito da  comunidade?</AccordionTrigger>
          <AccordionContent>
            Nosso propósito é auxiliar e informar imigrantes brasileiros a ter uma processo de imigração facil e prazeroso.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Como fazemos é o fluxo de criação</AccordionTrigger>
          <AccordionContent>
            
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  