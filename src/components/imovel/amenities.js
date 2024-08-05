import { FaBicycle, FaBirthdayCake, FaCheckCircle, FaChild, FaDoorOpen, FaDumbbell, FaHome, FaLock, FaPaw, FaSpa, FaSwimmer, FaTools, FaUsers, FaWheelchair } from "react-icons/fa";
import { FaElevator } from "react-icons/fa6";
import { GiWashingMachine } from "react-icons/gi";
export function Amenities({amenities}){
  const translationMap = {
    backyard: 'Quintal',
    bike_rack: 'Suporte para Bicicleta',
    coworking: 'Espaço de Co-Working',
    gym: 'Academia',
    handicapped: 'Acessível',
    lift: 'Elevador',
    pet_place: 'Espaço para Animais',
    playground: 'Parquinho',
    pool: 'Piscina',
    porter: 'Portaria',
    private_area: 'Área Privada',
    salon_party: 'Salão de Festas',
    sauna: 'Sauna',
    service_area: 'Área de Serviço',
    washing: 'Lavanderia',
  };
  
    const test = ["teste","test"]
    return(
        <>
                          <h4 className="title-2 mb-10">Comodidades</h4>

<div className="property-details-amenities mb-60">
  <div className="row">
    <div style={{display:'flex', flexDirection:"row"}}>
      <div style={{display:'flex', flexDirection:"row", flexWrap:'wrap'}}>
        
          {/* {amenities.map((single, key) => {
            return (
              <li key={key}>
                  <FaCheckCircle />
               
                  {single}
             
              </li>
            );
          })} */}
          <RendeAmenities amn= {amenities}/>
     
      </div>
    </div>


  </div>
</div>
        </>
    )
}

function RendeAmenities({amn}){
    const values = []
    const translationMap = {

      backyard: { name: 'Quintal', icon:<FaHome size={24} /> },
      bike_rack: { name: 'Suporte para Bicicleta', icon: <FaBicycle /> },
      coworking: { name: 'Espaço de Co-Working', icon: <FaUsers /> },
      gym: { name: 'Academia', icon: <FaDumbbell /> },
      handicapped: { name: 'Acessibilidade', icon: <FaWheelchair /> },
      lift: { name: 'Elevador', icon: <FaElevator /> },
      pet_place: { name: 'Pet Place', icon: <FaPaw /> },
      playground: { name: 'Playground', icon: <FaChild /> },
      pool: { name: 'Piscina', icon: <FaSwimmer /> },
      porter: { name: 'Portaria 24hrs', icon: <FaDoorOpen /> },
      private_area: { name: 'Área Privativa', icon: <FaLock /> },
      salon_party: { name: 'Salão de Festas', icon: <FaBirthdayCake /> },
      sauna: { name: 'Sauna', icon: <FaSpa /> },
      service_area: { name: 'Área de Serviço', icon: <FaTools /> },
      washing: { name: 'Lavanderia', icon: <GiWashingMachine  /> },
    };
   for (const [key, value] of Object.entries(amn)) {
    if(value){
      values.push(key.toString())
    }
        console.log(key.toString())
        console.log(value.toString())
        

      }
   return(<>
{values.map((single, key) => {
            return (
              <>
              <div key={key} style={{padding:8, display:'flex', alignItems:"center", margin:8, justifyContent:'space-between',alignContent:"space-between"}}>
             
                  {translationMap[String(single)].icon}
                  <div style={{display:"flex", flexDirection:"row", marginLeft:4}}>
                  {translationMap[String(single)]['name']}
                  
                  </div>
                  
             
              </div>
              </>
            );
          })}
   </>)
}


function SelectIcon({lokey}) {
  console.log('mykey ',lokey)
  switch (lokey) {
    case 'Quintal':
      return <FaHome />;
    case 'Suporte para Bicicleta':
      return <FaBicycle />;
    case 'Espaço de Co-Working':
      return <FaUsers />;
    case 'Academia':
      return <FaDumbbell />;
    case 'Acessível':
      return <FaWheelchair />;
    case 'Elevador':
      return <FaElevator />;
    case 'Espaço para Animais':
      return <FaPaw />;
    case 'Parquinho':
      return <FaChild />;
    case 'Piscina':
      return <FaSwimmer />;
    case 'Portaria':
      return <FaDoorOpen />;
    case 'Área Privada':
      return <FaLock />;
    case 'Salão de Festas':
      return <FaBirthdayCake />;
    case 'Sauna':
      return <FaSpa />;
    case 'Área de Serviço':
      return <FaTools />;
    case 'Lavanderia':
      return <GiWashingMachine />;
    default:
      return <FaCheckCircle size={24} color="black" />;
  }
}