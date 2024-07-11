import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaCarAlt,
  FaCookie,
  FaDollyFlatbed,
  FaHome,
} from "react-icons/fa";
import Link from "next/link";
import PriceRange from "../priceRange";

function CarDealerSearchFormTwo() {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12}>
            <div className="slide-item-car-dealer-form">
              <div className="ltn__car-dealer-form-tab">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <div className={`ltn__tab-menu text-uppercase`}>
                    {/* <Nav variant="pills">
                      <Nav.Item className="me-2">
                        <Nav.Link eventKey="first">
                          <FaHome />
                          Casas
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <FaHome />
                          Apartamentos
                        </Nav.Link>
                      </Nav.Item>
                    </Nav> */}
                  </div>

                  <Tab.Content className="tab-content">
                    <Tab.Pane eventKey="first">
                      <div className="car-dealer-form-inner">
                        <form
                          action="#"
                          className="ltn__car-dealer-form-box row"
                        >
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar"
                          >
                            <span className="inline-icon">
                              <FaCalendarAlt />
                            </span>
                            <Form.Select className="nice-select">
                              <option>Tipo</option>
                              <option>Apartemento</option>
                              <option>Casa</option>
                            </Form.Select>
                          </Col>
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car"
                          >
                            <span className="inline-icon">
                              <FaCarAlt />
                            </span>
                            <Form.Select className="nice-select">
                              <option>Localização</option>
                              <option>Belo Horizonte</option>
                              <option>Venda Nova</option>
                              <option>Betim</option>
                              <option>Contagem</option>
                              <option>Vespasiano</option>
                              <option>Sabará</option>
                            </Form.Select>
                          </Col>
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter"
                          >
                            <span className="inline-icon">
                              <FaCookie />
                            </span>
                            <Form.Select className="nice-select">
                                <option>Bairros</option>
                                <option>Centro</option>
                                <option>Savassi</option>
                                <option>Pampulha</option>
                                <option>Lourdes</option>
                                <option>Buritis</option>
                                <option>Cidade Nova</option>
                                <option>Sion</option>
                                <option>Belvedere</option>
                                <option>Santa Efigênia</option>
                                <option>Barro Preto</option>
                            </Form.Select>
                          </Col>
 
                          <Col xs={12} className="car-price-filter-range">
                            {/* <div className="price_filter">
                              <PriceRange />
                            </div> */}

                            <div className="btn-wrapper text-center">
                              <Link
                                href="/shop/left-sidebar"
                                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                              >
                                Fazer Busca
                              </Link>
                            </div>
                          </Col>
                        </form>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div className="car-dealer-form-inner">
                        <form
                          action="#"
                          className="ltn__car-dealer-form-box row"
                        >
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-calendar"
                          >
                            <span className="inline-icon">
                              <FaCalendarAlt />
                            </span>
                            <Form.Select className="nice-select">
                              <option>Property Type</option>
                              <option>Apartment</option>
                              <option>Co-op</option>
                              <option>Condo</option>
                              <option>Single Family Home</option>
                            </Form.Select>
                          </Col>
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-car"
                          >
                            <span className="inline-icon">
                              <FaCarAlt />
                            </span>
                            <Form.Select className="nice-select">
                              <option>Location</option>
                              <option>chicago</option>
                              <option>London</option>
                              <option>Los Angeles</option>
                              <option>New York</option>
                              <option>New Jersey</option>
                            </Form.Select>
                          </Col>
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-meter"
                          >
                            <span className="inline-icon">
                              <FaCookie />
                            </span>
                            <Form.Select className="nice-select">
  <option>Sub Location</option>
  <option>Centro</option>
  <option>Savassi</option>
  <option>Pampulha</option>
  <option>Lourdes</option>
  <option>Buritis</option>
  <option>Cidade Nova</option>
  <option>Sion</option>
  <option>Belvedere</option>
  <option>Santa Efigênia</option>
  <option>Barro Preto</option>
                            </Form.Select>
                          </Col>
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-ring"
                          >
                            <span className="inline-icon">
                              <FaDollyFlatbed />
                            </span>
                            <Form.Select className="nice-select">
                              <option>Quartos</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </Form.Select>
                          </Col>
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-cog"
                          >
                            <div className="input-item input-item-name ltn__custom-icon">
                              <input
                                type="text"
                                name="name"
                                placeholder="Min size (in sqft)"
                              />
                            </div>
                          </Col>
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            className="ltn__car-dealer-form-item ltn__custom-icon ltn__icon-cog"
                          >
                            <div className="input-item input-item-name ltn__custom-icon">
                              <input
                                type="text"
                                name="name"
                                placeholder="Max size (in sqft)"
                              />
                            </div>
                          </Col>
                          <Col xs={12} className="car-price-filter-range">
                            <div className="price_filter">
                              <PriceRange />
                            </div>

                            <div className="btn-wrapper text-center">
                              <Link
                                href="/shop/left-sidebar"
                                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                              >
                                Search Inventory
                              </Link>
                            </div>
                          </Col>
                        </form>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default CarDealerSearchFormTwo;
