'use server';
import { createClient } from "@/utils/supabase/server";

export async function createLead(data:any) {
  try {
    const supabase = await createClient();
    
    // Formatar os dados antes de enviar para o banco
    const leadData = {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      source: data.source || null,
      interest: data.interest || null,
      status: data.status || 'Novo',
      birth_date: data.birth_date || null,
      income: data.income ? parseFloat(data.income) : null,
      marital_status: data.marital_status || null,
      fgts: data.fgts ? parseFloat(data.fgts) : null,
    };
    
    const { data: newLead, error } = await supabase
      .from("leads")
      .insert(leadData)
      .select()
      .single();
      
    if (error) {
      console.error("Erro ao criar lead:", error);
      return {
        success: false,
        error: error
      };
    }
    
    return {
      success: true,
      data: newLead
    };
  } catch (error) {
    console.error("Exceção ao criar lead:", error);
    return {
      success: false,
      error: { message: "Erro interno ao processar a solicitação" }
    };
  }
}