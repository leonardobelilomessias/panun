'use server'
import { createClient } from "@/utils/supabase/server";

export async function updateAgent(agentId: string, data: any) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("leads")
      .update(data)
      .eq("id", agentId);

    if (error) {
      console.error("Erro ao atualizar agente:", error);
      return { 
        success: false, 
        error: error 
      };
    }

    return { 
      success: true 
    };
  } catch (error) {
    console.error("Exceção ao atualizar agente:", error);
    return { 
      success: false, 
      error: { message: "Erro interno ao processar a solicitação" } 
    };
  }
}