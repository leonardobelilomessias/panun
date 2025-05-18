-- Enable Row Level Security em todas as tabelas existentes
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
    END LOOP;
END $$;

-- Criar políticas liberais para todas as tabelas
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
    LOOP
        -- Política de SELECT (leitura)
        EXECUTE format('
            CREATE POLICY "Todos autenticados podem ler %s"
            ON %I FOR SELECT TO authenticated
            USING (true)',
            tbl, tbl);
        
        -- Política de INSERT (criação)
        EXECUTE format('
            CREATE POLICY "Todos autenticados podem criar %s"
            ON %I FOR INSERT TO authenticated
            WITH CHECK (true)',
            tbl, tbl);
        
        -- Política de UPDATE (atualização)
        EXECUTE format('
            CREATE POLICY "Todos autenticados podem atualizar %s"
            ON %I FOR UPDATE TO authenticated
            USING (true) WITH CHECK (true)',
            tbl, tbl);
        
        -- Política de DELETE (exclusão)
        EXECUTE format('
            CREATE POLICY "Todos autenticados podem deletar %s"
            ON %I FOR DELETE TO authenticated
            USING (true)',
            tbl, tbl);
        
        RAISE NOTICE 'Políticas criadas para tabela %', tbl;
    END LOOP;
END $$;

-- POLÍTICAS DE ACESSO PÚBLICO PARA VISUALIZAÇÃO DE IMÓVEIS

-- 1. properties
CREATE POLICY "Public SELECT on properties"
  ON properties
  FOR SELECT
  USING (true);

-- 2. details
CREATE POLICY "Public SELECT on details"
  ON details
  FOR SELECT
  USING (true);

-- 3. financeiro
CREATE POLICY "Public SELECT on financeiro"
  ON financeiro
  FOR SELECT
  USING (true);

-- 4. property_covers
CREATE POLICY "Public SELECT on property_covers"
  ON property_covers
  FOR SELECT
  USING (true);

-- 5. cities
CREATE POLICY "Public SELECT on cities"
  ON cities
  FOR SELECT
  USING (true);

-- 6. neighborhoods
CREATE POLICY "Public SELECT on neighborhoods"
  ON neighborhoods
  FOR SELECT
  USING (true);

-- 7. estates
CREATE POLICY "Public SELECT on estates"
  ON estates
  FOR SELECT
  USING (true);
CREATE POLICY "Public SELECT on property_images"
  ON property_images
  FOR SELECT
  USING (true);


CREATE POLICY "Public SELECT on agents"
  ON agents
  FOR SELECT
  USING (true);