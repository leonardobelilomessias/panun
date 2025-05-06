-- Tabela de estados
CREATE TABLE public.estates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    uf CHAR(2) NOT NULL UNIQUE -- Sigla como 'SP', 'RJ', etc.
);

-- Tabela de cidades
CREATE TABLE public.cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    estate_id UUID REFERENCES public.estates(id) ON DELETE CASCADE -- Relação com o estado
);

-- Tabela de bairros
CREATE TABLE public.neighborhoods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE -- Relação com a cidade
);

-- Políticas de permissões (para qualquer usuário)
-- Para a tabela states
ALTER TABLE public.estates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Qualquer pessoa pode inserir, alterar, deletar ou atualizar estados"
    ON public.estates FOR ALL
    TO public
    USING (true);

-- Para a tabela cities
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Qualquer pessoa pode inserir, alterar, deletar ou atualizar cidades"
    ON public.cities FOR ALL
    TO public
    USING (true);

-- Para a tabela neighborhoods
ALTER TABLE public.neighborhoods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Qualquer pessoa pode inserir, alterar, deletar ou atualizar bairros"
    ON public.neighborhoods FOR ALL
    TO public
    USING (true);
