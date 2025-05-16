'use client'

import { useEffect, useState } from 'react';

import { PropertyVideo } from "./PropertyVideo";
import { PropertyLeadManagement } from "./PropertyLeadManagement";

import { getPropertyById } from '@/lib/supabase/queries/client/properties/getPropertyById';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Agent, AmenitiesDetails, PropertySingle } from '@/types/typesPropeties';

import { PropertyHeader } from './PropertyHeader';
import useSWR from 'swr';
import { PropertyDetails } from './PropertyDetails';
import { PropertyLocation } from './PropertyLocation';
import { PropertyAmenities } from './PropertyAmenities';
import { PropertyFinancial } from './PropertyFinancial';
import { PropertyGallery } from './PropertyGallery';
import { PropertyCover } from './PropertyCover';
import { PropertyOwner } from './PropertyOwner';

// Property-related types
export type PropertyOwnerType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type?: string;
  status?: string;
  documentation?: string;
};

export type PropertyFinancialType = {
  price: string;
  iptu?: string;
  condominium?: string;
  commission?: string;
};

export type PropertyLeadType = {
  broker?: string;
  visitHistory?: string;
  interestedClients?: string;
  registrationDate?: string;
  updateDate?: string;
};

export type PropertyScreenData = {
  id: string;
  title: string;
  short_description?: string;
  full_description: string;
  price: string;
  bedroom: number;
  bathroom: number;
  total_area: number;
  useful_area?: number;
  garage: number;
  city: {name: string, id: string};
  neighborhood:{name: string, id: string};
  estate: {name: string, id: string};
  street: string;
  number: string;
  zipCode: string;
  reference: string;
  purpose: string;
  status: string;
  type: string;
  floor: string;
  mobility: string;
  suites: number;
  owner: PropertyOwnerType;
  amenities: {name: string,id:string}[];
  financial: PropertyFinancialType;
  leads: PropertyLeadType;
  images: string[];
  coverImage: string;
  videoUrl?: string;
  documentationStatus?: string;
  capturedBy?: Agent;
};

type PropertyScreenDashboardProps = {
  id: string;
};

