import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  console.log("Atualizando sessão")
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const publicRoutesProduction = ["/",'/landing', '/cadastro', '/entrar','/dashboard','/imoveis','/contato',"/sobre", "/aluguel","/venda","/imovel"];
  const publicInmaintance = ['/dashboard','/acesso-em-manutencao','/em-manutencao','/em-manutencao-vertano'];
  const publicRoutes = process.env.NEXT_PUBLIC_MAINTENANCE==="true"?publicInmaintance:publicRoutesProduction
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if(!user)
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/entrar') &&
    !request.nextUrl.pathname.startsWith('/auth')&&
    !request.nextUrl.pathname.startsWith('/api')&&
    !request.nextUrl.pathname.startsWith('/imovel')&&
    !request.nextUrl.pathname.startsWith('/aluguel')&&
    !publicRoutes.includes(request.nextUrl.pathname)

  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    const swich_site = process.env.NEXT_PUBLIC_IS_VERTANO==="true"?"/em-manutencao-vertano":"/em-manutencao"
    url.pathname = process.env.NEXT_PUBLIC_MAINTENANCE==="true"?swich_site:"/entrar"
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}