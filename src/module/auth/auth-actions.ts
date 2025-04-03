'use server'
import { AuthService } from "./auth-services";
import { createClient } from "@/utils/supabase/server";
import { getUserByEmail } from "@/lib/supabase/queries/server/user";

export async function singin(data:{email:string, password:string}) {
  const supabase = await createClient()
    try {
        const { email, password } = data;
        const userCredential = await supabase.auth.signInWithPassword({email, password,});
        const user = userCredential.data.user;
        if(!user?.id){
          throw new Error().name = userCredential.error?.code as string
          
        }
        if(user?.id){
         console.log(userCredential.data)
          await AuthService.createSessionToken({user_id:user.id,token_supabase:userCredential.data.session.access_token}) 
        }
        return user
      } catch (error) {

          console.log("Erro em auth singin:", error);
          throw error
        
      }
}

export async function singup(data:{email:string, password:string,name:string}) {
  const supabase = await createClient()
  try {
    const {error, user} = await getUserByEmail(data.email);
    if (user) {
      throw Error().message ="User alredy exist";
      
    }
    const userSupabase = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          display_name: data.name, // Aqui adicionamos o nome de exibição no metadata
        },
      },
    });
    if (userSupabase.error) {   
      throw userSupabase.error
      return;
    }
    if (userSupabase.data.user) {
      const user = userSupabase.data.user
      if(user?.id){
        console.log('user com id', user.id)
        await AuthService.createSessionToken({user_id:user.id})
      }
      return user
    }
  } catch (error:any) {
    console.error("Erro ao criar usuário no cat:", error);
    return  error
  }
}  





