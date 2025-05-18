'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, Owner } from "@/types/typesPropeties";
import { DialogFormHeader } from "./DialogFormHeader";

type PropertyHeaderProps = {
  title: string;
  purpose: string;
  status: string;
  type: string;
  id: string | undefined;
  documentationStatus?: string;
  capturedBy?: Agent;
  owner: Owner;
  reloadEdit:()=>void
};

export function PropertyHeader({
  title="Sem Infromação",
  purpose="Sem Infromação",
  status = "Sem Infromação",
  type="Sem Infromação",
  id ="Sem Infromação",
  documentationStatus ="Sem Infromação",
  capturedBy= {email:"sem info", id:"sem info", name:"em info"},
  owner,
  reloadEdit
}: PropertyHeaderProps) {
  return (
    <div className="space-y-4">


      <Card>
        <CardContent className="pt-6">
          
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">Informaçoes basicas</h2>
        <DialogFormHeader purpose={purpose} documentationStatus={documentationStatus} reloadEdit={reloadEdit} title={title} id={id} status={status} agent={capturedBy} owner={owner} type_property={type} />
      </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <PropertyField label="Id" value={id} /> 
            <PropertyField label="Titulo" value={title} />
              <PropertyField label="Tipo" value={type} />
              <PropertyField label="Status Documentação" value={documentationStatus} />
            </div>
            <div className="space-y-2">
              <PropertyField label="Status" value={status} />
              <PropertyField label="Finalidade" value={purpose} />
              <PropertyField label="Origem/Captador" value={capturedBy?.name ||"Sem Infromação"} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PropertyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 ">
      <span className="text-sm font-bold"> {label} :</span>
      <span className="text-sm text-gray-500"> {value} </span>
    </div>
  );
}