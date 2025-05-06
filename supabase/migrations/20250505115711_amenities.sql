-- Tabela de amenities (características)
CREATE TABLE public.amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL
);

-- Tabela de vínculo entre propriedades e amenities
CREATE TABLE public.amenities_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_propertie UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    id_amenitie UUID NOT NULL REFERENCES public.amenities(id) ON DELETE CASCADE
);

-- Ativar RLS
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenities_details ENABLE ROW LEVEL SECURITY;

-- Políticas liberais para todos os usuários autenticados
CREATE POLICY "Todos podem gerenciar amenities"
    ON public.amenities FOR ALL TO authenticated
    USING (true) WITH CHECK (true);

CREATE POLICY "Todos podem gerenciar amenities_details"
    ON public.amenities_details FOR ALL TO authenticated
    USING (true) WITH CHECK (true);
