-- Tabela de avatares dos proprietários
CREATE TABLE public.avatars_owners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_owner UUID NOT NULL REFERENCES public.owners(id) ON DELETE CASCADE,
    url_image TEXT NOT NULL,
    description TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para updated_at
CREATE TRIGGER update_avatars_owners_updated_at
    BEFORE UPDATE ON public.avatars_owners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.avatars_owners ENABLE ROW LEVEL SECURITY;

-- Política aberta para todos os usuários autenticados
CREATE POLICY "Todos podem gerenciar avatares de proprietários"
    ON public.avatars_owners FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
