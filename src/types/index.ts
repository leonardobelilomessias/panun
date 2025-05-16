export type Estate = {
  id: string
  name: string
  uf: string
}

export type City = {
  id: string
  name: string
  estate_id: string
}

export type Neighborhood = {
  id: string
  name: string
  city_id: string
}

export type Owner = {
  id: string
  name: string
  phone: string
  email?: string
  birth_date?: string
  cpf?: string
  city_id?: string
  estate_id?: string
  neighborhood_id?: string
  zipcode?: string
  street?: string
  house_number?: string
  status: string
  type: string
}

export type Agent = {
  id: string
  name: string
  phone: string
  email?: string
  birth_date?: string
  cpf?: string
  city_id?: string
  estate_id?: string
  neighborhood_id?: string
  street?: string
  house_number?: string
  status: string
  role: string
  creci?: string
  zipcode?: string
  user_id?: string
}

export type Amenity = {
  id: string
  name: string
}
