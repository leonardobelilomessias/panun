import { Copy, Edit, Save } from "lucide-react"
import Modal from 'react-modal';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { updatePropertyHeader } from "@/lib/supabase/queries/client/properties/updateProperty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent, Owner } from "@/types/typesPropeties";
import { getAgents, getOwners } from "@/actions/property-actions";
import { strict } from "assert";


export function DialogFormHeader({ id, documentationStatus, owner, status, agent={name:"sem informação",id:"sem informaçaao",email:"sem infomação"}, title, type_property, reloadEdit, purpose }: { id: string, purpose: string, documentationStatus: string, owner: Owner, status: string, agent: Agent, title: string, type_property: string, reloadEdit: () => void }) {
    return (

        <DialogCloseButton purpose={purpose} reloadEdit={reloadEdit} id={id} title={title} owner={owner} status={status} agent={agent} type_property={type_property} documentationStatus={documentationStatus} />

    );
}
const formSchema = z.object({
    id: z.string().min(1, { message: "informe o id" }),
    status: z.string().optional(),
    agent: z.string().optional(),
    title: z.string().min(1, { message: "informe o titulo" }),
    type_property: z.enum(["Casa", "Apartamento", "Lote", "Loja"], {
        message: "Selecione o status da documentação",
    }),
    documentation_status: z.string().optional(),
    purpose: z.string().optional()
})
type FormValues = z.infer<typeof formSchema>


export function DialogCloseButton({ id, documentationStatus, owner, status, agent, title, type_property, reloadEdit, purpose }: { purpose: string, documentationStatus: string, reloadEdit: () => void, id: string, owner: Owner, status: string, agent: Agent, title: string, type_property: string }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [agents, setAgents] = useState<Agent[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true)
                console.log("Carregando dados iniciais...")

                // Carregar proprietários primeiro para verificar se estão sendo buscados corretamente
                const agentData = await getAgents()
                console.log("Proprietários carregados:", agentData)
                setAgents(agentData)
                console.log("Todos os dados carregados com sucesso")
            } catch (error) {
                console.error("Erro ao carregar dados iniciais:", error)

            } finally {
                setIsLoading(false)
            }
        }

        loadInitialData()
    }, [])
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
    type typeRyes = 'Casa' | 'Apartamento' | 'Lote' | 'Loja'
    const castTypes = type_property as typeRyes
    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            id: id,
            status: status,
            agent: agent?.id||"sem informação",
            title: title,
            type_property: castTypes,
            documentation_status: documentationStatus,
            purpose: purpose

        },
    })
    async function onsubmit(data: FormValues) {
        const result = await updatePropertyHeader(id, {
            title: data.title,
            type_property: data.type_property,
            purpose: data.purpose,
            id_agent: data.agent,
            documentation_status: data.documentation_status,
            status:data.status
        })

        reloadEdit()
        setIsOpen(false);
    }
    return (
        <div>
            <Button onClick={() => openModal()} className="bg-primary-palet text-white "><Edit size={20} /> Editar</Button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="flex min-w-[380px]">
                    <Form {...methods} >
                        <form onSubmit={methods.handleSubmit(onsubmit)} className="space-y-1 max-w-[1200px] px-8">
                            <Label className="font-bold">Titulo</Label>
                            <FormField
                                control={methods.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>
                                            <Input placeholder="Titulo" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={methods.control}
                                name="agent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Corretor Responsavel</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl >
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Selecione corretor responsavel" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent >
                                                {agents && agents.length > 0 ? (
                                                    agents.map((agent) => (
                                                        <SelectItem key={agent.id} value={agent.id}>
                                                            {agent.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="no-owners" disabled>
                                                        Nenhum Corretor encontrado
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
                                name="type_property"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Tipo de Imovel</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Tipo do imovel" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Casa">Casa</SelectItem>
                                                <SelectItem value="Apartamento">Apartamento</SelectItem>
                                                <SelectItem value="Lote">Lote</SelectItem>
                                                <SelectItem value="Loja">Loja</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField

                                control={methods.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Status do Imovel</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o status do imovel" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Disponível">Disponivel</SelectItem>
                                                <SelectItem value="Reservado">Reservado</SelectItem>
                                                <SelectItem value="Vendido">Vendido</SelectItem>
                                                <SelectItem value="Alugado">Alugado</SelectItem>
                                                <SelectItem value="Indisponível">Indisponível</SelectItem>

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField

                                control={methods.control}
                                name="documentation_status"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Estatus da Documentação</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Regular">Regular</SelectItem>
                                                <SelectItem value="Irregular">Irregular</SelectItem>


                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField

                                control={methods.control}
                                name="purpose"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Finalidade do imóvel</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a finalidade" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Aluguel">Aluguel</SelectItem>
                                                <SelectItem value="Venda">Venda</SelectItem>


                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Salvar</Button>
                        </form>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
