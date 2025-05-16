'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updatePropertyHeader(propertyId: string, updates: Partial<any>) {
  const supabase = await createClient();
console.log("dados para atualizar",updates, propertyId)
if(!!updates.title){
    updateTitle({propertyId,title:updates.title})
}
delete updates.title
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', propertyId)
    .select(); // opcional: retorna os dados atualizados

  if (error) {
    console.error('Erro ao atualizar a propriedade:', error);
    return null;
  }

  return data;
}

async function updateTitle({propertyId,title}:{title:string, propertyId:string}){
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('details')
    .update({title:title})
    .eq('propertie_id', propertyId)
    .select(); // opcional: retorna os dados atualizados
}
export async function updatePropertyOwner(propertyId: string, updates: Partial<any>) {
  const supabase = await createClient();
console.log("dados para atualizar",updates, propertyId)
if(!!updates.title){
    updateTitle({propertyId,title:updates.title})
}
delete updates.title
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', propertyId)
    .select(); // opcional: retorna os dados atualizados

  if (error) {
    console.error('Erro ao atualizar a propriedade:', error);
    return null;
  }

  return data;
}
async function updateReferencePiont({propertyId,reference_point}:{reference_point:string, propertyId:string}){
  const supabase = await createClient();
  const { data, error } = await supabase
  .from('details')
  .update({reference_point:reference_point})
  .eq('propertie_id', propertyId)
  .select(); // opcional: retorna os dados atualizados
}

export async function updatePropertyDetails(propertyId: string, updates: Partial<any>) {
  const supabase = await createClient();
  console.log("dados para atualizar",updates, propertyId)
  const { data, error } = await supabase
    .from('details')
    .update(updates)
    .eq('propertie_id', propertyId)
    .select(); // opcional: retorna os dados atualizados

  if (error) {
    console.error('Erro ao atualizar a detalhes propriedade:', error);
    return null;
  }

  return data;
}

