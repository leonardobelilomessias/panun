-- Primeiro cria a função necessária
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tabela de proprietários
CREATE TABLE public.owners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('Construtora', 'Proprietário Particular')),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    cpf TEXT UNIQUE,
    cnpj TEXT UNIQUE,
    street TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para updated_at
CREATE TRIGGER update_owners_updated_at
    BEFORE UPDATE ON public.owners
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS e políticas
ALTER TABLE public.owners ENABLE ROW LEVEL SECURITY;

-- Política de SELECT
CREATE POLICY "Todos podem ver todos os proprietários"
    ON public.owners FOR SELECT
    USING (true);

-- Política de INSERT
CREATE POLICY "Administradores podem criar proprietarios"
    ON public.owners FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.agents 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Política de UPDATE
CREATE POLICY "Administradores podem atualizar proprietarios"
    ON public.owners FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.agents 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Política de DELETE
CREATE POLICY "Administradores podem deletar proprietarios"
    ON public.owners FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.agents 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );