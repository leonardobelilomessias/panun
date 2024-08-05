import { LayoutOne } from "@/layouts";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
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
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import environment from "@/params/environment";
import { CardHouse } from "@/components/adm/cardHouse";

function MyAccount() {
  const [houses,setHouses] = useState([])
  async function  getHouses(){
    const resp= await axios.get(`/api/listproducts`)
    console.log(resp.data)
    setHouses(resp.data)

  }
  useEffect(()=>{
    getHouses()
  },[])
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
                                Imoveis Cadastrados <FaList />
                              </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                              <Nav.Link href="/add-listing">
                                Adicionar novo imóvel <FaList />
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

                          <Tab.Pane eventKey="ltn_tab_1_5">
                            <div className="ltn__myaccount-tab-content-inner">
                              <div className="ltn__my-properties-table table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">My Properties</th>
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

                          <Tab.Pane eventKey="ltn_tab_1_7">
                            <div className="ltn__myaccount-tab-content-inner">
                              <h6>Property Description</h6>
                              <Row>
                                <div className="col-md-12">
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="*Title (mandatory)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <textarea
                                      name="ltn__message"
                                      placeholder="Description"
                                    ></textarea>
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </div>
                              </Row>
                              <h6>Property Price</h6>
                              <Row>
                                <Col xs={12} md={6}>
                                  <div className="input-item  input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Price in R$ (only numbers)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="After Price Label (ex: /month)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Before Price Label (ex: from)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Yearly Tax Rate"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Homeowners Association Fee(monthly)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                              <h6>Select Categories</h6>
                              <Row>
                                <Col xs={12} md={6} lg={4}>
                                  <div className="input-item ltn__custom-icon">
                                    <select className="nice-select">
                                      <option>None</option>
                                      <option>Apartments</option>
                                      <option>Condos</option>
                                      <option>Duplexes</option>
                                      <option>Houses</option>
                                      <option>Industrial</option>
                                      <option>Land</option>
                                      <option>Offices</option>
                                      <option>Retail</option>
                                      <option>Villas</option>
                                    </select>
                                    <span className="inline-icon">
                                      <FaArrowDown />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <div className="input-item ltn__custom-icon">
                                    <select className="nice-select">
                                      <option>None</option>
                                      <option>Rentals</option>
                                      <option>Sales</option>
                                    </select>
                                    <span className="inline-icon">
                                      <FaArrowDown />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <div className="input-item ltn__custom-icon">
                                    <select className="nice-select">
                                      <option>no status</option>
                                      <option>Active</option>
                                      <option>hot offer</option>
                                      <option>new offer</option>
                                      <option>open house</option>
                                      <option>sold</option>
                                    </select>
                                    <span className="inline-icon">
                                      <FaArrowDown />
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                              <h6>Listing Media</h6>
                              <input
                                type="file"
                                id="myFile"
                                name="filename"
                                className="btn theme-btn-3 mb-10"
                              />
                              <br />
                              <p>
                                <small>
                                  * At least 1 image is required for a valid
                                  submission.Minimum size is 500/500px.
                                </small>
                                <br />
                                <small>
                                  * PDF files upload supported as well.
                                </small>
                                <br />
                                <small>
                                  * Images might take longer to be processed.
                                </small>
                              </p>
                              <h6>Video Option</h6>
                              <Row>
                                <Col xs={12} md={6}>
                                  <div className="input-item ltn__custom-icon">
                                    <select className="nice-select">
                                      <option>Video from</option>
                                      <option>vimeo</option>
                                      <option>youtube</option>
                                    </select>
                                    <span className="inline-icon">
                                      <FaArrowDown />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Embed Video ID"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                              <h6>Virtual Tour</h6>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <textarea
                                  name="ltn__message"
                                  placeholder="Virtual Tour:"
                                ></textarea>
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                              <h6>Listing Localização</h6>
                              <Row>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="*Address"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Country"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="County / State"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="City"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Neighborhood"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Zip"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <div className="col-lg-12">
                                  <div className="property-details-google-map mb-60">
                                    <iframe
                                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd"
                                      width="100%"
                                      height="100%"
                                    ></iframe>
                                  </div>
                                </div>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Latitude (for Google Maps)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Longitude (for Google Maps)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <label className="checkbox-item">
                                    Enable Google Street View
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Google Street View - Camera Angle (value from 0 to 360)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                              <h6>Listing Details</h6>
                              <Row>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Size in ft2 (*only numbers)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Lot Size in ft2 (*only numbers)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Rooms (*only numbers)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Quartos (*only numbers)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Banheiros (*only numbers)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Custom ID (*text)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Garagems (*text)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Year Built (*numeric)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Garagem Size (*text)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Available from (*date)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Basement (*text)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Extra Details (*text)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Roofing (*text)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Exterior Material (*text)"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item ltn__custom-icon">
                                    <select className="nice-select">
                                      <option>Structure Type</option>
                                      <option>Not Available</option>
                                      <option>Brick</option>
                                      <option>Wood</option>
                                      <option>Cement</option>
                                    </select>
                                    <span className="inline-icon">
                                      <FaArrowDown />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item ltn__custom-icon">
                                    <select className="nice-select">
                                      <option>Floors No</option>
                                      <option>Not Available</option>
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                    </select>
                                    <span className="inline-icon">
                                      <FaArrowDown />
                                    </span>
                                  </div>
                                </Col>
                                <div className="col-lg-12">
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <textarea
                                      name="ltn__message"
                                      placeholder="Owner/Agent notes (*not visible on front end)"
                                    ></textarea>
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </div>
                              </Row>
                              <h6>Select Energy ClassNameclassName</h6>
                              <Row>
                                <Col xs={12} md={6}>
                                  <div className="input-item ltn__custom-icon">
                                    <select className="nice-select">
                                      <option>
                                        Select Energy ClassNameclassName (EU
                                        regulation)
                                      </option>
                                      <option>A+</option>
                                      <option>A</option>
                                      <option>B</option>
                                      <option>C</option>
                                      <option>D</option>
                                      <option>E</option>
                                    </select>
                                    <span className="inline-icon">
                                      <FaArrowDown />
                                    </span>
                                  </div>
                                </Col>
                                <Col xs={12} md={6}>
                                  <div className="input-item input-item-textarea ltn__custom-icon">
                                    <input
                                      type="text"
                                      name="ltn__name"
                                      placeholder="Energy Index in kWh/m2a"
                                    />
                                    <span className="inline-icon">
                                      <FaPencilAlt />
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                              <h6>Amenities and Features</h6>
                              <h6>Interior Details</h6>
                              <Row>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Equipped Kitchen
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Gym
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Laundry
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Media Room
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                              </Row>
                              <h6 className="mt-20">Outdoor Details</h6>
                              <Row>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Back yard
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Basketball court
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Front yard
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Garagem Attached
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Hot Bath
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Pool
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                              </Row>
                              <h6 className="mt-20">Utilities</h6>
                              <Row>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Central Air
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Electricity
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Heating
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Natural Gas
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Ventilation
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Water
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                              </Row>
                              <h6 className="mt-20">Other Features</h6>
                              <Row>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Chair Accessible
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Elevator
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Fireplace
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Smoke detectors
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    Washer and dryer
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                  <label className="checkbox-item">
                                    WiFi
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </Col>
                              </Row>
                              <div
                                className="alert alert-warning d-none"
                                role="alert"
                              >
                                Please note that the date and time you requested
                                may not be available. We will contact you to
                                confirm your actual appointment details.
                              </div>
                              <div className="btn-wrapper text-center--- mt-30">
                                <button
                                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                  type="submit"
                                >
                                  Submit Property
                                </button>
                              </div>
                            </div>
                          </Tab.Pane>

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
