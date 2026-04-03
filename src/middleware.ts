import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export const config = {
  matcher: '/((?!_next/static|images|_next/image|favicon.ico).*)',
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // modo manutenção
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {

    // permite acessar a página de manutenção
    if (pathname === "/em-manutencao") {
      return NextResponse.next()
    }

    // redireciona qualquer outra rota
    return NextResponse.redirect(new URL("/em-manutencao", req.url))
  }

  // sessão normal
  console.log("passou da manutencao")
  return await updateSession(req)
}