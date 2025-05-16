-- Migration para adicionar tabelas de capa e imagens das propriedades

-- Tabela de capa da propriedade (imagem principal)
CREATE TABLE public.property_covers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    path TEXT NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de imagens da propriedade
CREATE TABLE public.property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    path TEXT NOT NULL,
    description TEXT,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers para atualizar updated_at
CREATE TRIGGER update_property_covers_updated_at
    BEFORE UPDATE ON public.property_covers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_images_updated_at
    BEFORE UPDATE ON public.property_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Ativar Row Level Security
ALTER TABLE public.property_covers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Todos podem ver capas de propriedades"
    ON public.property_covers FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Proprietários e administradores podem gerenciar capas"
    ON public.property_covers FOR ALL TO authenticated
    USING (auth.uid() = created_by OR auth.role() = 'admin')
    WITH CHECK (auth.uid() = created_by OR auth.role() = 'admin');

CREATE POLICY "Todos podem ver imagens de propriedades"
    ON public.property_images FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Proprietários e administradores podem gerenciar imagens"
    ON public.property_images FOR ALL TO authenticated
    USING (auth.uid() = created_by OR auth.role() = 'admin')
    WITH CHECK (auth.uid() = created_by OR auth.role() = 'admin');

-- Índice para melhorar performance nas queries por property_id
CREATE INDEX idx_property_covers_property_id ON public.property_covers(property_id);
CREATE INDEX idx_property_images_property_id ON public.property_images(property_id);
CREATE INDEX idx_property_images_order_index ON public.property_images(property_id, order_index);