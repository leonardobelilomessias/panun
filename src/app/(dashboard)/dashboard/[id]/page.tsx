
import { DashboardScreen } from "@/Screens/DashboarScreen";
import { AgentsTable } from "@/components/dashboard/agents-table";
import { ClientsTable } from "@/components/dashboard/clients-table";
import { DashboardHeader } from "@/components/dashboard/header";
import { OwnersTable } from "@/components/dashboard/owners-table";
import { RecentProperties } from "@/components/dashboard/recent-properties";
import { DashboardShell } from "@/components/dashboard/shell";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { axiosApi } from "@/lib/axios/axios";

export default async function HomePage({ params }: { params: { id: string } }) {

    return (
        <>
        <DashboardShell>
          <DashboardHeader heading="Dashboard" text="Visão geral da sua imobiliária" />
          <div className="grid gap-6">
            <StatsCards />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <RecentProperties title="Últimos Imóveis à Venda" purpose="Venda" />
              <RecentProperties title="Últimas Propriedades Para Aluguel" purpose="Aluguel" />
            </div>
            <Tabs defaultValue="clients" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="clients">Clientes</TabsTrigger>
                <TabsTrigger value="agents">Corretores</TabsTrigger>
                <TabsTrigger value="owners">Proprietários</TabsTrigger>
              </TabsList>
              <TabsContent value="clients" className="border rounded-md p-4">
                <ClientsTable />
              </TabsContent>
              <TabsContent value="agents" className="border rounded-md p-4">
                <AgentsTable />
              </TabsContent>
              <TabsContent value="owners" className="border rounded-md p-4">
                <OwnersTable />
              </TabsContent>
            </Tabs>
          </div>
        </DashboardShell>
      </>
    );
}
