import { CreateTipScreen } from "@/app/ui/Screens/Tips/CreateTipScreen";
import { EditTipScreen } from "@/app/ui/Screens/Tips/EditTipScreen";
import { getTipById } from "@/lib/supabase/queries/tipsClient";
import { createClient } from "@/utils/supabase/server";
interface EditTipPageProps {
    params: {
      id: string;
    }
  }
export default async function editTip({ params }: EditTipPageProps){
    const supabase =    await createClient()
    const {data} = await supabase.auth.getUser()
    const user_id = data.user?.id || ''
    const tip = await getTipById(params.id)
    if(!tip?.id)return <p>nao encontrada</p>
    return ( 

      <EditTipScreen userId={user_id} tip={tip} />
    )
}