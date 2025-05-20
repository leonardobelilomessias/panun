'use server'
import { getRedirectUrl } from "@/utils/supabase/getRedirectUrl";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/serverAdmin";

export async function insertAgent(data: any) {
  const supabase = await createClient();
console.log
  // Extrair dados necessários
  const email = data.email?.trim();
  const name = data.name?.trim();
  const birthDate = data.birth_date; // formato esperado: YYYY-MM-DD

  if (!email || !name || !birthDate) {
    return {
      error: {
        message: "Email, nome e data de nascimento são obrigatórios para criar o usuário.",
      },
    };
  }

  // Gerar senha baseada no nome + ano de nascimento
  const firstName = name.split(" ")[0].toLowerCase();
  const birthYear = new Date(birthDate).getFullYear();
  const password = `${firstName}${birthYear}`; // exemplo: joao1990
  console.log(password)
  const userSupabase = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        display_name: data.name, // Aqui adicionamos o nome de exibição no metadata
      },
      emailRedirectTo: getRedirectUrl(),
    },
  });
  // Criar usuário no auth

  if (userSupabase.error || !userSupabase.data?.user?.id) {
    return { error: { message: userSupabase?.error || "Erro ao criar usuário no Supabase Auth." } };
  }
  
  // Inserir agente com o user_id vinculado
  const { error, data: agent } = await supabase.from("agents").insert([
    {
      ...data,
      user_id: userSupabase.data.user.id,
    },
  ]);
  if(error&&!!userSupabase.data?.user?.id){
     await supabaseAdmin.auth.admin.deleteUser(userSupabase.data?.user?.id);
  }

  return { error, data: agent };
}
