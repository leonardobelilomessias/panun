import { CreateTipScreen } from "@/app/ui/Screens/Tips/CreateTipScreen";
import { createClient } from "@/utils/supabase/server";

export default async function newTip(){
    const supabase =    await createClient()
    const {data} = await supabase.auth.getUser()
    const user_id = data.user?.id
    return(<CreateTipScreen userId={user_id} />)
}