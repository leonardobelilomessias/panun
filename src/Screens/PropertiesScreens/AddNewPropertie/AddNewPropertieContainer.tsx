import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { AddNewPropertieForm } from "./AddNewPropertieForms";

;

export function AddNewPropertieContainer() {
    return (
        <div className="md:p-10">

                <CardHeader>
                    <CardTitle className="flex" >
                        Novo imóvel</CardTitle>
                    <CardDescription>
                        Prencha o formulário para adicionar um novo imóvel.
                    </CardDescription>
                </CardHeader>
                <div className="flex flex-col flex-wrap gap-3 m-auto bg-gray-50">
                    <AddNewPropertieForm />
                </div>


        </div>
    )
}