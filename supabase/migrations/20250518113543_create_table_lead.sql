-- Tabela de leads (contatos potenciais)
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    income NUMERIC(12,2),
    marital_status TEXT,
    fgts NUMERIC(12,2),
    -- Informações básicas
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    source TEXT CHECK (source IN ('Site', 'Redes Sociais', 'Indicação', 'Outdoor', 'Outros')),
    interest TEXT, -- Ex: "Apartamento 3 quartos em São Paulo"
    birth_date DATE,
    -- Relacionamento futuro com clientes (opcional)
    converted_to_client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    -- Propriedade principal de interesse
    main_property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    -- Status do lead
    status TEXT NOT NULL DEFAULT 'Novo' CHECK (status IN ('Novo', 'Em Negociação', 'Convertido', 'Descarte')),
    -- Metadados
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de relacionamento lead x propriedades (N:N)
CREATE TABLE public.lead_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    interest_level TEXT CHECK (interest_level IN ('Alto', 'Médio', 'Baixo')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para atualização automática
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para leads
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_properties ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para leads
CREATE POLICY "Todos podem gerenciar leads"
    ON public.leads
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Políticas de acesso para lead_properties
CREATE POLICY "Todos podem gerenciar relacionamentos lead-imóveis"
    ON public.lead_properties
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Índices para melhor performance
CREATE INDEX idx_lead_properties_lead ON public.lead_properties(lead_id);
CREATE INDEX idx_lead_properties_property ON public.lead_properties(property_id);
CREATE INDEX idx_leads_main_property ON public.leads(main_property_id);
CREATE INDEX idx_leads_status ON public.leads(status);