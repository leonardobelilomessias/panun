import { FaCheckCircle } from "react-icons/fa";

export function Amenities({amenities}){
    const test = ["teste","test"]
    return(
        <>
                          <h4 className="title-2 mb-10">Comodidades</h4>

<div className="property-details-amenities mb-60">
  <div className="row">
    <div className="col-lg-4 col-md-6">
      <div className="ltn__menu-widget">
        <ul>
          {/* {amenities.map((single, key) => {
            return (
              <li key={key}>
                  <FaCheckCircle />
               
                  {single}
             
              </li>
            );
          })} */}
          <p><RendeAmenities amn= {amenities}/>comod</p>
        </ul>
      </div>
    </div>


  </div>
</div>
        </>
    )
}

function RendeAmenities({amn}){
    const values = []
   for (const [key, value] of Object.entries(amn)) {
        values.push(key.toString())
        console.log(key.toString())
      }
   return(<>
{values.map((single, key) => {
            return (
              <li key={key}>
                  <FaCheckCircle />
               
                  {single}
             
              </li>
            );
          })}
   </>)
}