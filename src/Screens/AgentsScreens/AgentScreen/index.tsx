import { ContainerScreen } from "@/components/modules/Containers/ContainerSceen"
import { Edit, Edit2 } from "lucide-react"
import Link from "next/link"

const infos = [
    { title: "Email", data: "cliente@email.com", id: 1 }, 
    {title:"Estado Civil",data:"Solteiro", id:2},





]
export default function AgentScreeen() {
    return (
        <ContainerScreen>

            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="w-20 h-20 bg-primary-palet bg-opacity-45 rounded-full"></div>
                    <div>
                        <p className="text-lg font-semibold"> Nome do Corretor</p>
                        <p>Telefone:(31)999999</p>
                        <p>Endereço: Endereço do cliente</p>
                    </div>
                    <Link href="#" className="flex gap-1 h-8 rounded bg-primary-palet text-white justify-center items-center p-4 flex-shrink-0 flex-grow-0"><Edit size={16}className="text-white"/><p className="">Editar</p></Link>
                </div>
                <div className="flex flex-col gap-2">
                    {
                        infos.map((info) => (
                            <RowData key={info.id} id={info.id} field={info.title} data={info.data} />

                        ))
                    }



                </div>
            </div>
        </ContainerScreen>
    )
}

function RowData({ field, data, id }: { field: string, data: string, id: number }) {
    return (
        <div className={`flex gap-1 border-b-1 p-4 ${id % 2 !== 0 ? 'bg-primary-palet bg-opacity-10' : 'bg-primary-palet bg-opacity-[0.04]'} rounded-lg`} >
            <p className="font-semibold text-primary-palet">{field}: </p> <p className="text-gray-700"> {data}</p>
        </div>
    )
}