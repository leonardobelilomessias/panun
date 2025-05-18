
import { propertiesData } from "@/common/mocks/datamocks";
import { getPropertyById } from "@/lib/supabase/queries/client/properties/getPropertyById";
import { singin } from "@/module/auth/auth-actions";
import { NextResponse } from "next/server";

export async function GET(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
        const { id } = await params
        console.log('id vindo da pagina',id)
    try{
        const dataProperty = await getPropertyById(id)
        return NextResponse.json(dataProperty)
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
