import { Container, Row, Col, Nav, Tab, ButtonGroup } from "react-bootstrap";
import { CardHouse } from "./cardHouse";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaRegPlusSquare } from "react-icons/fa";


export function TabPaneHigLights(){
    const [houses,setHouses] = useState([])
    async function  getHouses(){
      const resp= await axios.get(`/api/listproducts`)
      console.log(resp.data)
      setHouses(resp.data)
  
    }
    useEffect(()=>{
      getHouses()
    },[])
    return(
        <>

<Tab.Pane eventKey="ltn_tab_1_2">
                            <div style={{display:"flex",justifyContent:"flex-end"}}>
                              <Link href={`/add`} variant="danger" style={{backgroundColor:'black', padding:8, color:'white', borderRadius:12, margin:8 }}>
                            
                           <p style={{padding:0, margin:0, color:'white', fontWeight:"bold"}}>Adicionar novo <FaRegPlusSquare color="white" size={24}/> </p> 
                              </Link>
                            </div> 
                            <div className="ltn__myaccount-tab-content-inner">
                              <div className="ltn__my-properties-table table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Imovel</th>
                                      <th scope="col"></th>
                                      <th scope="col">Adiconado em </th>
                                      <th scope="col">Ação</th>
                                      
                                    </tr>
                                  </thead>
                                  <tbody>
                                            {
                                              houses.map((house)=>(
                                                <CardHouse setHouses={setHouses} getHouses={getHouses} house={house}
                                                />
                                              ))
                                            }
                                  </tbody>
                                </table>
                              </div>
                              <div className="ltn__pagination-area text-center">
                                <div className="ltn__pagination">
                                  <ul>
                                    <li>
                                      <Link href="#">
                                        <i className="fas fa-angle-double-left"></i>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#">1</Link>
                                    </li>
                                    <li className="active">
                                      <Link href="#">2</Link>
                                    </li>
                                    <li>
                                      <Link href="#">3</Link>
                                    </li>
                                    <li>
                                      <Link href="#">...</Link>
                                    </li>
                                    <li>
                                      <Link href="#">10</Link>
                                    </li>
                                    <li>
                                      <Link href="#">
                                        <i className="fas fa-angle-double-right"></i>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
        </>
    )
}