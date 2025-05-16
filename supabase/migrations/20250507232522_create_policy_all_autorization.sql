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