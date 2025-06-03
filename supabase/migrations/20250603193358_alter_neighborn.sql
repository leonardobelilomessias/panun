-- Up: Adiciona a constraint
ALTER TABLE public.neighborhoods 
ADD CONSTRAINT neighborhoods_name_city_id_unique UNIQUE (name, city_id);

-- Down: Remove a constraint (para rollback)
ALTER TABLE public.neighborhoods 
DROP CONSTRAINT IF EXISTS neighborhoods_name_city_id_unique;