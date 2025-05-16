import { Save } from "lucide-react"
import Modal from 'react-modal';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { updateAmenities, updatePropertyDetails, updatePropertyHeader, updatePropertyLocation } from "@/lib/supabase/queries/client/properties/updateProperty";
import { PropertyAmenitiesProps } from ".";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Amenity, City, Estate, Neighborhood } from "@/types";
import { getAmenities, getCities, getEstates, getNeighborhoods } from "@/actions/property-actions";
import { Checkbox } from "@/components/ui/checkbox";



export function DialogFormAmenities({ amenities, idProperty, reloadEdit }: PropertyAmenitiesProps) {
    return (
        <DialogCloseButton
            reloadEdit={reloadEdit}
            amenities={amenities}
            idProperty={idProperty}
        />
    );
}

const formSchema = z.object({
    amenities: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof formSchema>

export function DialogCloseButton({ amenities, idProperty, reloadEdit }: PropertyAmenitiesProps) {
    const mapAmenities = amenities.map((amenities)=>( amenities.id))
    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            amenities:mapAmenities


        },
    });
    const [amenitiesCheck, setAmenitiesCheck] = useState<Amenity[]>([])
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const amenitiesData = await getAmenities()
                setAmenitiesCheck(amenitiesData)
            } catch (error) {
                console.error("Erro ao carregar dados iniciais:", error)
            }
        }
        loadInitialData()
    }, [])
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



    async function onsubmit(data: FormValues) {
        const mapAmenitiesToExclude = mapAmenities.filter((idAmenities)=>(!data.amenities?.includes(idAmenities)))
        const mapAmenitiesToInsert = data.amenities?.filter((amenitie)=>{
            if(!mapAmenities.includes(amenitie))return true
        })

        try {
            const result = await updateAmenities(idProperty, mapAmenitiesToExclude ,mapAmenitiesToInsert);

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



                        <FormField
                            control={methods.control}
                            name="amenities"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel>Características e Comodidades</FormLabel>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {amenitiesCheck.sort().map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={methods.control}
                                                name="amenities"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem key={item.id} className="flex flex-row items-start space-x-2 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        const currentValue = field.value || []
                                                                        return checked
                                                                            ? field.onChange([...currentValue, item.id])
                                                                            : field.onChange(currentValue.filter((value: any) => value !== item.id))
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">{item.name}</FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


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