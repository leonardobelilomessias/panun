import { Copy, Save, Search } from "lucide-react"
import Modal from 'react-modal';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { updatePropertyHeader, updatePropertyOwner } from "@/lib/supabase/queries/client/properties/updateProperty";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent, Owner } from "@/types/typesPropeties";
import { getAgents, getOwners, searchOwners } from "@/actions/property-actions";

export function DialogFormOwner({ name, id_owner, idProperty, reloadEdit }:{ name:string, id_owner:string, idProperty:string, reloadEdit:()=>void }) {
    return (
        <DialogCloseButton id_owner={id_owner} name={name} idProperty={idProperty} reloadEdit={reloadEdit} />
    );
}

const formSchema = z.object({
    id_owner: z.string().min(1, { message: "Informe o id do proprietário" }),
    searchTerm: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function DialogCloseButton({ name, id_owner, idProperty, reloadEdit }:{ name:string, id_owner:string, idProperty:string, reloadEdit:()=>void }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [owners, setOwners] = useState<Owner[]>([]);
    const [filteredOwners, setFilteredOwners] = useState<Owner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                console.log("Carregando dados iniciais...");
                const ownerData = await getOwners();
                console.log("Proprietários carregados:", ownerData);
                setOwners(ownerData);
                setFilteredOwners(ownerData);
                console.log("Todos os dados carregados com sucesso");
            } catch (error) {
                console.error("Erro ao carregar dados iniciais:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (modalIsOpen) {
            loadInitialData();
        }
    }, [modalIsOpen]);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setFilteredOwners(owners);
            return;
        }
        
        setIsLoading(true);
        try {
            const results = await searchOwners(searchTerm);
            setFilteredOwners(results);
        } catch (error) {
            console.error("Erro ao buscar proprietários:", error);
        } finally {
            setIsLoading(false);
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setSearchTerm("");
        setFilteredOwners([]);
    }

    const methods = useForm({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            id_owner,
            searchTerm: "",
        },
    });

    const selectOwner = (ownerId:string) => {
        methods.setValue("id_owner", ownerId);
    };

    async function onsubmit(data:FormValues) {
        const result = await updatePropertyOwner(idProperty, {
            id_owner: data.id_owner
        });

        reloadEdit();
        setIsOpen(false);
    }

    return (
        <div>
            <Button onClick={openModal} className="bg-primary-palet text-white w-44">
                <Save size={20} /> Editar
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Selecionar Proprietário"
                ariaHideApp={false}
            >
                <div className="flex flex-col min-w-[450px] max-h-[90vh]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Selecionar Proprietário</h2>
                        <Button variant="ghost" onClick={closeModal} className="h-8 w-8 p-0">
                            ✕
                        </Button>
                    </div>

                    <Form {...methods}>
                        <form onSubmit={methods.handleSubmit(onsubmit)} className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Input
                                    placeholder="Buscar proprietário..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1"
                                />
                                <Button 
                                    type="button" 
                                    onClick={handleSearch} 
                                    className="bg-primary-palet text-white"
                                >
                                    <Search size={18} />
                                </Button>
                            </div>

                            <FormField
                                control={methods.control}
                                name="id_owner"
                                render={({ field }) => (
                                    <FormItem className="hidden">
                                        <FormControl>
                                            <Input {...field} type="hidden" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="border rounded-md overflow-hidden mb-4">
                                <div className="max-h-[300px] overflow-y-auto">
                                    {isLoading ? (
                                        <div className="p-4 text-center">Carregando proprietários...</div>
                                    ) : filteredOwners.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500">
                                            Nenhum proprietário encontrado
                                        </div>
                                    ) : (
                                        <ul className="divide-y">
                                            {filteredOwners.map((owner) => (
                                                <li 
                                                    key={owner.id} 
                                                    className={`p-3 hover:bg-gray-100 cursor-pointer transition-colors ${
                                                        methods.watch("id_owner") === owner.id ? "bg-blue-50" : ""
                                                    }`}
                                                    onClick={() => selectOwner(owner.id)}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium">{owner.name}</p>
                                                            {owner.email && (
                                                                <p className="text-sm text-gray-500">{owner.email}</p>
                                                            )}
                                                        </div>
                                                        {methods.watch("id_owner") === owner.id && (
                                                            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={closeModal}>
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="bg-primary-palet text-white"
                                    disabled={!methods.watch("id_owner")}
                                >
                                    Salvar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
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
        padding: '24px',
        borderRadius: '8px',
        maxHeight: '90vh',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
};