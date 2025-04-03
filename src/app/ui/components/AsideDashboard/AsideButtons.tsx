import { navigationElements} from "@/app/common/constants/navegationElements";
import { Separator } from "@/components/ui/separator";
import { ButtonAsideNavigation } from "./ButtonAsideNavigation";

export function AsideButtons(){
    return(
        <>
                <nav className="flex flex-col  gap-1 p-2 ">
                <Separator />
                  {navigationElements.map((element) => (
                    <div key={element.title} className="flex flex-col">
                      <p className="text-sm font-medium  p-2 ">{element.title}</p>
                      <ButtonAsideNavigation key={element.title} items={element.items}/>
                    </div>
                  ))}

                </nav>
        </>
    )
}