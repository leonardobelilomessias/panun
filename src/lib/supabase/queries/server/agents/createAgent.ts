'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface CreateAgentParams {
  name: string;
  phone: string;
  email?: string;
  birth_date?: string;
  cpf: string;
  city_id?: string;
  estate_id?: string;
  neighborhood_id?: string;
  street?: string;
  house_number?: string;
  status: 'Ativo' | 'Inativo';
  role: 'admin' | 'agente';
  creci?: string;
  zipcode?: string;
}

export const createAgentByServer = async (params: CreateAgentParams) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('agents')
    .insert({
      name: params.name,
      phone: params.phone,
      email: params.email,
      birth_date: params.birth_date,
      cpf: params.cpf,
      city_id: params.city_id,
      estate_id: params.estate_id,
      neighborhood_id: params.neighborhood_id,
      street: params.street,
      house_number: params.house_number,
      status: params.status,
      role: params.role,
      creci: params.creci,
      zipcode: params.zipcode,
    });

  if (error) throw error;

  revalidatePath('/agentes'); // ajuste conforme o caminho da página
  return data;
};
