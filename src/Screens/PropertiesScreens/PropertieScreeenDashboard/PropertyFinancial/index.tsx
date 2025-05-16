'use client'

import { Card, CardContent } from "@/components/ui/card";
import { DialogFormFinancial } from "./DialogFormFinancial";

export type PropertyFinancialProps = {
  idProperty:string;
  reloadEdit:()=>void
  price: string;
  iptu?: string;
  condominium?: string;
  commission?: string;
};

export function PropertyFinancial({
  idProperty,
  reloadEdit,
  price,
  iptu,
  condominium,
  commission,
}: PropertyFinancialProps) {
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "")
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(numericValue) / 100)
  }
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">Financeiro</h2>
        <DialogFormFinancial idProperty={idProperty} price={price} reloadEdit={reloadEdit} commission={commission} condominium={condominium} iptu={iptu}/>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <PropertyField label="Preço" value={price} />
            {condominium && (
              <PropertyField label="Condomínio" value={condominium} />
            )}
          </div>
          <div className="space-y-3">
            {iptu && <PropertyField label="IPTU" value={iptu} />}
            {commission && <PropertyField label="Comissão" value={commission} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PropertyField({ label, value }: { label: string; value: string }) {
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "")
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(numericValue) / 100)
  }
  return (
    <div className="flex gap-2">
      <span className="text-sm font-bold">{label}: </span>
      {(label==="Preço"||label==="Condomínio"||label==="IPTU")&&<span className="text-sm text-gray-500">{formatCurrency(value)}</span>}
      {(label==="Comissão")&& <span className="text-sm text-gray-500">{value}%</span>}
      

    
    </div>
  );
}