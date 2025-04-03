import { Badge, BriefcaseBusiness, Brush, Code, Group, LucideProps, Package, Smartphone, Ticket, Users } from "lucide-react";
import { ContainerScreen } from "../../components/Containers/ContainerSceen";
import { FaAndroid } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import React, { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SpeedUpScreen() {
    return (
        <ContainerScreen>
            <h1 className=" font-bold text-4xl">Acelere o desenvolvimento</h1>
            <p className="text-gray-600 text-sm">Contribua com a plataforma e torne o desenvolvimento da comunidade mais rápido.</p>
            <p className="mt-4">Estamos criando uma plataforma que possa atender todas as pessoas que tem interesse em contrinuir para uma
                forte comunidade brasileira no exterior.
            </p>
            <ContainerCard>
                <CardSpeedUp link="#" percentAmount={9} iconItem={Smartphone} title="Desenvolvimento Android" text="Criação de versão da plataforma para dispositivos mobile compatíveis com sistema Android." />
                <CardSpeedUp link="#" percentAmount={63} iconItem={BriefcaseBusiness} title="Criação de Vagas de trabalho" text="Criação de versão da plataforma para dispositivos mobile compatíveis com sistema Android." />
                <CardSpeedUp link="#" percentAmount={30} iconItem={Ticket} title="Plataforma de Eventos" text="Criação de versão da plataforma para dispositivos mobile compatíveis com sistema Android." />
                <CardSpeedUp link="#" percentAmount={47} iconItem={Users} title="Criação de grupos" text="Criação de versão da plataforma para dispositivos mobile compatíveis com sistema Android." />
                <CardSpeedUp link="#" percentAmount={60} iconItem={Brush} title="Estilização de interface" text="Criação de versão da plataforma para dispositivos mobile compatíveis com sistema Android." />


            </ContainerCard>
        </ContainerScreen>
    )
}

interface CardSpdUpProps {
    iconItem: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    title: string
    text: string
    percentAmount: number
    link: string
}
function CardSpeedUp( items : CardSpdUpProps) {
    
    return (
        <div className="flex flex-col border max-w-96 p-4 rounded  shadow-lg shadow-gray-50">
            {<items.iconItem/>}
            <h2 className="font-semibold ">{items.title}</h2>
            <p className="text-gray-600 text-sm"> {items.text}</p>
            <div className="my-4 flex flex-col">
                <Progress indicatorColor="bg-blue-300" color="blue" value={items.percentAmount} />
                <p className="text-gray-500 text-xs font-medium">{String(items.percentAmount)}% concluido</p>
            </div>
            <Button className="bg-primaryPalet justify-self-end font-semibold hover:bg-blue-800">Contibuir</Button>
            <Link href={''} className="text-primaryPalet  text-center mt-2 text-sm">Ver contribuintes</Link>
        </div>
    )
}
function ContainerCard({ children }: { children: ReactNode }) {
    return (
        <div className="p-4 flex flex-wrap gap-4">
            {children}
        </div>
    )
}