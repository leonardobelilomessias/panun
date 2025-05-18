'use server';
import { Amenity } from "@/types";
import { AmenitiesDetails, PropertySingle } from "@/types/typesPropeties";
import { createClient } from "@/utils/supabase/server";

export async function getPropertyById(propertyId: string) {
  const supabase = await createClient();

  const { data, error }: { data: PropertySingle | null; error: any } = await supabase
    .from('properties')
    .select(`
      id,
      street,
      house_number,
      zipcode,
      status,
      created_at,
      updated_at,
      purpose,
      documentation_status,
      type_property,
      owners(id, name, email),
      agents(id, name, email),
      cities(id, name),
      neighborhoods(id, name),
      estates(id, name),
      details(
        id,
        title,
        full_description,
        shot_description,
        garage,
        bathroom,
        bedroom,
        total_area,
        usable_area,
        reference_point,
        furnished,
        flor,
        status,
        address,
        created_at,
        updated_at
      ),
      financeiro(
        id,
        price,
        iptu,
        condominium,
        commission,
        status,
        created_at,
        updated_at
      ),
      property_covers(
        id,
        property_id,
        url,
        path,
        created_at,
        updated_at
      ),
      property_images(
        id,
        property_id,
        url,
        path,
        description,
        is_featured,
        order_index,
        created_at,
        updated_at
      ),
      amenities_details (
        amenities (
          id,
          name
        )
      )
    `)
    .eq('id', propertyId)
    .single();

  if (error) {
    console.error('Erro ao buscar a propriedade:', error);
    return null;
  }

  // Transforma amenities_details de: [{ amenities: { id, name } }, ...] para: [{ id, name }, ...]
  const transformedAmenities = Array.isArray(data?.amenities_details)
    ? data.amenities_details
    : [];
  
  // Retorna os dados com amenities transformados
  return {
    ...data,
    amenities: transformedAmenities,
  };
}
