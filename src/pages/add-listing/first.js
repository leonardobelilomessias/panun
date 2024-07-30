import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

export function ButtonStep({stepName,stp,setStp}){
    // const  stepName = ["first",'second','third','fourth','five']
    // const [stp,setStp] = useState(0)
    console.log(stepName[stp])
    useEffect(()=>{
      setStp(0)
    },[])
    return(
    <>
    {stp>0&&
    
     <Nav.Link onClick={()=>setStp(stp-1)} eventKey={stepName[stp-1]} className="btn theme-btn-1 btn-effect-1 text-uppercase">
                              Anterior
    </Nav.Link>
    }
    {
        stp<4&&
      <Nav.Link onClick={()=>setStp(stp+1)} eventKey={stepName[stp+1]} className="btn theme-btn-1 btn-effect-1 text-uppercase">
                              Proximo
     </Nav.Link>
    }

    </>
    )
}