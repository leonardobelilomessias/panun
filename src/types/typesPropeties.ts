// Tipos para os dados retornados pelas tabelas associadas
 export interface Owner {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    type?: string;
    status?: string;
    documentation?: string;
  }
  
  export interface Agent {
    id: string;
    name: string;
    email: string;
  }
  
  export interface City {
    id: string;
    name: string;
  }
  
  export interface Neighborhood {
    id: string;
    name: string;
  }
  
  export interface Estate {
    id: string;
    name: string;
  }
  
  export interface Detail {
    id: string;
    title: string;
    full_description: string;
    shot_description: string;
    garage: number;
    bathroom: number;
    bedroom: number;
    total_area: number;
    usable_area: number;
    reference_point: string;
    furnished: boolean;
    flor: number;
    status: string;
    address: string;
    created_at: string;
    updated_at: string;
    suites: number;
    type: string;
    mobility: string;
  }
  
  export interface Finance {
    id: string;
    price: number;
    iptu: number;
    condominium: number;
    commission: number;
    status: string;
    created_at: string;
    updated_at: string;
  }
  
  // Tipagem para a propriedade
  export interface Property {
    id: string;
    street: string;
    house_number: string;
    zipcode: string;
    status: string;
    created_at: string;
    updated_at: string;
    owners: Owner;
    agents: Agent;
    cities: City;
    neighborhoods: Neighborhood;
    estates: Estate;
    details: Detail[];
    financeiro: Finance[];
  }
  export interface PropertySingle {
    id: string;
    street: string;
    house_number: string;
    zipcode: string;
    status: string;
    created_at: string;
    updated_at: string;
    owners: Owner;
    agents: Agent;
    cities: City;
    neighborhoods: Neighborhood;
    documentation_status:string;
    type_property:string
    estates: Estate;
    details: Detail[];
    financeiro: Finance[];
    purpose:string
    property_covers: PropertyCover[];
    property_images: PropertyImage[];
    amenities_details:AmenitiesDetails;
     // Agora isso é um array de objetos
  }
  
  export interface PropertyCover {
    id: string;
    property_id: string;
    url: string;
  }
  export interface PropertyImage {
    id: string;
    property_id: string;
    url: string;
    description: string;
    is_featured: boolean;
    order_index: number;
  }
  export interface AmenitiesDetails {
    amenities: {
      id: string;
      name: string;
    }[];
  }
