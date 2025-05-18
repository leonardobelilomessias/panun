import { Copy, Edit, Save, Trash2 } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { deleteOwnerById } from "@/lib/supabase/queries/client/Owners/deleteOwnerByid";


export function DialogToDeleteOwner({
    idOwner,
    reloadEdit,
}: {idOwner:string, reloadEdit:()=>void}) {
    return (
        <DialogCloseButton 
             idOwner={idOwner}

            reloadEdit={reloadEdit} 
        />
    );
}





export function DialogCloseButton({
    idOwner,
    reloadEdit,
}: {idOwner:string, reloadEdit:()=>void}) {
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
    async function deleteOwner(){

        await deleteOwnerById(idOwner)
        reloadEdit()
        closeModal()
    }
    
    return (
        <div>
            <Button onClick={() => openModal()} variant={'ghost'}>
                <Trash2 size={20} className="text-red-500" />

            </Button>
            
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Editar Detalhes da Propriedade"
            >
                <Card>
                    <CardHeader>Deletar Proprietario</CardHeader>
                    <CardContent>
                        <p>Tem certeza que deseja deletar o proprietario? Após a confirmação a ação não poderá ser revertida</p>
                        <div className="flex gap-2 my-4">
                            <Button variant={'outline'} onClick={()=> closeModal()}>
                                Cancelar
                            </Button>
                            <Button className="bg-red-500" onClick={()=>deleteOwner()}>
                                Deletar Proprietario
                            </Button>
                        </div>
                    </CardContent>
                </Card>
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