-- Migration: Inserção dos principais bairros de Belo Horizonte
INSERT INTO public.neighborhoods (id, name, city_id) VALUES
(uuid_generate_v4(), 'Centro', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Savassi', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Funcionários', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Lourdes', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Santa Tereza', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Santo Antônio', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Belvedere', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Barro Preto', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Mangabeiras', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Coração Eucarístico', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Jardim Canadá', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Praia do Sol', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Buritis', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'))),
(uuid_generate_v4(), 'Palmeiras', (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')));
