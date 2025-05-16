'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFormOwner } from "./DialogFormOwner";

export type PropertyOwnerProps = {
  reloadEdit:()=>void
  idProperty:string;
  owner: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    type?: string;
    status?: string;
    documentation?: string;

  };
};

export function PropertyOwner({ owner , reloadEdit, idProperty}: PropertyOwnerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proprietário</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
      <DialogFormOwner idProperty={idProperty}  id_owner={owner.id} name={owner.name} reloadEdit={reloadEdit}/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <PropertyField label="Nome" value={owner.name} />
            <PropertyField label="Email" value={owner.email} />
            <PropertyField label="Telefone" value={owner.phone} />
            <PropertyField label="Endereço" value={owner.address} />
          </div>
          <div className="space-y-2">
            {owner.type && (
              <PropertyField label="Tipo" value={owner.type} />
            )}
            {owner.status && (
              <PropertyField label="Status" value={owner.status} />
            )}
            {owner.documentation && (
              <PropertyField label="Documentação" value={owner.documentation} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PropertyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-sm font-bold">{label}:</span>
      <span className="text-sm text-gray-500">{value || 'Não informado'}</span>
    </div>
  );
}