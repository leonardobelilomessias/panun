
import { agentsData, propertiesData } from "@/common/mocks/datamocks";
import { singin } from "@/module/auth/auth-actions";
import { supabaseClient } from "@/lib/supabase/client";
import { supabase } from "@/lib/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10

    try{
        const agents = await getAgentsSupabase()
        return NextResponse.json({agents:agents})
    }
    catch(error:any){
        if(error==='invalid_credentials'){
                console.log(error,"na rota singin, invalid-credential")
                const response = new Response(JSON.stringify({message:'invalid_credentials'}),{status:402})
                return response
            }
            if(error==='email_not_confirmed'){
                console.log(error,"na rota singin, email_not_confirmed")
                const response = new Response(JSON.stringify({message:'email_not_confirmed'}),{status:403})
                return response
            }
            const response = new Response(JSON.stringify({message:'generic_error'}),{status:400})
            return response
    }
    
}
interface Agent {
    id: string;
}

async function getAgentsSupabase(): Promise<Agent[]> {
    const { data, error } = await supabaseClient().from('agents').select('*');
    if (error) throw error;
    const agents = data as Agent[];
    return agents;
}