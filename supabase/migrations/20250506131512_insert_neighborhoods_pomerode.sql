-- Migration: Inserção dos principais bairros de Pomerode, SC
INSERT INTO public.neighborhoods (id, name, city_id) VALUES
(uuid_generate_v4(), 'Centro', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Testo Alto', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Pomerode Fundos', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Vila Formosa', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Rio do Testo', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Vila Nova', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Bairro Ribeirão Grande', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Bairro Testo Central', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Bairro Testo Rega', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Bairro Hermann Weege', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Bairro Jardim Pomerânia', (SELECT id FROM public.cities WHERE name = 'Pomerode' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina')));