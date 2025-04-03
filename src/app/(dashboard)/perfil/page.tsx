import { ProfileScreen } from "@/app/ui/Screens/ProfileScreen";
import { createClient } from "@/utils/supabase/server";

interface IParams {
    params: {
        id: string;
    }
}

export default async function metas({params}:IParams) {
    const supabase = await createClient();
    const {data:{user}}  =await  supabase.auth.getUser()
    const {data, error} = await supabase.from('profiles').select('*').eq('id', user?.id).single()
    if(error) console.error(error)
    if(!data) console.error('User not found')
    const foundUser = data
    return(<ProfileScreen user={foundUser}/>)
}