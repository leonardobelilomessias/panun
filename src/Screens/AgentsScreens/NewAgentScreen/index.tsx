'use client'
import { ContainerScreen } from "@/components/modules/Containers/ContainerSceen";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Modal from 'react-modal';
export function NewAgentScreen() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

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
    return (
        <ContainerScreen>
            <div >
                <h1 className="text-2xl font-bold">Criar novo  Corretor</h1>
                <div>
                    <form className="flex flex-col gap-2">
                        <Input placeholder="Nome" />
                        <Input placeholder="Email" />
                        <Input placeholder="Telefone" />
                        <Input placeholder="Renda" />
                        <Input placeholder="Estado civil" />



                    </form>
                        <Button onClick={()=>openModal()} className="bg-primary-palet text-white w-44"><Save size={20} /> Salvar Corretor</Button>
                </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="flex flex-col p-16">

                <h1 className="text-2xl font-bold">Correor Criado com suceso</h1>
                <div className="flex gap-2">
                <Button onClick={()=>closeModal()} className="bg-primary-palet text-white w-44"> Fechar</Button>
                <Link href={'/clientes/cliente-exemplo'}>
                <Button  className="bg-white border  border-primary-palet  text-primary-palet w-44">Ver Corretor</Button>
                </Link>
                </div>

                </div>
            </Modal>
            </div>
        </ContainerScreen>
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

