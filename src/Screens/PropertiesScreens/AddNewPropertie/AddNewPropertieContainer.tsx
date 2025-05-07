import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { AddNewPropertieForm } from "./AddNewPropertieForms";

;

export function AddNewPropertieContainer() {
    return (
        <div className="md:p-10">
            <Card className="mb-10 p-4">
                <CardHeader>
                    <CardTitle className="flex" >
                        Novo Produto</CardTitle>
                    <CardDescription>
                        Aqui estão a lista de todos os produtos
                    </CardDescription>
                </CardHeader>
                <div className="flex flex-col flex-wrap gap-3 m-auto">
                    <AddNewPropertieForm />
                </div>

            </Card>
        </div>
    )
}