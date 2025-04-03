import { ReactNode } from "react";

export function ContainerCardsHouse({children}:{children:ReactNode}){
    return(
        <div className=" px-4 py-8 bg-white md:p-14 md:px-32">
            {children}
        </div>
    )
}