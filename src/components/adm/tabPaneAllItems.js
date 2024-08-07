import { Container, Row, Col, Nav, Tab, ButtonGroup } from "react-bootstrap";
import { CardHouse } from "./cardHouse";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaRegPlusSquare } from "react-icons/fa";
import ReactPaginate from "react-paginate";


export function TabPaneAllItens(){
  const [houses,setHouses] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  async function  getHouses(){
    const resp= await axios.get(`/api/listProductsPagination`)
    console.log(resp.data)
    setHouses(resp.data.products)

  }
  useEffect(()=>{
    //getHouses() 
    fetchProducts(currentPage + 1);
  },[currentPage])
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
        const response = await axios.get(`/api/listProductsPagination`, {
            params: {
                page,
                pageSize
            }
        });
        setHouses(response.data.products);
        setTotalPages(response.data.totalPages);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    setLoading(false);
};
const handlePageClick = ({ selected }) => {
  setCurrentPage(selected);
};
    return(
        <>

<Tab.Pane eventKey="ltn_tab_1_5">
                            <div style={{display:"flex",justifyContent:"flex-end"}}>
                              <button variant="danger" style={{backgroundColor:'black', padding:8, color:'white', borderRadius:12, margin:8 }}>
                            
                           <p style={{padding:0, margin:0, color:'white', fontWeight:"bold"}}>Adiconar novo <FaRegPlusSquare color="white" size={24}/> </p> 
                              </button>
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
                              <ReactPaginate
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  pageCount={totalPages}
                  nextLabel={<FaAngleDoubleRight />}
                  previousLabel={<FaAngleDoubleLeft />}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination ltn__pagination justify-content-center"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
                            </div>
                          </Tab.Pane>
        </>
    )
}