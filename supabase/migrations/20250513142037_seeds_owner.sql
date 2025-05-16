-- Inserir um proprietário na tabela de owners
INSERT INTO public.owners (
    id,
    name,
    phone,
    email,
    birth_date,
    cpf,
    city_id,
    estate_id,
    neighborhood_id,
    zipcode,
    street,
    house_number,
    status,
    type,
    created_at,
    updated_at
)
VALUES (
    uuid_generate_v4(),  -- Gerando um novo UUID para o proprietário
    'Maria Silva',       -- Nome do proprietário
    '31987654321',       -- Telefone
    'maria.silva@example.com', -- Email
    '1985-05-15',       -- Data de nascimento
    '987.654.321-00',    -- CPF
    (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' LIMIT 1),    -- ID da cidade
    (SELECT id FROM public.estates WHERE name = 'Minas Gerais' LIMIT 1),     -- ID do estado
    (SELECT id FROM public.neighborhoods WHERE name = 'Centro' LIMIT 1),     -- ID do bairro
    '30123-456',         -- CEP
    'Avenida Paulista',  -- Endereço
    '1000',              -- Número da casa
    'Ativo',             -- Status do proprietário
    'Proprietário Particular', -- Tipo de proprietário
    NOW(),               -- Data de criação
    NOW()                -- Data de atualização
);

-- Inserir uma construtora como proprietário
INSERT INTO public.owners (
    id,
    name,
    phone,
    email,
    birth_date,
    cpf,
    city_id,
    estate_id,
    neighborhood_id,
    zipcode,
    street,
    house_number,
    status,
    type,
    created_at,
    updated_at
)
VALUES (
    uuid_generate_v4(),  -- Gerando um novo UUID para a construtora
    'Construtora ABC Ltda', -- Nome da construtora
    '3133334444',        -- Telefone
    'contato@construtoraabc.com.br', -- Email
    NULL,                -- Data de nascimento não aplicável
    '123.456.789/0001-99', -- CNPJ no campo CPF (ajuste conforme sua validação)
    (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' LIMIT 1),    -- ID da cidade
    (SELECT id FROM public.estates WHERE name = 'Minas Gerais' LIMIT 1),     -- ID do estado
    (SELECT id FROM public.neighborhoods WHERE name = 'Centro' LIMIT 1),     -- ID do bairro
    '01452-000',         -- CEP
    'Rua Oscar Freire',  -- Endereço
    '2000',              -- Número
    'Ativo',             -- Status
    'Construtora',       -- Tipo de proprietário
    NOW(),               -- Data de criação
    NOW()                -- Data de atualização
);