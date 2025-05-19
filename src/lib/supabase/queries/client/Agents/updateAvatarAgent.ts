'use server';

import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";

export async function updateAvatarAgent(agentId: string, formData: FormData) {
  const supabase = await createClient();
  
  try {
    // Obter o arquivo do FormData
    const avatarFile = formData.get('avatar') as File | null;
    
    if (!avatarFile || !(avatarFile instanceof File)) {
      console.log("Nenhuma imagem de avatar válida para atualizar");
      return { success: true, message: "Nenhuma alteração no avatar" };
    }

    // 1. Buscar o avatar atual para excluí-lo
    const { data: currentAvatar, error: fetchError } = await supabase
      .from("avatars_agents")
      .select("id, path")
      .eq("id_agent", agentId)
      .single();
      
    // 2. Se encontrou um avatar existente, excluí-lo do storage
    if (currentAvatar && !fetchError) {
      // 2.1 Excluir o arquivo do storage
      const { error: storageError } = await supabase
        .storage
        .from("avatars-agents")
        .remove([currentAvatar.path]);
        
      if (storageError) {
        console.error(`Erro ao excluir arquivo de avatar do storage: ${currentAvatar.path}`, storageError);
        // Continuamos mesmo com erro para pelo menos atualizar no banco
      } else {
        console.log(`Arquivo de avatar anterior excluído com sucesso: ${currentAvatar.path}`);
      }
      
      // 2.2 Excluir o registro do avatar do banco de dados
      const { error: deleteError } = await supabase
        .from("avatars_agents")
        .delete()
        .eq("id", currentAvatar.id);
        
      if (deleteError) {
        console.error(`Erro ao excluir registro de avatar do banco: ${currentAvatar.id}`, deleteError);
        // Continuamos mesmo com erro para tentar inserir o novo avatar
      }
    }

    const uuidAvatar = randomUUID();
    // 3. Fazer o upload da nova imagem de avatar
    const avatarPath = `${agentId}/${uuidAvatar}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars-agents")
      .upload(avatarPath, avatarFile);
    
    if (uploadError) {
      console.error("Erro ao fazer upload do novo avatar:", uploadError);
      throw uploadError;
    }
    
    // 4. Obter a URL pública da imagem
    const { data: imageData } = supabase.storage
      .from("avatars-agents")
      .getPublicUrl(avatarPath);
    
    // 5. Inserir o novo registro do avatar no banco de dados
    const { error: insertError } = await supabase
      .from("avatars_agents")
      .insert({
        id_agent: agentId,
        url_image: imageData.publicUrl, // Alterado para url_image conforme o schema
        path: avatarPath,
        description: null // Adicionando campo description conforme o schema
      });
    
    if (insertError) {
      console.error("Erro ao inserir novo avatar no banco:", insertError);
      throw insertError;
    }
    
    return { success: true, message: "Avatar atualizado com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar avatar:", error);
    return { success: false, error };
  }
}