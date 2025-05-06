-- Tabela de clientes
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    birth_date DATE,
    cpf TEXT UNIQUE,
    
    city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
    estate_id UUID REFERENCES public.estates(id) ON DELETE SET NULL,
    neighborhood_id UUID REFERENCES public.neighborhoods(id) ON DELETE SET NULL,
    
    zipcode TEXT,
    street TEXT,
    house_number TEXT,
    
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    type TEXT NOT NULL CHECK (type IN ('Pessoa Física', 'Pessoa Jurídica')),

    agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso abertas para usuários autenticados
CREATE POLICY "Todos podem gerenciar clientes"
    ON public.clients FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
