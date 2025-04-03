
import { singin } from "@/app/module/auth/auth-actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try{
        const {email, password} = await request.json() 
        const response = await singin({email,password})
        if(response?.id) NextResponse.redirect('/dashboard')
        return NextResponse.json(response)
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
