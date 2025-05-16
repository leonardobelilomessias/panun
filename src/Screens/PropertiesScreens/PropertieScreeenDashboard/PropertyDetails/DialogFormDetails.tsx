import { Copy, Save } from "lucide-react"
import Modal from 'react-modal';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { updatePropertyDetails, updatePropertyHeader } from "@/lib/supabase/queries/client/properties/updateProperty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent, Owner } from "@/types/typesPropeties";
import { PropertyDetailsProps } from ".";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";


export function DialogFormDetails({
    idProperty,
    shortDescription,
    bedrooms,
    bathrooms,
    totalArea,
    usefulArea,
    garage,
    suites,
    floor,
    mobility,
    description,
    reloadEdit,
}: PropertyDetailsProps) {
    return (
        <DialogCloseButton 
            idProperty={idProperty} 
            floor={floor} 
            mobility={mobility} 
            shortDescription={shortDescription} 
            suites={suites} 
            description={description} 
            bedrooms={bedrooms} 
            bathrooms={bathrooms} 
            totalArea={totalArea} 
            usefulArea={usefulArea} 
            garage={garage} 
            reloadEdit={reloadEdit} 
        />
    );
}

const formSchema = z.object({
    id: z.string().min(1, { message: "informe o id" }),
    shotDescription: z.string().min(20, { message: "informe a descrição curta" }),
    bedrooms: z.coerce.number().min(0, { message: "informe o número de quartos" }),
    bathrooms: z.coerce.number().min(0, { message: "informe o número de banheiros" }),
    totalArea: z.coerce.number().min(0, { message: "informe a área total" }),
    usefulArea: z.coerce.number().min(0, { message: "informe a área útil" }),
    garage: z.coerce.number().min(0, { message: "informe o número de vagas de garagem" }),
    suites: z.coerce.number().min(0, { message: "informe o número de suítes" }),
    floor: z.string().min(0, { message: "informe o andar" }),
    mobility: z.string().optional(),
    description: z.string().min(1, { message: "informe a descrição" }),
});

type FormValues = z.infer<typeof formSchema>

export function DialogCloseButton({
    idProperty,
    shortDescription,
    bedrooms,
    bathrooms,
    totalArea,
    usefulArea,
    garage,
    suites,
    floor,
    mobility,
    reloadEdit,
    description
}: PropertyDetailsProps) {
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
            id: idProperty,
            shotDescription: shortDescription || '',
            bedrooms: Number(bedrooms) || 0,
            bathrooms: Number(bathrooms) || 0,
            totalArea: Number(totalArea) || 0,
            usefulArea: Number(usefulArea) || 0,
            garage: Number(garage) || 0,
            suites: Number(suites) || 0,
            floor: String(floor || ''),
            mobility: mobility || '',
            description: description || ''
        },
    });
    
    async function onsubmit(data: FormValues) {
        try {
            const result = await updatePropertyDetails(idProperty, {
                shot_description: data.shotDescription,
                full_description: data.description,
                bedroom: data.bedrooms,
                bathroom: data.bathrooms,
                total_area: data.totalArea,
                usable_area: data.usefulArea,
                garage: data.garage,
                // suites: data.suites,
                flor: data.floor !== '' ? parseInt(data.floor) : undefined,
                furnished: data.mobility === 'Sim' ? true : false
            });
            
            reloadEdit();
            setIsOpen(false);
        } catch (error) {
            console.error("Erro ao atualizar detalhes:", error);
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
                                name="shotDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição Curta</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Breve descrição do imóvel" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={methods.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição Completa</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Descrição detalhada do imóvel" rows={5} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <FormField
                                    control={methods.control}
                                    name="bedrooms"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quartos</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    min="0" 
                                                    placeholder="0" 
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={methods.control}
                                    name="bathrooms"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Banheiros</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    min="0" 
                                                    placeholder="0" 
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={methods.control}
                                    name="garage"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Garagens</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    min="0" 
                                                    placeholder="0" 
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={methods.control}
                                    name="floor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Andar</FormLabel>
                                            <FormControl>
                                                <Input type="number" min="0" placeholder="0" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={methods.control}
                                    name="totalArea"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Área Total (m²)</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    step="0.01" 
                                                    min="0" 
                                                    placeholder="0.00" 
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={methods.control}
                                    name="usefulArea"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Área Útil (m²)</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    step="0.01" 
                                                    min="0" 
                                                    placeholder="0.00" 
                                                    {...field}
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={methods.control}
                                name="mobility"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox 
                                                checked={field.value === 'Sim'} 
                                                onCheckedChange={(checked) => field.onChange(checked ? 'Sim' : 'Não')}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Mobiliado</FormLabel>
                                            <p className="text-sm text-muted-foreground">O imóvel já vem com móveis e eletrodomésticos.</p>
                                        </div>
                                    </FormItem>
                                )}
                            />
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