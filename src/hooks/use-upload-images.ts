import { createBrowserClient } from "@supabase/ssr"

function generateId() {
  return crypto.randomUUID()
}

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface UploadResult {
  success: boolean
  error?: string
}

interface ImageMetadata {
  url: string
  path: string
  order_index: number
  is_featured: boolean
}

export async function uploadPropertyImages(
  propertyId: string,
  cover: File,
  images: File[]
): Promise<UploadResult> {
  try {
    // 1. Upload da imagem principal (cover)
    const coverPath = `properties/${propertyId}/cover/${generateId()}`

    const { error: coverUploadError } = await supabase.storage
      .from("property-images")
      .upload(coverPath, cover)

    if (coverUploadError) throw new Error(`Falha no upload da capa: ${coverUploadError.message}`)

    const { data: coverUrlData } = supabase.storage
      .from("property-images")
      .getPublicUrl(coverPath)

    // 2. Upload das imagens adicionais em paralelo
    const imageUploads: ImageMetadata[] = await Promise.all(
      images.map(async (file, index) => {
        const imagePath = `properties/${propertyId}/images/${generateId()}`

        const { error: imgError } = await supabase.storage
          .from("property-images")
          .upload(imagePath, file)

        if (imgError) throw new Error(`Falha na imagem ${index + 1}: ${imgError.message}`)

        const { data: imgUrlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(imagePath)

        return {
          url: imgUrlData.publicUrl,
          path: imagePath,
          order_index: index,
          is_featured: index === 0,
        }
      })
    )

    // 3. Salvar metadados no banco via API Route
    const response = await fetch("/api/properties/save-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyId,
        cover: {
          url: coverUrlData.publicUrl,
          path: coverPath,
        },
        images: imageUploads,
      }),
    })

    if (!response.ok) throw new Error("Erro ao salvar metadados das imagens")

    return { success: true }

  } catch (error) {
    console.error("Erro no upload:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    }
  }
}