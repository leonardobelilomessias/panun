-- Tabela de proprietários (owners) corrigida e atualizada
CREATE TABLE public.owners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Informações pessoais
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    birth_date DATE,
    cpf TEXT UNIQUE,

    -- Endereço (com relações)
    city_id UUID REFERENCES public.cities(id),
    estate_id UUID REFERENCES public.estates(id),
    neighborhood_id UUID REFERENCES public.neighborhoods(id),
    zipcode TEXT,
    street TEXT,
    house_number TEXT,

    -- Status e tipo
    status TEXT CHECK (status IN ('Ativo', 'Inativo')) DEFAULT 'Ativo',
    type TEXT NOT NULL CHECK (type IN ('Construtora', 'Proprietário Particular')),

    -- Datas de controle
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para updated_at
CREATE TRIGGER update_owners_updated_at
    BEFORE UPDATE ON public.owners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.owners ENABLE ROW LEVEL SECURITY;

-- Políticas abertas para qualquer usuário autenticado
CREATE POLICY "Todos podem gerenciar proprietários"
    ON public.owners FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
