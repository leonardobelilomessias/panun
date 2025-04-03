import { TipsScreen } from "@/ui/Screens/Tips/TipsScreen";
import { Suspense } from "react";

export default  function dicas(){
    return(      <Suspense fallback={<p>Carregando...</p>}>
        <TipsScreen />
      </Suspense>)
}
