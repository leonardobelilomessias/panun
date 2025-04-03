-- Primeiro cria a função necessária


-- Tabela de clientes (mantendo sua estrutura original)
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    cpf TEXT UNIQUE,
    street TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    origin TEXT NOT NULL CHECK (origin IN ('Redes Sociais', 'Anúncios Google', 'Anúncios Instagram', 'Captação', 'Anúncios Facebook', 'Anúncios Youtube', 'Indicação')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de interesses do cliente (mantendo sua estrutura original)
CREATE TABLE public.client_interests (
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    interest TEXT NOT NULL CHECK (interest IN ('Apartamento', 'Casa', 'Cobertura', 'Terreno', 'Comercial', 'Rural')),
    PRIMARY KEY (client_id, interest)
);

-- Trigger para updated_at
CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_interests ENABLE ROW LEVEL SECURITY;

-- 1. Políticas para a tabela clients

-- SELECT: Agentes veem seus próprios clientes + admins veem todos
CREATE POLICY "Agentes podem ver seus clientes"
    ON public.clients FOR SELECT
    TO authenticated
    USING (
        agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()) OR
        EXISTS (SELECT 1 FROM public.agents WHERE user_id = auth.uid() AND role = 'admin')
    );

-- INSERT: Agentes podem criar clientes para si mesmos
CREATE POLICY "Agentes podem adicionar clientes"
    ON public.clients FOR INSERT
    TO authenticated
    WITH CHECK (
        agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    );

-- INSERT: Admins podem criar clientes para qualquer agente
CREATE POLICY "Admins podem adicionar clientes para qualquer agente"
    ON public.clients FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (SELECT 1 FROM public.agents WHERE user_id = auth.uid() AND role = 'admin')
    );

-- UPDATE: Agentes podem editar apenas seus clientes
CREATE POLICY "Agentes podem editar seus clientes"
    ON public.clients FOR UPDATE
    TO authenticated
    USING (
        agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    )
    WITH CHECK (
        agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    );

-- UPDATE: Admins podem editar qualquer cliente
CREATE POLICY "Admins podem editar qualquer cliente"
    ON public.clients FOR UPDATE
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM public.agents WHERE user_id = auth.uid() AND role = 'admin')
    )
    WITH CHECK (
        EXISTS (SELECT 1 FROM public.agents WHERE user_id = auth.uid() AND role = 'admin')
    );

-- DELETE: Agentes podem deletar apenas seus clientes
CREATE POLICY "Agentes podem deletar seus clientes"
    ON public.clients FOR DELETE
    TO authenticated
    USING (
        agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    );

-- DELETE: Admins podem deletar qualquer cliente
CREATE POLICY "Admins podem deletar qualquer cliente"
    ON public.clients FOR DELETE
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM public.agents WHERE user_id = auth.uid() AND role = 'admin')
    );

-- 2. Políticas para a tabela client_interests

-- SELECT: Agentes veem interesses de seus clientes + admins veem todos
CREATE POLICY "Agentes podem ver interesses de seus clientes"
    ON public.client_interests FOR SELECT
    TO authenticated
    USING (
        client_id IN (SELECT id FROM public.clients WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())) OR
        EXISTS (SELECT 1 FROM public.agents WHERE user_id = auth.uid() AND role = 'admin')
    );

-- INSERT: Agentes podem adicionar interesses a seus clientes
CREATE POLICY "Agentes podem adicionar interesses a seus clientes"
    ON public.client_interests FOR INSERT
    TO authenticated
    WITH CHECK (
        client_id IN (SELECT id FROM public.clients WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()))
    );

-- INSERT: Admins podem adicionar interesses a qualquer cliente
CREATE POLICY "Admins podem adicionar interesses a qualquer cliente"
    ON public.client_interests FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (SELECT 1 FROM public.agents WHERE user_id = auth.uid() AND role = 'admin')
    );

-- DELETE: Agentes podem remover interesses de seus clientes
CREATE POLICY "Agentes podem remover interesses de seus clientes"
    ON public.client_interests FOR DELETE
    TO authenticated
    USING (
        client_id IN (SELECT id FROM public.clients WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()))
    );

-- DELETE: Admins podem remover interesses de qualquer cliente
CREATE POLICY "Admins podem remover interesses de qualquer cliente"
    ON public.client_interests FOR DELETE
    TO authenticated
    USING (
        EXISTS (SELECT 1 FROM public.agents WHERE user_id = auth.uid() AND role = 'admin')
    );