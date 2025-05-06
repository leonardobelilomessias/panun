-- Migration: Inserção das cidades da Região Metropolitana de Belo Horizonte
INSERT INTO public.cities (id, name, estate_id) VALUES
(uuid_generate_v4(), 'Belo Horizonte', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Contagem', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Betim', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Nova Lima', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Sabará', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Santa Luzia', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Ibirité', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Vespasiano', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Ribeirão das Neves', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Lagoa Santa', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Mário Campos', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'São Joaquim de Bicas', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Brumadinho', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Confins', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Ponte Nova', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Caratinga', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais')),
(uuid_generate_v4(), 'Barbacena', (SELECT id FROM public.estates WHERE uf = 'MG' AND name = 'Minas Gerais'));
