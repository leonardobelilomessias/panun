import {  Wrench } from "lucide-react";

export function BuildingScreeen(){
    return(
        <div className="container pt-5 min-h-[60vh]">
            <div className="flex flex-col align-middle justify-center items-center">
                
                <h1 className="text-2xl font-bold my-4">Estamos em construção</h1>
                <div className="bg-blue-100 rounded-full flex items-center justify-center p-4">
                    <Wrench className="text-primary-palet" size={100}/>
                </div>
                <p className="text-sm my-4 text-gray-700">Estamos trabalhando para entregar a melhor esperiencia para nossa comunidade.</p>
            </div>
        </div>
    )
}