// Definição de tipos para Lead baseado na estrutura SQL

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  source?: string | null;
  interest?: string | null;
  status: 'Novo' | 'Em Negociação' | 'Convertido' | 'Descarte';
  birth_date?: string | null;
  income?: number | null;
  marital_status?: string | null;
  fgts?: number | null;
  city?: string | null;
  estate?: string | null;
  notes?: string | null;
  last_contact?: string | null;
  created_at?: string;
  updated_at?: string;
  converted_to_client_id?: string | null;
  main_property_id?: string | null;
  url_image?: string | null;
}

export interface CreateLeadData {
  name: string;
  phone: string;
  email?: string | null;
  source?: string | null;
  interest?: string | null;
  status?: 'Novo' | 'Em Negociação' | 'Convertido' | 'Descarte';
  birth_date?: string | null;
  income?: number | string | null;
  marital_status?: string | null;
  fgts?: number | string | null;
  city?: string | null;
  estate?: string | null;
  notes?: string | null;
}

export interface UpdateLeadData {
  name?: string;
  phone?: string;
  email?: string | null;
  source?: string | null;
  interest?: string | null;
  status?: 'Novo' | 'Em Negociação' | 'Convertido' | 'Descarte';
  birth_date?: string | null;
  income?: number | null;
  marital_status?: string | null;
  fgts?: number | null;
  city?: string | null;
  estate?: string | null;
  notes?: string | null;
  last_contact?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    [key: string]: any;
  };
}
