import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export const config = {
  matcher: '/((?!_next/static|images|_next/image|favicon.ico).*)',
};

const publicRoutes = ["/",'/landing', '/cadastro', '/entrar','/dashboard'];

export async function middleware(req: NextRequest) {
  return await updateSession(req)

  if(req.nextUrl.pathname ==='/acesso-em-manutencao' || req.nextUrl.pathname ==="acesso-em-manutenção") {
    return await updateSession(req)
    
  }
  if(req.nextUrl.pathname ==='/em-manutencao' || req.nextUrl.pathname ==="acesso-em-manutencao")  return NextResponse.next()

  if(process.env.NEXT_PUBLIC_MAINTENANCE==="true") return NextResponse.redirect(new URL('/em-manutencao', req.url))
  return NextResponse.next()
  // const res = NextResponse.next();

  // // const supabase =  createMiddlewareClient({ req, res });
  
  // try{
  //   // const seessionSupabase = await supabase.auth.getSession()
  //   console.log( "sessão no midleware")
  //   const supabase = createMiddlewareClient({ req: req, res });
  //   const pathname = req.nextUrl.pathname;
  // const sessionsupabase =   await supabase.auth.getSession();
    
  //   if (publicRoutes.includes(pathname)) {
  //     return NextResponse.next();
  //   }
    
  //   const session = await AuthService.isSessionValid()
  //   console.log(session, 'seesion')
  //   if (!session || !sessionsupabase?.data?.session) {
  //     const isAPIRoute = pathname.startsWith('/api');
      
  //     if (isAPIRoute) {
  //       return NextResponse.next()
  //     }
      
  //     return NextResponse.redirect(new URL('/entrar', req.url));
  //   }
    
  //   return NextResponse.next();
  // }catch (error) {
  //   console.error('Erro no middleware:', error);
  // }
}