-- Bucket para imagens dos imóveis
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'property-images',
  'property-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT DO NOTHING;

-- Bucket para avatars dos agentes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars-agents',
  'avatars-agents',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT DO NOTHING;

-- Policies: property-images
CREATE POLICY "Public read property-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated upload property-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Authenticated update property-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated delete property-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'property-images');

-- Policies: avatars-agents
CREATE POLICY "Public read avatars-agents"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars-agents');

CREATE POLICY "Authenticated upload avatars-agents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars-agents');

CREATE POLICY "Authenticated update avatars-agents"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars-agents');

CREATE POLICY "Authenticated delete avatars-agents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars-agents');
