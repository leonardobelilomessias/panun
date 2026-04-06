import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

interface ImageMetadata {
  url: string
  path: string
  order_index: number
  is_featured: boolean
}

interface SaveImagesRequest {
  propertyId: string
  cover: {
    url: string
    path: string
  }
  images: ImageMetadata[]
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body: SaveImagesRequest = await request.json()
    const { propertyId, cover, images } = body

    // 1. Salvar a imagem principal
    const { error: coverError } = await supabase
      .from("property_covers")
      .insert({
        property_id: propertyId,
        url: cover.url,
        path: cover.path,
      })

    if (coverError) throw new Error(coverError.message)

    // 2. Salvar imagens adicionais (se houver)
    if (images.length > 0) {
      const { error: imagesError } = await supabase
        .from("property_images")
        .insert(
          images.map((img) => ({
            property_id: propertyId,
            url: img.url,
            path: img.path,
            order_index: img.order_index,
            is_featured: img.is_featured,
          }))
        )

      if (imagesError) throw new Error(imagesError.message)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Erro ao salvar metadados:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    )
  }
}