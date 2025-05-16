'use client'

import { Card, CardContent } from "@/components/ui/card";
import { PropertyLeadType } from ".";

type PropertyLeadManagementProps = {
  leads: PropertyLeadType;
};

export function PropertyLeadManagement({ leads }: PropertyLeadManagementProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">Gestão de Leads e atendimento</h2>
        <div className="space-y-4">
          {leads.broker && <LeadItem label="Corretor" value={leads.broker} />}
          
          {leads.visitHistory && (
            <LeadItem label="Histórico de visitas" value={leads.visitHistory} />
          )}
          
          {leads.interestedClients && (
            <LeadItem label="Clientes interessados" value={leads.interestedClients} />
          )}
          
          {leads.registrationDate && (
            <LeadItem label="Data de cadastro" value={leads.registrationDate} />
          )}
          
          {leads.updateDate && (
            <LeadItem label="Data de atualização" value={leads.updateDate} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LeadItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <span className="text-sm font-medium">{label}:</span>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  );
}