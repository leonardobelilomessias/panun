-- Criação da tabela avatars_agents
CREATE TABLE public.avatars_agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- ID único para o avatar
    id_agent UUID REFERENCES public.agents(id) ON DELETE CASCADE, -- Relacionamento com a tabela de agentes
    url_image TEXT NOT NULL, -- URL da imagem do avatar
    description TEXT, -- Descrição opcional para o avatar
    created_at TIMESTAMPTZ DEFAULT NOW(), -- Data de criação do avatar
    updated_at TIMESTAMPTZ DEFAULT NOW() -- Data de atualização do avatar
);

-- Trigger para a atualização de updated_at
CREATE TRIGGER update_avatars_agents_updated_at
    BEFORE UPDATE ON public.avatars_agents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); -- Função de trigger para atualizar o campo updated_at

-- Habilitar RLS (Row Level Security) na tabela avatars_agents
ALTER TABLE public.avatars_agents ENABLE ROW LEVEL SECURITY;

-- Políticas para a tabela avatars_agents
CREATE POLICY "Agentes podem ver seus próprios avatares"
    ON public.avatars_agents FOR SELECT
    USING (id_agent = auth.uid());

CREATE POLICY "Administradores podem ver todos os avatares"
    ON public.avatars_agents FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.agents 
        WHERE user_id = auth.uid() AND role = 'admin'
    ));

CREATE POLICY "Agentes podem gerenciar seus próprios avatares"
    ON public.avatars_agents FOR ALL
    TO authenticated
    USING (id_agent = auth.uid());
