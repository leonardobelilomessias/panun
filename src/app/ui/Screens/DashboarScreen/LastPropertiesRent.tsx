import { ClientCard } from "./ClientBoxDashboard/ClientsCard";
import { ContainerLastProperties } from "./ContainersBoxDashBoard/ContainerLastProperties";
import { EmptyBoxContainer } from "./EmptyContainer";

export function LastPropertiesRent({lastPropertiesRent}:{lastPropertiesRent:any[]}){
    return(
<ContainerLastProperties title="Ultimo Propiedade Para aluguel">

                { !lastPropertiesRent?.length && <EmptyBoxContainer/>}
            <div className="flex gap-4 flex-1 ">
        

                {
                    lastPropertiesRent.map(()=>(
                        <ClientCard agent="name" property="nome propriesda" name="Teste titulo"/>
                    ))
                }
            </div>
</ContainerLastProperties>

    )
}
