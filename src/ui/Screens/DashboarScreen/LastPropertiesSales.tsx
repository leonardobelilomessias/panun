import { ClientCard } from "./ClientBoxDashboard/ClientsCard";
import { ContainerLastProperties } from "./ContainersBoxDashBoard/ContainerLastProperties";
import { EmptyBoxContainer } from "./EmptyContainer";

export function LastPropertiesSales(){
    let lastPropertiesRent:any[] =[]
    return(
        <ContainerLastProperties title="Ultimos imoveis a venda adicionado">

                                { !lastPropertiesRent?.length && <EmptyBoxContainer/>}
            <div className="flex gap-4 flex-1">

                
                            <div className="flex gap-4">
                
                                {
                                    lastPropertiesRent.map((element,key)=>(
                                        <ClientCard key={key} agent="name" property="nome propriesda" name="Teste titulo"/>
                                    ))
                                }
                            </div>

            </div>
        </ContainerLastProperties>

    )
}