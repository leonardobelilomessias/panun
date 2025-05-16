import { Save } from "lucide-react"
import Modal from 'react-modal';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { PropertyGalleryProps } from ".";
import { updateCover } from "@/lib/supabase/queries/client/properties/updateProperty";

export function DialogFormCover({ cover, idProperty, reloadEdit }: PropertyGalleryProps) {
    return (
        <DialogCloseButton idProperty={idProperty} cover={cover} reloadEdit={reloadEdit} />
    );
}

const formSchema = z.object({
    mainImage: z.string().min(1, { message: "Adicione uma imagem de capa" }),
})
type FormValues = z.infer<typeof formSchema>

export function DialogCloseButton({ cover, idProperty, reloadEdit }: PropertyGalleryProps) {
    const [coverFile, setCoverFile] = useState<File | null>(null)
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(cover || null)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            mainImage: cover || "",
        },
    });

    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            methods.setValue("mainImage", file.name, { shouldValidate: true });
            setCoverFile(file);
            
            // Criar preview da imagem
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setMainImagePreview(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    async function onSubmit(data: FormValues) {
        try {
            setIsSubmitting(true);
            
            // Atualizar a capa se um novo arquivo foi selecionado
            if (coverFile) {
                // Criar um FormData para enviar o arquivo
                const formData = new FormData();
                formData.append('cover', coverFile);
                
                const result = await updateCover(idProperty, formData);
                
                if (!result.success) {
                    throw new Error("Erro ao atualizar a capa");
                }
            }
            
            // Recarregar os dados e fechar o modal
            setCoverFile(null)
            
            reloadEdit();
            setIsOpen(false);
        } catch (error) {
            console.error("Erro ao atualizar capa:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <Button onClick={openModal} className="bg-primary-palet text-white w-44">
                <Save size={20} /> Editar Capa
            </Button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Editar Capa da Propriedade"
            >
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-1 max-w-[1200px] px-8">
                        <div className="space-y-6">
                            <FormField
                                control={methods.control}
                                name="mainImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Foto Principal</FormLabel>
                                        <FormControl>
                                            <div
                                                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                                                onClick={() => document.getElementById("mainImage")?.click()}
                                            >
                                                {mainImagePreview ? (
                                                    <div className="relative w-full h-48">
                                                        <img
                                                            src={mainImagePreview}
                                                            alt="Foto principal"
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                                            <p className="text-white text-sm">Clique para alterar</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center py-8">
                                                        <div className="h-12 w-12 text-muted-foreground mb-2">🏠</div>
                                                        <p className="text-sm text-muted-foreground mb-2">Foto principal do imóvel</p>
                                                        <p className="text-xs text-muted-foreground">Clique para fazer upload</p>
                                                    </div>
                                                )}
                                                <Input
                                                    id="mainImage"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleMainImageChange}
                                                    ref={field.ref}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-between mt-6">
                            <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Salvando..." : "Salvar"}
                            </Button>
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