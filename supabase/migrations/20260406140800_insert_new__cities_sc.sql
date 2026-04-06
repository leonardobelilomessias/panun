-- Migration: Inserção das cidades de Balneário Piçarras, Penha e Barra Velha (SC)
INSERT INTO public.cities (id, name, estate_id) VALUES
(uuid_generate_v4(), 'Balneário Piçarras', (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina')),
(uuid_generate_v4(), 'Penha', (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina')),
(uuid_generate_v4(), 'Barra Velha', (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'));


-- Migration: Inserção dos bairros de Balneário Piçarras, SC
INSERT INTO public.neighborhoods (id, name, city_id) VALUES
(uuid_generate_v4(), 'Centro', (SELECT id FROM public.cities WHERE name = 'Balneário Piçarras' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Itacolomi', (SELECT id FROM public.cities WHERE name = 'Balneário Piçarras' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Nossa Senhora da Conceição', (SELECT id FROM public.cities WHERE name = 'Balneário Piçarras' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Santo Antônio', (SELECT id FROM public.cities WHERE name = 'Balneário Piçarras' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Nossa Senhora da Paz', (SELECT id FROM public.cities WHERE name = 'Balneário Piçarras' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Bela Vista', (SELECT id FROM public.cities WHERE name = 'Balneário Piçarras' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina')));


-- Migration: Inserção dos bairros de Penha, SC
INSERT INTO public.neighborhoods (id, name, city_id) VALUES
(uuid_generate_v4(), 'Centro', (SELECT id FROM public.cities WHERE name = 'Penha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Armação', (SELECT id FROM public.cities WHERE name = 'Penha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Gravatá', (SELECT id FROM public.cities WHERE name = 'Penha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'São Cristóvão', (SELECT id FROM public.cities WHERE name = 'Penha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'São Nicolau', (SELECT id FROM public.cities WHERE name = 'Penha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Santa Lídia', (SELECT id FROM public.cities WHERE name = 'Penha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Nossa Senhora de Fátima', (SELECT id FROM public.cities WHERE name = 'Penha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina')));


-- Migration: Inserção dos bairros de Barra Velha, SC
INSERT INTO public.neighborhoods (id, name, city_id) VALUES
(uuid_generate_v4(), 'Centro', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Itajuba', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'São Cristóvão', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Tabuleiro', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Escalvado', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Los Angeles', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Quinta dos Açorianos', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Vila Nova', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Vila Paraguai', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Jardim Icaraí', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina'))),
(uuid_generate_v4(), 'Nova Barra Velha', (SELECT id FROM public.cities WHERE name = 'Barra Velha' AND estate_id = (SELECT id FROM public.estates WHERE uf = 'SC' AND name = 'Santa Catarina')));