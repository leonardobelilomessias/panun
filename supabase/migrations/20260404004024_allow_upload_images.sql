-- Permite fazer upload de imagens (INSERT)
CREATE POLICY "Permitir upload de imagens"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

-- Permite ler imagens publicamente (SELECT)
CREATE POLICY "Permitir leitura publica de imagens"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'property-images');