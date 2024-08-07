import { LayoutOne } from "@/layouts";
import { Container, Row, Col, Nav, Tab, ButtonGroup } from "react-bootstrap";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import Accordion from "react-bootstrap/Accordion";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  FaHome,
  FaUserAlt,
  FaMapMarkerAlt,
  FaList,
  FaHeart,
  FaMapMarked,
  FaDollarSign,
  FaSignOutAlt,
  FaLock,
  FaEnvelope,
  FaArrowDown,
  FaPencilAlt,
  FaPhoneAlt,
  FaTrashAlt,
  FaStar,
  FaRegStarHalf,
  FaRegStar,
  FaGlobe,
  FaRegPlusSquare,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import environment from "@/params/environment";
import { CardHouse } from "@/components/adm/cardHouse";
import { IoAddCircle } from "react-icons/io5";
import { TabPaneAllItens } from "@/components/adm/tabPaneAllItems";
import { TabPaneHigLights } from "@/components/adm/TabPaneHighLights";

function MyAccount() {
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
  return (
    <>
      <LayoutOne topbar={true}>
        <ShopBreadCrumb
          title="adm"
          sectionPace=""
          currentSlug="Adm"
        />

        {/* <!-- LOGIN AREA START --> */}
        <div className="liton__wishlist-area pb-70">
          <Container>
            <Row>
              <Col xs={12}>
                {/* <!-- PRODUCT TAB AREA START --> */}
                <div className="ltn__product-tab-area">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="ltn_tab_1_5"
                  >
                    <Row>
                      <Col xs={12} lg={4}>
                        <div className="ltn__tab-menu-list mb-50">
                          <Nav variant="pills" className="flex-column">

                            <Nav.Item>
                              <Nav.Link eventKey="ltn_tab_1_5">
                                Todos Imoveis <FaList />
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="ltn_tab_1_2">
                                Destaques <FaList />
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="ltn_tab_1_1">
                                Lançamentos <FaList />
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link href="/login">
                                Sair <FaSignOutAlt />
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </div>
                      </Col>
                      <Col xs={12} lg={8}>
                        <Tab.Content>
                          <Tab.Pane eventKey="ltn_tab_1_1">
                            <div className="ltn__myaccount-tab-content-inner">
                              <p>
                                Hello <strong>UserName</strong> (not
                                <strong>UserName</strong>?
                                <small>
                                  <Link href="/login">Log out</Link>
                                </small>
                                )
                              </p>
                              <p>
                                From your account dashboard you can view your
                                <span>recent orders</span>, manage your
                                <span>shipping and billing addresses</span>, and
                                <span>
                                  edit your password and account details
                                </span>
                                .
                              </p>
                            </div>
                          </Tab.Pane>
                          <TabPaneAllItens/>
                          <TabPaneHigLights/>



                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
                {/* <!-- PRODUCT TAB AREA END --> */}
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- LOGIN AREA END --> */}

        <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
          <Container>
            <Row>
              <Col xs={12}>
                <CallToAction />
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
    </>
  );
}

export default MyAccount;
