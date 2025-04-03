-- Tabela de propriedades
CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    status TEXT NOT NULL DEFAULT 'Disponível' CHECK (status IN ('Disponível', 'Reservado', 'Vendido', 'Alugado', 'Indisponível')),
    type TEXT NOT NULL CHECK (type IN ('Apartamento', 'Casa', 'Cobertura', 'Terreno', 'Comercial', 'Rural')),
    purpose TEXT NOT NULL CHECK (purpose IN ('Venda', 'Aluguel', 'Temporada')),
    origin TEXT NOT NULL CHECK (origin IN ('Construtora', 'Proprietário Particular')),
    owner_id UUID REFERENCES public.owners(id) ON DELETE SET NULL,
    construction_company TEXT,
    internal_notes TEXT,
    total_area NUMERIC(10, 2),
    usable_area NUMERIC(10, 2),
    bedrooms INTEGER,
    bathrooms INTEGER,
    suites INTEGER,
    garage_spaces INTEGER,
    floor INTEGER,
    year_built INTEGER,
    furnished BOOLEAN,
    description TEXT,
    virtual_tour_url TEXT,
    street TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    reference_point TEXT,
    responsible_agent UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    lead_source TEXT CHECK (lead_source IN ('Indicação', 'Site', 'Redes Sociais', 'Outros')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para características adicionais
CREATE TABLE public.property_features (
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    feature TEXT NOT NULL CHECK (feature IN ('Pet place','Varanda','Acessibilidade','Piscina', 'Churrasqueira', 'Elevador', 'Academia', 'Salão de festas', 'Pet Friendly', 'Portaria 24h', 'Câmeras', 'Playground','Bicicletario', 'Quadra','Area privativa','Coworking','Area de lavar')),
    PRIMARY KEY (property_id, feature)
);

-- Tabela para fotos da propriedade
CREATE TABLE public.property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para valores financeiros
CREATE TABLE public.property_financials (
    property_id UUID PRIMARY KEY REFERENCES public.properties(id) ON DELETE CASCADE,
    sale_price NUMERIC(12, 2),
    rent_price NUMERIC(10, 2),
    iptu_price NUMERIC(10, 2),
    condo_fee NUMERIC(10, 2),
    commission_percentage NUMERIC(5, 2),
    commission_value NUMERIC(10, 2),
    document_status TEXT CHECK (document_status IN ('Regular', 'Em andamento', 'Pendências'))
);

-- Tabela para interessados
CREATE TABLE public.property_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    history TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers
CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_leads_updated_at
    BEFORE UPDATE ON public.property_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS e políticas
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_leads ENABLE ROW LEVEL SECURITY;

-- Políticas para properties
CREATE POLICY "Todos podem ver propriedades disponíveis"
    ON public.properties FOR SELECT
    USING (status = 'Disponível');

CREATE POLICY "Agentes podem ver todas as propriedades"
    ON public.properties FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.agents 
        WHERE user_id = auth.uid()
    ));

CREATE POLICY "Agentes podem gerenciar suas propriedades"
    ON public.properties FOR ALL
    TO authenticated
    USING (agent_id IN (
        SELECT id FROM public.agents WHERE user_id = auth.uid()
    ));

-- Políticas para features, images e financials (herdam do property)
CREATE POLICY "Herda permissões da propriedade"
    ON public.property_features FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.properties 
        WHERE id = property_id AND (
            status = 'Disponível' OR
            agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
        )
    ));

-- Políticas similares para property_images e property_financials...

-- Políticas para leads
CREATE POLICY "Agentes podem ver leads de suas propriedades"
    ON public.property_leads FOR SELECT
    TO authenticated
    USING (property_id IN (
        SELECT id FROM public.properties 
        WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    ));

CREATE POLICY "Agentes podem gerenciar leads de suas propriedades"
    ON public.property_leads FOR ALL
    TO authenticated
    USING (property_id IN (
        SELECT id FROM public.properties 
        WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    ));