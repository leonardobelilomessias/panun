-- Tabela de agentes (corretores)
CREATE TABLE public.agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    birth_date DATE,
    cpf TEXT UNIQUE,
    creci TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    role TEXT NOT NULL DEFAULT 'agent' CHECK (role IN ('admin', 'agent', 'manager')),
    street TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para updated_at


-- RLS e políticas
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ver agentes ativos" 
    ON public.agents FOR SELECT
    USING (status = 'active');

CREATE POLICY "Agentes podem ver suas próprias informações"
    ON public.agents FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Administradores podem gerenciar todos os agentes"
    ON public.agents FOR ALL
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.agents 
        WHERE user_id = auth.uid() AND role = 'admin'
    ));

CREATE POLICY "Agentes podem editar suas próprias informações"
    ON public.agents FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);