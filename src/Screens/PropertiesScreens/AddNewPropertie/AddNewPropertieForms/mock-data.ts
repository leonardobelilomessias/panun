// Dados de exemplo para usar quando o Supabase não retornar dados
// Isso é útil para desenvolvimento e testes

export const mockEstates = [
  { id: "550e8400-e29b-41d4-a716-446655440000", name: "São Paulo", uf: "SP" },
  { id: "550e8400-e29b-41d4-a716-446655440001", name: "Rio de Janeiro", uf: "RJ" },
  { id: "550e8400-e29b-41d4-a716-446655440002", name: "Minas Gerais", uf: "MG" },
]

export const mockCities = [
  { id: "550e8400-e29b-41d4-a716-446655440003", name: "São Paulo", estate_id: "550e8400-e29b-41d4-a716-446655440000" },
  { id: "550e8400-e29b-41d4-a716-446655440004", name: "Campinas", estate_id: "550e8400-e29b-41d4-a716-446655440000" },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Rio de Janeiro",
    estate_id: "550e8400-e29b-41d4-a716-446655440001",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Belo Horizonte",
    estate_id: "550e8400-e29b-41d4-a716-446655440002",
  },
]

export const mockNeighborhoods = [
  { id: "550e8400-e29b-41d4-a716-446655440007", name: "Centro", city_id: "550e8400-e29b-41d4-a716-446655440003" },
  { id: "550e8400-e29b-41d4-a716-446655440008", name: "Jardins", city_id: "550e8400-e29b-41d4-a716-446655440003" },
  { id: "550e8400-e29b-41d4-a716-446655440009", name: "Ipanema", city_id: "550e8400-e29b-41d4-a716-446655440005" },
  { id: "550e8400-e29b-41d4-a716-446655440010", name: "Savassi", city_id: "550e8400-e29b-41d4-a716-446655440006" },
]

export const mockOwners = [
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "João Silva",
    phone: "(11) 99999-9999",
    email: "joao@example.com",
    status: "Ativo",
    type: "Proprietário Particular",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Maria Oliveira",
    phone: "(11) 88888-8888",
    email: "maria@example.com",
    status: "Ativo",
    type: "Proprietário Particular",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    name: "Construtora ABC",
    phone: "(11) 77777-7777",
    email: "contato@construtorabc.com",
    status: "Ativo",
    type: "Construtora",
  },
]

export const mockAgents = [
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    name: "Carlos Santos",
    phone: "(11) 66666-6666",
    email: "carlos@example.com",
    status: "Ativo",
    role: "agente",
    creci: "123456",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    name: "Ana Pereira",
    phone: "(11) 55555-5555",
    email: "ana@example.com",
    status: "Ativo",
    role: "agente",
    creci: "654321",
  },
]

export const mockAmenities = [
  { id: "550e8400-e29b-41d4-a716-446655440016", name: "Piscina" },
  { id: "550e8400-e29b-41d4-a716-446655440017", name: "Academia" },
  { id: "550e8400-e29b-41d4-a716-446655440018", name: "Churrasqueira" },
  { id: "550e8400-e29b-41d4-a716-446655440019", name: "Playground" },
  { id: "550e8400-e29b-41d4-a716-446655440020", name: "Salão de Festas" },
  { id: "550e8400-e29b-41d4-a716-446655440021", name: "Segurança 24h" },
]
