
import { singin, singup } from "@/app/module/auth/auth-actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    const response = await singup({ email, password, name })
    return NextResponse.json(JSON.stringify({ response }))
  } catch (error: any) {
    if (error.code === "over_email_send_rate_limit") {
      const response = new Response(JSON.stringify({ message: error.code }), {
        status: 429
      })
      return response

    }
    
    if (error.code === '42501') {
      const response = new Response(JSON.stringify({ message: error.message }), {
        status: 402
      })
      return response

    }
    console.log("error aquii", error)
    const response = new Response(JSON.stringify({ message: error }), {
      status: 401
    })
    return response

  }
}

