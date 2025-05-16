'use client'
import { MapPin } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogFormDetails } from '../PropertyDetails/DialogFormDetails';
import { DialogFormLocation } from './DialogFormLocation';

export type PropertyLocationProps = {
    idProperty: string
    neighborhood: {name:string,id:string};
    city: {name:string,id:string};
    estate: { name: string, id: string };
    street: string;
    house_number: string;
    zipcode: string;
    status: string;
    reference_point: string;
    reloadEdit:()=>void
};

export function PropertyLocation({
    idProperty,
    neighborhood,
    city,
    estate,
    street,
    house_number,
    zipcode,
    status,
    reference_point,
    reloadEdit
}: PropertyLocationProps) {
    // Formata o endereço completo
    const fullAddress = `${street}, ${house_number} - ${neighborhood.name}, ${city.name} - ${estate.name}`;

    return (
        <div className="space-y-4">
            <Card>
                <CardContent className="pt-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Localização do Imóvel
                        </h1>
                        <DialogFormLocation 
                            reloadEdit={reloadEdit}
                            idProperty={idProperty}
                            city={city}
                            estate={estate}
                            house_number={house_number}
                            neighborhood={ neighborhood}
                            reference_point={reference_point}
                            status={status}
                            street={street }
                            zipcode={zipcode} 
                            />

                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Endereço Completo</h2>
                        <p className="text-gray-600">{fullAddress}</p>
                        <p className="text-gray-500">CEP: {zipcode}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <PropertyField label="Estado" value={estate.name} />
                            <PropertyField label="Cidade" value={city.name} />
                            <PropertyField label="Bairro" value={neighborhood.name} />
                            <PropertyField label="Rua" value={street} />
                        </div>
                        <div className="space-y-3">
                            <PropertyField label="Número" value={house_number} />
                            <PropertyField label="CEP" value={zipcode} />
                            <PropertyField label="Ponto de Referência" value={reference_point || "Não informado"} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function PropertyField({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex  gap-1">
            <span className="text-sm font-medium ">{label}</span>
            <span className="text-sm font-semibold text-gray-500">{value || "-"}</span>
        </div>
    );
}