'use client'

import { useSearchParams } from "next/navigation"
import { HousesBlock } from "../../../components/modules/Sections/HousesBlock"
import { HeroSearch } from "../../../components/modules/Hero/HeroSearch"
import { HouseResultSearch } from "../../../components/modules/Sections/HouseResultSearch"

export function PropertiesScreen(){
    // const params = useSearchParams()
    // const tipo = params.get('tipo')
    // const categoria = params.get('categoria')
    // const cidade = params.get('cidade')
    // const bairro = params.get('bairro')

    return(
        <div>
        <HouseResultSearch/>
            {/* <p>propersties</p>
            parametros={JSON.stringify(tipo)}
            categoria={JSON.stringify(categoria)}
            cidade={JSON.stringify(cidade)}
            bairro={JSON.stringify(bairro)} */}
        </div>
    )
}