export async function updatePropertyLocation(propertyId: string, updates: Partial<any>) {
  const supabase = await createClient();
  console.log("dados para atualizar",updates, propertyId)
  if(!!updates.reference_point){
    updateReferencePiont({propertyId,reference_point:updates.reference_point})
}
delete updates.reference_point
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', propertyId)
    .select(); // opcional: retorna os dados atualizados

  if (error) {
    console.error('Erro ao atualizar a detalhes propriedade:', error);
    return null;
  }

  return data;
}
export async function updatePropertyFinancial(propertyId: string, updates: Partial<any>) {
  const supabase = await createClient();
  console.log("dados para atualizar",updates, propertyId)
  const { data, error } = await supabase
    .from('financeiro')
    .update(updates)
    .eq('propertie_id', propertyId)
    .select(); // opcional: retorna os dados atualizados

  if (error) {
    console.error('Erro ao atualizar a detalhes propriedade:', error);
    return null;
  }

  return data;
}
export async function updateAmenities(
  propertyId: string,
  amenitiesToExclude: string[] | undefined,
  amenitiesInsert: string[] | undefined
) {
  const supabase = await createClient();

  try {
    // Delete amenities that need to be removed
    if (amenitiesToExclude && amenitiesToExclude.length > 0) {
      const { error: deleteError } = await supabase
        .from('amenities_details')
        .delete()
        .eq('id_propertie', propertyId)
        .in('id_amenitie', amenitiesToExclude);

      if (deleteError) {
        throw new Error(`Error deleting amenities: ${deleteError.message}`);
      }
      console.log(`Successfully deleted ${amenitiesToExclude.length} amenities`);
    }

    // Insert new amenities
    if (amenitiesInsert && amenitiesInsert.length > 0) {
      const amenitiesDetails = amenitiesInsert.map((amenityId: string) => ({
        id_propertie: propertyId,
        id_amenitie: amenityId,
      }));

      const { error: insertError } = await supabase
        .from('amenities_details')
        .insert(amenitiesDetails);

      if (insertError) {
        throw new Error(`Error inserting amenities: ${insertError.message}`);
      }
      console.log(`Successfully inserted ${amenitiesInsert.length} amenities`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating amenities:', error);
    throw error;
  }
}
export async function updateGaleryDeleteItens(
  propertyId: string,
  imagesToExclude: string[] | undefined,
) {
  const supabase = await createClient();
  
  if (!imagesToExclude || imagesToExclude.length === 0) {
    console.log("Nenhuma imagem para excluir");
    return { success: true, message: "Nenhuma imagem para excluir" };
  }

  console.log("Excluindo imagens:", imagesToExclude);
  
  try {
    // 1. Para cada URL de imagem a ser excluída
    for (const imageUrl of imagesToExclude) {
      // 1.1 Primeiro, encontrar o registro no banco de dados para obter o path
      const { data: imageRecord, error: fetchError } = await supabase
        .from("property_images")
        .select("id, path")
        .eq("url", imageUrl)
        .eq("property_id", propertyId)
        .single();
        
      if (fetchError) {
        console.error("Erro ao buscar registro da imagem:", fetchError);
        continue; // Tenta a próxima imagem
      }
      
      if (!imageRecord) {
        console.warn(`Registro não encontrado para a imagem: ${imageUrl}`);
        continue; // Tenta a próxima imagem
      }
      
      // 1.2 Excluir a imagem do bucket de storage
      const { error: storageError } = await supabase
        .storage
        .from("property-images")
        .remove([imageRecord.path]);
        
      if (storageError) {
        console.error(`Erro ao excluir arquivo do storage para ${imageRecord.path}:`, storageError);
        // Continuamos mesmo com erro para pelo menos excluir do banco
      } else {
        console.log(`Arquivo excluído com sucesso do storage: ${imageRecord.path}`);
      }
      
      // 1.3 Excluir o registro da imagem do banco de dados
      const { error: dbError } = await supabase
        .from("property_images")
        .delete()
        .eq("id", imageRecord.id);
        
      if (dbError) {
        console.error(`Erro ao excluir registro do banco para imagem ${imageRecord.id}:`, dbError);
      } else {
        console.log(`Registro excluído com sucesso do banco: ${imageRecord.id}`);
      }
    }
    
    // 2. Reorganizar os índices das imagens restantes
    await reorderRemainingImages(propertyId);
    
    // 3. Revalidar o cache para que as alterações apareçam na UI
    revalidatePath(`/ficha-imovel/${propertyId}`);
    
    return { success: true, message: `${imagesToExclude.length} imagens excluídas com sucesso` };
  } catch (error) {
    console.error("Erro ao excluir imagens:", error);
    return { success: false, error };
  }
}

// Função auxiliar para reordenar os índices das imagens restantes
async function reorderRemainingImages(propertyId: string) {
  const supabase = await createClient();
  
  try {
    // 1. Buscar todas as imagens restantes ordenadas por order_index
    const { data: remainingImages, error: fetchError } = await supabase
      .from("property_images")
      .select("id, order_index, is_featured")
      .eq("property_id", propertyId)
      .order("order_index");
      
    if (fetchError) {
      console.error("Erro ao buscar imagens restantes:", fetchError);
      return;
    }
    
    // 2. Reordenar os índices
    for (let i = 0; i < remainingImages.length; i++) {
      const image = remainingImages[i];
      
      // Se o índice já está correto, pular
      if (image.order_index === i) continue;
      
      // Atualizar o índice
      const { error: updateError } = await supabase
        .from("property_images")
        .update({ order_index: i })
        .eq("id", image.id);
        
      if (updateError) {
        console.error(`Erro ao atualizar índice da imagem ${image.id}:`, updateError);
      }
    }
    
    // 3. Se não houver imagem destacada, definir a primeira como destacada
    const featuredImage = remainingImages.find(img => img.is_featured);
    
    if (remainingImages.length > 0 && !featuredImage) {
      const { error: featuredError } = await supabase
        .from("property_images")
        .update({ is_featured: true })
        .eq("id", remainingImages[0].id);
        
      if (featuredError) {
        console.error("Erro ao definir imagem destacada:", featuredError);
      }
    }
    
  } catch (error) {
    console.error("Erro ao reordenar imagens:", error);
  }
}

export async function insertNewPropertyImages(propertyId: string, formData: FormData) {
  const supabase = await createClient();
  try {
    // Verificar se o cliente do Supabase está funcionando
    const { error: testError } = await supabase.storage.from("property-images").list();
    if (testError) {
      console.error("Erro ao conectar com o Supabase Storage:", testError);
      return { success: false, error: "Erro de conexão com o storage" };
    }

    // Verificar se há imagem de capa no formData
    const cover = formData.get('cover') as File | null;
    if (cover && cover instanceof File && cover.name) {
      // 1. Processar a imagem principal
      const mainImagePath = `properties/${propertyId}/cover/${cover.name}`;
      const { error: mainImageUploadError } = await supabase.storage
        .from("property-images")
        .upload(mainImagePath, cover);
      
      if (mainImageUploadError) throw mainImageUploadError;
      
      const { data: mainImageData } = supabase.storage.from("property-images").getPublicUrl(mainImagePath);
      const { error: coverError } = await supabase.from("property_covers").insert({
        property_id: propertyId,
        url: mainImageData.publicUrl,
        path: mainImagePath,
      });
      
      if (coverError) throw coverError;
    }

    // 2. Processar as imagens adicionais
    const images = formData.getAll('images') as File[];
    
    // Filtrar para garantir que só processamos arquivos válidos
    const validImages = images.filter(image => image && image instanceof File && image.name);
    
    if (validImages.length > 0) {
      const imagePromises = validImages.map(async (image, index) => {
        if (!image.name) {
          console.warn("Imagem sem nome detectada, ignorando...");
          return null;
        }
        
        const imagePath = `properties/${propertyId}/images/${image.name}`;
        const { error: imageUploadError } = await supabase.storage
          .from("property-images")
          .upload(imagePath, image);
          
        if (imageUploadError) {
          console.error(`Erro ao fazer upload da imagem ${index}:`, imageUploadError);
          throw imageUploadError;
        }
        
        const { data: imageData } = supabase.storage.from("property-images").getPublicUrl(imagePath);
        return supabase.from("property_images").insert({
          property_id: propertyId,
          url: imageData.publicUrl,
          path: imagePath,
          order_index: index,
          is_featured: index === 0,
        });
      });
      
      // Filtrar promessas nulas e executar as válidas
      const validPromises = imagePromises.filter(Boolean);
      if (validPromises.length > 0) {
        await Promise.all(validPromises);
      }
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao fazer upload das imagens:", error);
    return { success: false, error };
  }
}

export async function updateCover(propertyId: string, formData: FormData) {
  const supabase = await createClient();
  
  try {
    // Obter o arquivo do FormData
    const coverFile = formData.get('cover') as File | null;
    
    if (!coverFile || !(coverFile instanceof File)) {
      console.log("Nenhuma imagem de capa válida para atualizar");
      return { success: true, message: "Nenhuma alteração na capa" };
    }

    // 1. Buscar a capa atual para excluí-la
    const { data: currentCover, error: fetchError } = await supabase
      .from("property_covers")
      .select("id, path")
      .eq("property_id", propertyId)
      .single();
      
    // 2. Se encontrou uma capa existente, excluí-la do storage
    if (currentCover && !fetchError) {
      // 2.1 Excluir o arquivo do storage
      const { error: storageError } = await supabase
        .storage
        .from("property-images")
        .remove([currentCover.path]);
        
      if (storageError) {
        console.error(`Erro ao excluir arquivo de capa do storage: ${currentCover.path}`, storageError);
        // Continuamos mesmo com erro para pelo menos atualizar no banco
      } else {
        console.log(`Arquivo de capa anterior excluído com sucesso: ${currentCover.path}`);
      }
      
      // 2.2 Excluir o registro da capa do banco de dados
      const { error: deleteError } = await supabase
        .from("property_covers")
        .delete()
        .eq("id", currentCover.id);
        
      if (deleteError) {
        console.error(`Erro ao excluir registro de capa do banco: ${currentCover.id}`, deleteError);
        // Continuamos mesmo com erro para tentar inserir a nova capa
      }
    }
    
    // 3. Fazer o upload da nova imagem de capa
    const mainImagePath = `properties/${propertyId}/cover/${coverFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("property-images")
      .upload(mainImagePath, coverFile);
    
    if (uploadError) {
      console.error("Erro ao fazer upload da nova capa:", uploadError);
      throw uploadError;
    }
    
    // 4. Obter a URL pública da imagem
    const { data: imageData } = supabase.storage
      .from("property-images")
      .getPublicUrl(mainImagePath);
    
    // 5. Inserir o novo registro da capa no banco de dados
    const { error: insertError } = await supabase
      .from("property_covers")
      .insert({
        property_id: propertyId,
        url: imageData.publicUrl,
        path: mainImagePath,
      });
    
    if (insertError) {
      console.error("Erro ao inserir nova capa no banco:", insertError);
      throw insertError;
    }
    
    // 6. Revalidar o cache para que as alterações apareçam na UI
    revalidatePath(`/ficha-imovel/${propertyId}`);
    
    return { success: true, message: "Capa atualizada com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar capa:", error);
    return { success: false, error };
  }
}