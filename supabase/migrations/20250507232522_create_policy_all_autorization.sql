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

  -- Enable Row Level Security on both tables
ALTER TABLE public.avatars_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avatars_owners ENABLE ROW LEVEL SECURITY;

-- Policies for avatars_agents table
-- SELECT policy: Allow public read access
CREATE POLICY "Enable public read access for avatars_agents" 
ON public.avatars_agents
FOR SELECT USING (true);

-- INSERT policy: Allow public insert
CREATE POLICY "Enable public insert for avatars_agents" 
ON public.avatars_agents
FOR INSERT WITH CHECK (true);

-- UPDATE policy: Allow public update
CREATE POLICY "Enable public update for avatars_agents" 
ON public.avatars_agents
FOR UPDATE USING (true) WITH CHECK (true);

-- DELETE policy: Allow public delete
CREATE POLICY "Enable public delete for avatars_agents" 
ON public.avatars_agents
FOR DELETE USING (true);

-- Policies for avatars_owners table
-- SELECT policy: Allow public read access
CREATE POLICY "Enable public read access for avatars_owners" 
ON public.avatars_owners
FOR SELECT USING (true);

-- INSERT policy: Allow public insert
CREATE POLICY "Enable public insert for avatars_owners" 
ON public.avatars_owners
FOR INSERT WITH CHECK (true);

-- UPDATE policy: Allow public update
CREATE POLICY "Enable public update for avatars_owners" 
ON public.avatars_owners
FOR UPDATE USING (true) WITH CHECK (true);

-- DELETE policy: Allow public delete
CREATE POLICY "Enable public delete for avatars_owners" 
ON public.avatars_owners
FOR DELETE USING (true);

-- Habilita RLS na tabela storage.buckets (geralmente já vem habilitado)


-- Política para permitir acesso público ao bucket avatars-agents
CREATE POLICY "Allow public access to avatars-agents bucket"
ON storage.objects
FOR ALL USING (
  bucket_id = 'avatars-agents'
);