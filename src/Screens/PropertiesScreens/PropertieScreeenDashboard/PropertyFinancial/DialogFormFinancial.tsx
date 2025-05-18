import { Copy, Edit, Save } from "lucide-react"
import Modal from 'react-modal';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { updatePropertyDetails, updatePropertyFinancial, updatePropertyHeader } from "@/lib/supabase/queries/client/properties/updateProperty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent, Owner } from "@/types/typesPropeties";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyFinancialProps } from ".";


export function DialogFormFinancial({
    idProperty,
    reloadEdit,
    price,
    iptu,
    condominium,
    commission,
}: PropertyFinancialProps) {
    return (
        <DialogCloseButton idProperty={idProperty} price={price} reloadEdit={reloadEdit} commission={commission} condominium={condominium} iptu={iptu}
        />
    );
}

const formSchema = z.object({
    price: z.string().min(1, { message: "Informe o preço" }),
    iptu: z.string().optional(),
    condominium: z.string().optional(),
    commission: z.string().optional(),
    // finance_status: z.string().optional(),
})
type FormValues = z.infer<typeof formSchema>

export function DialogCloseButton({
    idProperty,
    reloadEdit,
    price,
    iptu,
    condominium,
    commission,
}: PropertyFinancialProps) {
    const formatCurrency = (value: string) => {
        const numericValue = value.replace(/\D/g, "")
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(numericValue) / 100)
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
            price: price,
            iptu: iptu,
            condominium: condominium,
            commission: commission,
            // finance_status: "Pendente",
        },
    });

    async function onsubmit(data: FormValues) {
        try {
            const result = await updatePropertyFinancial(idProperty, {
                ...data
            });

            reloadEdit();
            setIsOpen(false);
        } catch (error) {
            console.error("Erro ao atualizar detalhes:", error);
        }
    }

    return (
        <div>
            <Button onClick={() => openModal()} className="bg-primary-palet text-white ">
                <Edit size={20} /> Editar
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
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preço (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Valor do imóvel"
                                                onChange={(e) => {
                                                    const raw = e.target.value.replace(/\D/g, "")
                                                    const formatted = formatCurrency(raw)
                                                    field.onChange(raw)
                                                    e.target.value = formatted
                                                }}
                                                defaultValue={formatCurrency(field.value || "")}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={methods.control}
                                name="iptu"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>IPTU Anual (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Valor do IPTU"
                                                onChange={(e) => {
                                                    const raw = e.target.value.replace(/\D/g, "")
                                                    const formatted = formatCurrency(raw)
                                                    field.onChange(raw)
                                                    e.target.value = formatted
                                                }}
                                                defaultValue={formatCurrency(field.value || "")}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={methods.control}
                                name="condominium"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Condomínio (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Valor do condomínio"
                                                onChange={(e) => {
                                                    const raw = e.target.value.replace(/\D/g, "")
                                                    const formatted = formatCurrency(raw)
                                                    field.onChange(raw)
                                                    e.target.value = formatted
                                                }}
                                                defaultValue={formatCurrency(field.value || "")}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                  <FormField
                                    control={methods.control}
                                    name="commission"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Comissão (%)</FormLabel>
                                        <FormControl>
                                          <Input type="number" step="0.01" min="0" max="100" placeholder="Percentual de comissão" {...field} />
                                        </FormControl>
                                        <FormMessage />
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