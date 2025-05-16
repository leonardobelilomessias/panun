'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogFormDetails } from "./DialogFormDetails";

export type PropertyDetailsProps = {
  idProperty:string
  description: string;
  shortDescription?: string;
  bedrooms: number;
  bathrooms: number;
  totalArea: number;
  usefulArea: number;
  garage: number;
  suites: number;
  floor: string;
  mobility: string;
  reloadEdit:()=>void

};

export function PropertyDetails({ 
  idProperty,
  description, 
  shortDescription, 
  bedrooms, 
  bathrooms, 
  totalArea, 
  usefulArea, 
  garage, 
  suites,
  floor,
  mobility,
  reloadEdit

}: PropertyDetailsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Detalhes</h1>
            <DialogFormDetails idProperty={idProperty} floor={floor} mobility={mobility} shortDescription={shortDescription} suites={suites} description={description} bedrooms={bedrooms} bathrooms={bathrooms} totalArea={totalArea} usefulArea={usefulArea} garage={garage} reloadEdit={reloadEdit } />
          </div>
          
          {shortDescription && (
            <div>
              <h2 className="text-lg font-semibold">Descrição curta</h2>
              <p className="text-gray-500">{shortDescription}</p>
            </div>
          )}
          
          <div>
            <h2 className="text-lg font-semibold">Descrição Completa</h2>
            <p className="text-gray-500">{description || 'Sem descrição disponível'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <PropertyField label="Área Total" value={`${totalArea} m²`} />
              <PropertyField label="Área Útil" value={`${usefulArea} m²`} />
              <PropertyField label="Mobiliado" value={mobility?"Sim":"Não"} />
              <PropertyField label="Andar" value={floor?floor:"Não informado"} />
            </div>
            <div className="space-y-4">
              <PropertyField label="Quartos" value={String(bedrooms)} />
              <PropertyField label="Banheiros" value={String(bathrooms)} />
              <PropertyField label="Vagas na Garagem" value={String(garage)} />
              
              {suites !== undefined && (
                <PropertyField label="Suítes" value={String(suites)} />
              )}

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PropertyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm font-bold">{label}:</span>
      <span className="text-sm text-gray-500">{value || '-'}</span>
    </div>
  );
}