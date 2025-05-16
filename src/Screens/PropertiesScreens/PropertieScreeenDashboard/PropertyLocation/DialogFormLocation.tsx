import { Save } from "lucide-react"
import Modal from 'react-modal';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { updatePropertyDetails, updatePropertyHeader, updatePropertyLocation } from "@/lib/supabase/queries/client/properties/updateProperty";
import { PropertyLocationProps } from ".";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { City, Estate, Neighborhood } from "@/types";
import { getCities, getEstates, getNeighborhoods } from "@/actions/property-actions";


const estados = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
]

export function DialogFormLocation({
    reloadEdit,
    idProperty,
    neighborhood,
    city,
    estate,
    street,
    house_number,
    zipcode,
    status,
    reference_point
}: PropertyLocationProps) {
    return (
        <DialogCloseButton
            reloadEdit={reloadEdit}
            idProperty={idProperty}
            city={city}
            estate={estate}
            house_number={house_number}
            neighborhood={neighborhood}
            reference_point={reference_point}
            status={status}
            street={street}
            zipcode={zipcode}
        />
    );
}

const formSchema = z.object({
    street: z.string().min(3, { message: "Rua é obrigatória" }),
    house_number: z.string().min(1, { message: "Número é obrigatório" }),
    zipcode: z.string().min(8, { message: "CEP deve ter 8 dígitos" }),
    reference_point: z.string().min(3, { message: "Ponto de referencia" }),
    city_id: z.string().uuid({ message: "Selecione uma cidade" }),
    neighborhood_id: z.string().uuid({ message: "Selecione um bairro" }),
    estate_id: z.string().uuid({ message: "Selecione um estado" }),
    

})

type FormValues = z.infer<typeof formSchema>

export function DialogCloseButton({
    reloadEdit,
    idProperty,
    neighborhood,
    city,
    estate,
    street,
    house_number,
    zipcode,
    status,
    reference_point,
}: PropertyLocationProps) {
    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            street,
            house_number,
            zipcode,
            reference_point:reference_point,
            neighborhood_id: neighborhood.id,
            city_id: city.id,
            estate_id: estate.id,
            

        },
    });
    const [estates, setEstates] = useState<Estate[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
    const [modalIsOpen, setIsOpen] = useState(false);
      useEffect(() => {
        const loadInitialData = async () => {
          try {
            console.log("Carregando dados iniciais...")
    
            // Carregar proprietários primeiro para verificar se estão sendo buscados corretamente
    
            // Carregar os demais dados
            const estatesData= await getEstates()
            setEstates(estatesData)    
            console.log("Todos os dados carregados com sucesso")
          } catch (error) {
            console.error("Erro ao carregar dados iniciais:", error)

          } finally {
            
          }
        }
    
        loadInitialData()
      }, [])
  useEffect(() => {
    const estateId = methods.watch("estate_id")
    if (estateId) {
      getCities(estateId).then((data) => setCities(data))
    } else {
      setCities([])
    }
    methods.setValue("city_id", "")
    methods.setValue("neighborhood_id", "")
  }, [methods.watch("estate_id")])

  // Observar mudanças na cidade selecionada para carregar bairros
  useEffect(() => {
    const cityId = methods.watch("city_id")
    if (cityId) {
      getNeighborhoods(cityId).then((data) => setNeighborhoods(data))
    } else {
      setNeighborhoods([])
    }
    methods.setValue("neighborhood_id", "")
  }, [methods.watch("city_id")])
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
        try {
            const result = await updatePropertyLocation(idProperty, {
                street: data.street,
                reference_point:data.reference_point,
                house_number:data.house_number,
                estate_id:data.estate_id,
                zipcode:data.zipcode,
                neighborhood_id:data.neighborhood_id,
                city_id:data.city_id,
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={methods.control}
                                name="estate_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o estado" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {estates && estates.length > 0 ? (
                                                    estates.map((estate) => (
                                                        <SelectItem key={estate.id} value={estate.id}>
                                                            {estate.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="no-estates" disabled>
                                                        Nenhum estado encontrado
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={methods.control}
                                name="city_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cidade</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={!methods.watch("estate_id")}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a cidade" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cities && cities.length > 0 ? (
                                                    cities.map((city) => (
                                                        <SelectItem key={city.id} value={city.id}>
                                                            {city.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="no-cities" disabled>
                                                        Nenhuma cidade encontrada
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={methods.control}
                                name="neighborhood_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bairro</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={!methods.watch("city_id")}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o bairro" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {neighborhoods && neighborhoods.length > 0 ? (
                                                    neighborhoods.map((neighborhood) => (
                                                        <SelectItem key={neighborhood.id} value={neighborhood.id}>
                                                            {neighborhood.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="no-neighborhoods" disabled>
                                                        Nenhum bairro encontrado
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={methods.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rua</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descrição detalhada do imóvel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={methods.control}
                            name="house_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Numero</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descrição detalhada do imóvel"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={methods.control}
                            name="zipcode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>cep</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descrição detalhada do imóvel"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={methods.control}
                            name="reference_point"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ponto de referencia{reference_point}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descrição detalhada do imóvel" {...field}/>
                                    </FormControl>
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