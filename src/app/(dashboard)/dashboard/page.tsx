
import { DashboardScreen } from "@/app/ui/Screens/DashboarScreen";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const id = data.user?.id
  if (!id) redirect(`/dashboard/visitante`)
  
  if (id) redirect(`/dashboard/${id}`)
  
    return (<DashboardScreen />);
}
