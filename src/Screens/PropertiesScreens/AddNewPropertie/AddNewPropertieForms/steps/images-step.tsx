"use client"

import type React from "react"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, X, Home } from "lucide-react"

export function ImagesStep() {
  const form = useFormContext()
  const [fotoPrincipalPreview, setFotoPrincipalPreview] = useState<string | null>(null)
  const [fotosPreview, setFotosPreview] = useState<string[]>([])

  const handleFotoPrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      form.setValue("fotoPrincipal", file, { shouldValidate: true })

      // Criar preview da imagem
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFotoPrincipalPreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const novasFotos = Array.from(e.target.files)
      const todasFotos = [...(form.getValues("fotos") || []), ...novasFotos]
      form.setValue("fotos", todasFotos, { shouldValidate: true })

      // Criar previews das imagens
      const novosPreviewsPromises = novasFotos.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (event) => {
            if (event.target?.result) {
              resolve(event.target.result as string)
            }
          }
          reader.readAsDataURL(file)
        })
      })

      Promise.all(novosPreviewsPromises).then((novosPreviewsArray) => {
        setFotosPreview((prev) => [...prev, ...novosPreviewsArray])
      })
    }
  }

  const removerFoto = (index: number) => {
    const novasFotos = [...form.getValues("fotos")]
    novasFotos.splice(index, 1)
    form.setValue("fotos", novasFotos, { shouldValidate: true })

    const novosPreview = [...fotosPreview]
    novosPreview.splice(index, 1)
    setFotosPreview(novosPreview)
  }

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="fotoPrincipal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Foto Principal (Capa do anúncio)</FormLabel>
            <FormControl>
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => document.getElementById("fotoPrincipal")?.click()}
              >
                {fotoPrincipalPreview ? (
                  <div className="relative w-full h-48">
                    <img
                      src={fotoPrincipalPreview || "/placeholder.svg"}
                      alt="Foto principal"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <p className="text-white text-sm">Clique para alterar</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8">
                    <Home className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Foto principal do imóvel</p>
                    <p className="text-xs text-muted-foreground">Clique para fazer upload</p>
                  </div>
                )}
                <Input
                  id="fotoPrincipal"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFotoPrincipalChange}
                  ref={field.ref}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fotos"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fotos Adicionais</FormLabel>
            <FormControl>
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => document.getElementById("fotos")?.click()}
              >
                <div className="flex flex-col items-center py-4">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Adicionar mais fotos</p>
                  <p className="text-xs text-muted-foreground">Clique para fazer upload (máximo 10 fotos)</p>
                </div>
                <Input
                  id="fotos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFotosChange}
                  disabled={form.getValues("fotos")?.length >= 10}
                  ref={field.ref}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {fotosPreview.length > 0 && (
        <div className="space-y-2">
          <Label>Fotos Adicionadas ({fotosPreview.length}/10)</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fotosPreview.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removerFoto(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