export function PropertiesScreenDashboard({ id }: PropertyScreenDashboardProps) {

  // Usar o SWR para buscar dados com o ID como chave
  const { data, error, isLoading, mutate } = useSWR(
    `property-${id}`, 
    () => getPropertyById(id),
    {
      revalidateOnFocus: true,
      keepPreviousData: false,
    }
  );
  function reloadEdit(){

    mutate()
  } 

  // Transformar os dados brutos em PropertyScreenData
  const transformData = (rawData: any): PropertyScreenData => {
    // Pegando o primeiro item dos arrays, conforme o schema
    const details = Array.isArray(rawData.details) ? rawData.details[0] : null;
    const financial = Array.isArray(rawData.financeiro) ? rawData.financeiro[0] : null;
    const cover = Array.isArray(rawData.property_covers) ? rawData.property_covers[0] : null;
    const images = Array.isArray(rawData.property_images) ? rawData.property_images : [];
    const transformedAmenities = Array.isArray(data?.amenities_details)
    ? Array.isArray(rawData.amenities_details) 
      ? rawData.amenities_details.map((item: {amenities:{id:string,name:string}}) => item.amenities)
      : []
    : [];

    return {
      id: rawData.id || 'Sem informação',
      title: details?.title || 'Título não disponível',
      short_description: details?.shot_description || 'sem descrição',
      full_description: details?.full_description || 'sem descrição',
      price: financial?.price?.toString() || '0',
      bedroom: details?.bedroom || 0,
      bathroom: details?.bathroom || 0,
      total_area: details?.total_area || 0,
      useful_area: details?.usable_area || 0,
      garage: details?.garage || 0,
      city: rawData.cities|| 'Sem informação',
      neighborhood: rawData.neighborhoods || 'Sem informação',
      street: rawData.street || 'Sem informação',
      number: rawData.house_number || 'Sem informação',
      zipCode: rawData.zipcode || 'Sem informação',
      reference: details?.reference_point || 'Sem informação',
      purpose: rawData?.purpose || 'Sem informação',
      status: rawData.status || 'Não informado',
      type: rawData?.type_property || 'Não informado',
      floor: details?.flor?.toString() || 'Sem informação',
      mobility: details?.furnished ? 'Sim' : 'Não',
      suites: details?.suites || 0,
      documentationStatus: rawData?.documentation_status||"não informado",
      estate: {
        name: rawData.estates?.name || 'Sem informação',
        id: rawData.estates?.id || 'Sem informação',
      },
      owner: {
        id: rawData.owners?.id || "Sem informação",
        name: rawData.owners?.name || 'Sem informação',
        email: rawData.owners?.email || 'Sem informação',
        phone: rawData.owners?.phone || 'Sem informação',
        address: rawData.owners?.address || 'Sem informação',
        type: rawData.owners?.type || 'Particular',
        status: rawData.owners?.status || 'Sem informação',
        documentation: rawData.owners?.documentation || 'Sem informação',
      },
      amenities: transformedAmenities,
      financial: {
        price: financial?.price?.toString() || 'Sem informação',
        iptu: financial?.iptu?.toString() || 'Sem informação',
        condominium: financial?.condominium?.toString() || 'Sem informação',
        commission: financial?.commission?.toString() || 'Sem informação',
      },
      leads: {
        broker: rawData.agents?.name || 'Sem informação',
        visitHistory: 'Sem informação',
        interestedClients: 'Sem informação',
        registrationDate: rawData.created_at || 'Sem informação',
        updateDate: rawData.updated_at || 'Sem informação',
      },
      images: images.map((img:{url:string}) => img.url),
      coverImage: cover?.url ,
      videoUrl: 'Sem informação',
      capturedBy: rawData.agents,
    };
  };

  // Processar estados de loading, erro e dados
  if (isLoading) {
    return <PropertyLoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Erro ao carregar dados da propriedade</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert>
        <AlertDescription>Propriedade não encontrada.</AlertDescription>
      </Alert>
    );
  }

  // Transformar os dados brutos para o formato necessário
  const property = transformData(data);

  return (
    <div className="flex flex-col gap-6 bg-gray-50 p-8">
      <PropertyHeader 
        title={property.title} 
        purpose={property.purpose}
        status={property.status}
        type={property.type}
        id={property.id}
        documentationStatus={property.documentationStatus}
        capturedBy={property.capturedBy}
        owner={property.owner}
        reloadEdit={reloadEdit}
      />
      
      <PropertyDetails
        idProperty={property.id}
        description={property.full_description}
        shortDescription={property.short_description}
        bedrooms={property.bedroom}
        bathrooms={property.bathroom}
        totalArea={property.total_area}
        usefulArea={property.useful_area || 0}
        garage={property.garage}
        suites={property.suites || 0}
        floor={property.floor}
        mobility={property.mobility}
        reloadEdit={reloadEdit}
      />

      <PropertyLocation
        idProperty={property.id}
        reloadEdit={reloadEdit} 
        neighborhood={property.neighborhood}
        city={property.city}
        estate={property.estate}
        street={property.street || 'Não informado'}
        house_number={property.number || 'Não informado'}
        zipcode={property.zipCode || 'Não informado'}
        status={property.status || 'Não informado'}
        reference_point={property.reference || 'Não informado'}
      />
      
      {property.amenities && (
        <PropertyAmenities idProperty={property.id} reloadEdit={reloadEdit} amenities={property.amenities} />
      )}
      
      {property.financial && (
        <PropertyFinancial  
        idProperty={property.id}
        reloadEdit={reloadEdit}
          price={property.financial.price}
          iptu={property.financial.iptu}
          condominium={property.financial.condominium}
          commission={property.financial.commission}
        />
      )}
      
      <PropertyOwner idProperty={property.id} reloadEdit={reloadEdit} owner={property.owner} />
      
      {property.leads && (
        <PropertyLeadManagement leads={property.leads} />
      )}
      
      
        <PropertyGallery images={property.images} idProperty={property.id} reloadEdit={reloadEdit} />
    

    
        <PropertyCover idProperty={property.id} reloadEdit={reloadEdit} cover={property.coverImage} />
    
    </div>
  );
}

function PropertyLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <Skeleton className="h-8 w-2/3 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </Card>
      
      <Card className="p-6">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-24 w-full mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </Card>
      
      <Card className="p-6">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </Card>
    </div>
  );
}