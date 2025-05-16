-- Função para atualizar o updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tabela de propriedades
CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_owner UUID REFERENCES public.owners(id) ON DELETE SET NULL,
    id_agent UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    street TEXT,
    house_number TEXT,
    zipcode TEXT,
    purpose TEXT NOT NULL DEFAULT 'Venda' CHECK (
        purpose IN ('Aluguel', 'Venda')
    ),
    documentation_status TEXT NOT NULL DEFAULT 'Regular' CHECK (
        documentation_status IN ('Regular', 'Irregular')
    ),
    type_property TEXT NOT NULL DEFAULT 'Casa' CHECK (
        type_property IN ('Casa', 'Apartamento', 'Lote', 'Loja')
    ),
    status TEXT NOT NULL DEFAULT 'Disponível' CHECK (
        status IN ('Disponível', 'Reservado', 'Vendido', 'Alugado', 'Indisponível')
    ),
    city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
    neighborhood_id UUID REFERENCES public.neighborhoods(id) ON DELETE SET NULL,
    estate_id UUID REFERENCES public.estates(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para updated_at da propriedade
CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Tabela de detalhes da propriedade
CREATE TABLE public.details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    propertie_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    title TEXT,
    full_description TEXT,
    shot_description TEXT,
    garage INTEGER,
    bathroom INTEGER,
    bedroom INTEGER,
    total_area NUMERIC(10,2),
    usable_area NUMERIC(10,2),
    reference_point TEXT,
    furnished BOOLEAN,
    flor INTEGER,
    status TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para updated_at de details
CREATE TRIGGER update_details_updated_at
    BEFORE UPDATE ON public.details
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Tabela de dados financeiros da propriedade
CREATE TABLE public.financeiro (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    propertie_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    price NUMERIC(12,2),
    iptu NUMERIC(10,2),
    condominium NUMERIC(10,2),
    commission NUMERIC(5,2),
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para updated_at do financeiro
CREATE TRIGGER update_financeiro_updated_at
    BEFORE UPDATE ON public.financeiro
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Ativa RLS em todas as tabelas
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financeiro ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso total para todos os usuários autenticados
CREATE POLICY "Todos podem gerenciar propriedades"
    ON public.properties FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

CREATE POLICY "Todos podem gerenciar detalhes"
    ON public.details FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

CREATE POLICY "Todos podem gerenciar financeiro"
    ON public.financeiro FOR ALL TO authenticated
    USING (true) WITH CHECK (true);
