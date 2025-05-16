-- Inserir um agente na tabela de agents
INSERT INTO public.agents (
    id,
    name,
    phone,
    email,
    birth_date,
    cpf,
    city_id,
    estate_id,
    neighborhood_id,
    street,
    house_number,
    status,
    role,
    creci,
    zipcode,
    user_id,
    created_at,
    updated_at
)
VALUES (
    uuid_generate_v4(),  -- Gerando um novo UUID para o agente
    'Leonardo Belo',     -- Nome do agente
    '1234567890',        -- Telefone
    'leonardobelilo@outlook.com', -- Email
    '1990-01-01',        -- Data de nascimento
    '123.456.789-00',    -- CPF
    (SELECT id FROM public.cities WHERE name = 'Belo Horizonte' LIMIT 1),    -- ID da cidade
    (SELECT id FROM public.estates WHERE name = 'Minas Gerais' LIMIT 1),     -- ID do estado
    (SELECT id FROM public.neighborhoods WHERE name = 'Centro' LIMIT 1),     -- ID do bairro
    'Rua Exemplo',       -- Endereço
    '123',               -- Número da casa
    'Ativo',             -- Status do agente (Ativo/Inativo)
    'agente',            -- Função do agente (admin/agente)
    '123456',            -- CRECI (se aplicável)
    '30123-456',         -- CEP
    '0214153b-e72f-4e53-8486-cf9dac82e344', -- ID do usuário (user_id)
    NOW(),               -- Data de criação
    NOW()                -- Data de atualização
);