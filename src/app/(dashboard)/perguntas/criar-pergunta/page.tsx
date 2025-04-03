import { CreateQuestionScreen } from "@/app/ui/Screens/Questions/CreateQuestionScreen";
import { createClient } from "@/utils/supabase/server";


export default async function CreateQuestionPage() {
      const supabase =    await createClient()
      const {data} = await supabase.auth.getUser()
      const user_id = data.user?.id
  
  return <CreateQuestionScreen userId={user_id} />;
} 