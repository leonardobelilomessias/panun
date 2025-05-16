import { Save, Upload, X } from "lucide-react"
import Modal from 'react-modal';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { PropertyGalleryProps } from ".";
import { uploadPropertyImages } from "@/actions/property-actions";
import { insertNewPropertyImages, updateGaleryDeleteItens } from "@/lib/supabase/queries/client/properties/updateProperty";

export function DialogFormGalery({ images, idProperty, reloadEdit }: PropertyGalleryProps) {
    return (
        <DialogCloseButton idProperty={idProperty} images={images} reloadEdit={reloadEdit} 
        />
    );
}

const formSchema = z.object({
    images: z.array(z.string().min(1, { message: "Adicione pelo menos uma imagem adicional" })),
})
type FormValues = z.infer<typeof formSchema>

export function DialogCloseButton({ images, idProperty, reloadEdit }: PropertyGalleryProps) {
    
    const [files, setFiles] = useState<File[]>([])
    const [imagesPreview, setImagesPreview] = useState<string[]>(images)
    const [imagensToRemove, setImagensToRemove] = useState<string[]>([])
    
    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // Filtrar quaisquer arquivos inválidos
            const novasImagens = Array.from(e.target.files).filter(file => file && file.name);
            if (novasImagens.length === 0) return;
            
            setFiles(prevFiles => [...prevFiles, ...novasImagens]);
            
            const novasImagensnames = novasImagens.map(image => image.name);
            const todasImagens = [...(methods.getValues("images") || []), ...novasImagensnames];
            methods.setValue("images", todasImagens, { shouldValidate: true });
    
            // Criar previews das imagens
            const novosPreviewsPromises = novasImagens.map((file) => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        if (event.target?.result) {
                            resolve(event.target.result as string);
                        }
                    };
                    reader.readAsDataURL(file);
                });
            });
    
            Promise.all(novosPreviewsPromises).then((novosPreviewsArray) => {
                setImagesPreview((prev) => [...prev, ...novosPreviewsArray]);
            });
        }
    }
    
    const removerImagem = (index: number) => {
        // Se for uma imagem existente (do array original 'images'), adiciona à lista de remoção
        if (index < images.length) {
            setImagensToRemove(prev => [...prev, images[index]]);
        }
        
        // Remove do array de arquivos se for uma nova imagem
        if (index >= images.length) {
            const fileIndex = index - images.length;
            setFiles(prevFiles => {
                const newFiles = [...prevFiles];
                if (fileIndex >= 0 && fileIndex < newFiles.length) {
                    newFiles.splice(fileIndex, 1);
                }
                return newFiles;
            });
        }
        
        // Atualiza o valor no formulário
        const novasImagens = [...methods.getValues("images")];
        if (index >= 0 && index < novasImagens.length) {
            novasImagens.splice(index, 1);
            methods.setValue("images", novasImagens, { shouldValidate: true });
        }
        
        // Atualiza as previews
        const novosPreview = [...imagesPreview];
        if (index >= 0 && index < novosPreview.length) {
            novosPreview.splice(index, 1);
            setImagesPreview(novosPreview);
        }
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }

    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            images: images
        },
    });

    async function onsubmit(data: FormValues) {
        try {
            // 1. Primeiro atualize a galeria no banco de dados (removendo imagens, etc)
            const result = await updateGaleryDeleteItens(idProperty, imagensToRemove);
            
            // 2. Se tiver novos arquivos para upload, faça o upload
            if (files.length > 0) {
                const formData = new FormData();
                // Filtra arquivos nulos ou indefinidos antes de adicionar ao FormData
                const validFiles = files.filter(file => file && file instanceof File);
                
                if (validFiles.length > 0) {
                    validFiles.forEach(file => formData.append("images", file));
                     console.log(formData)
                    const uploadResult = await insertNewPropertyImages(idProperty, formData);
                    if (!uploadResult.success) {
                        throw new Error("Erro ao fazer upload das imagens");
                    }
                }
            }
            
            // 3. Recarregue os dados e feche o modal
            setFiles([])
            reloadEdit();
            setIsOpen(false);
        } catch (error) {
            console.error("Erro ao atualizar galeria:", error);
        }
    }

    return (
        <div>
            <Button onClick={() => openModal()} className="bg-primary-palet text-white w-44">
                <Save size={20} /> Editar
            </Button>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Editar Detalhes da Propriedade"
            >
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onsubmit)} className="space-y-1 max-w-[1200px] px-8">
                        <div className="space-y-6">

                        <FormField
                            control={methods.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fotos Adicionais</FormLabel>
                                    <FormControl>
                                        <div
                                            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                                            onClick={() => document.getElementById("images")?.click()}
                                        >
                                            <div className="flex flex-col items-center py-4">
                                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                                <p className="text-sm text-muted-foreground mb-1">Adicionar mais fotos</p>
                                                <p className="text-xs text-muted-foreground">Clique para fazer upload (máximo 10 fotos)</p>
                                            </div>
                                            <Input
                                                id="images"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={handleImagesChange}
                                                disabled={imagesPreview.length >= 10}
                                                ref={field.ref}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {imagesPreview.length > 0 && (
                            <div className="space-y-2">
                                <Label>Fotos Adicionadas ({imagesPreview.length}/10)</Label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {imagesPreview.map((preview, index) => (
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
                                                onClick={() => removerImagem(index)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        </div>

                        <div className="flex justify-between mt-6">
                            <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
                            <Button type="submit">Salvar</Button>
                        </div>
                    </form>
                </Form>
            </Modal>
        </div>
    );
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%',
        maxHeight: '90%',
        overflow: 'auto'
    },
};