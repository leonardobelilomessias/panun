import { ClientCard } from "./ClientBoxDashboard/ClientsCard";
import { ContainerLastProperties } from "./ContainersBoxDashBoard/ContainerLastProperties";
import { EmptyBoxContainer } from "./EmptyContainer";

export function LastPropertiesRent(){
    let lastPropertiesRent:any[] =[]
    return(
<ContainerLastProperties title="Ultimo Propiedade Para aluguel">

                { !lastPropertiesRent?.length && <EmptyBoxContainer/>}
            <div className="flex gap-4 flex-1 ">
        

                {
                    lastPropertiesRent.map((porpo,key)=>(
                        <ClientCard key={key} agent="name" property="nome propriesda" name="Teste titulo"/>
                    ))
                }
            </div>
</ContainerLastProperties>

    )
}
