-- Criação da função para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW(); -- Atualiza o campo updated_at para o timestamp atual
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tabela de agentes
CREATE TABLE public.agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    birth_date DATE,
    cpf TEXT UNIQUE,
    city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
    estate_id UUID REFERENCES public.estates(id) ON DELETE SET NULL,
    neighborhood_id UUID REFERENCES public.neighborhoods(id) ON DELETE SET NULL,
    street TEXT,
    house_number TEXT,
    status TEXT NOT NULL CHECK (status IN ('Ativo', 'Inativo')),
    role TEXT NOT NULL CHECK (role IN ('admin', 'agente')),
    creci TEXT,
    zipcode TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Adicionando a coluna user_id
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para a atualização de updated_at na tabela agents
CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON public.agents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
