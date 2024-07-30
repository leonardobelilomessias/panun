import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import { LayoutOne } from "@/layouts";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import { FaPencilAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup.string().required("Título é obrigatório"),
    description: yup.string().required("Descrição é obrigatória"),
    price: yup.number().positive().required("Preço é obrigatório"),
    address: yup.string().required("Endereço é obrigatório"),
    city: yup.string().required("Cidade é obrigatória"),
    neighborhood: yup.string().required("Bairro é obrigatório"),
    zip: yup.string().required("CEP é obrigatório"),
    // Add other fields as needed
  })
  .required();

function AddListingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <LayoutOne topbar={true}>
        <ShopBreadCrumb title="Adicionar Imovel" sectionPace="" currentSlug="Adicionar imóvel" />
        <div className="ltn__appointment-area pb-120">
          <Container>
            <Row>
              <Col xs={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Tab.Container defaultActiveKey="first">
                    <div className="ltn__tab-menu ltn__tab-menu-3 text-center">
                      <Nav className="nav justify-content-center">
                        <Nav.Link eventKey="first">1. Descrição</Nav.Link>
                        <Nav.Link eventKey="second">2. Mídias</Nav.Link>
                        <Nav.Link eventKey="third">3. Localização</Nav.Link>
                        <Nav.Link eventKey="fourth">4. Detalhes</Nav.Link>
                        <Nav.Link eventKey="five">5. Comodidades</Nav.Link>
                      </Nav>
                    </div>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="ltn__apartments-tab-content-inner">
                          <h6>Descrição do Imóvel</h6>
                          <Row>
                            <div className="col-md-12">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  {...register("title")}
                                  placeholder="*Título Do Imóvel (Obrigatório)"
                                />
                                {errors.title && <p>{errors.title.message}</p>}
                              </div>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <textarea
                                  {...register("description")}
                                  placeholder="Descrição"
                                ></textarea>
                                {errors.description && <p>{errors.description.message}</p>}
                              </div>
                            </div>
                          </Row>
                          <h6>Preço</h6>
                          <Row>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  {...register("price")}
                                  placeholder="Preço R$ (Apenas números)"
                                />
                                {errors.price && <p>{errors.price.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <h6>Selecione Categorias</h6>
                          <Row>
                            <Col xs={12} md={6} lg={4}>
                              <div className="input-item ltn__custom-icon">
                                <Form.Select {...register("category")} className="nice-select">
                                  <option>Apartamento</option>
                                  <option value="1">Lote</option>
                                  <option value="2">Casa</option>
                                  <option value="3">Sítio</option>
                                </Form.Select>
                              </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <div className="input-item ltn__custom-icon">
                                <Form.Select {...register("status")} className="nice-select">
                                  <option>Na Planta</option>
                                  <option value="1">Em Construção</option>
                                  <option value="2">Pronto Para Morar</option>
                                  <option value="3">Usado</option>
                                </Form.Select>
                              </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <div className="input-item ltn__custom-icon">
                                <Form.Select {...register("standard")} className="nice-select">
                                  <option>Minha casa minha vida</option>
                                  <option value="1">Médio Padrão</option>
                                  <option value="2">Alto Padrão</option>
                                </Form.Select>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="second">
                        <div className="ltn__product-tab-content-inner">
                          <h6>Adicione Fotos</h6>
                          <input
                            type="file"
                            {...register("images")}
                            id="myFile"
                            name="filename"
                            className="btn theme-btn-3 mb-10"
                            accept="image/*"
                            multiple
                          />
                          <br />
                          <p>
                            <small>* Selecione no mínimo uma imagem</small>
                          </p>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="third">
                        <div className="ltn__product-tab-content-inner">
                          <h6>Defina a Localização</h6>
                          <Row>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  {...register("address")}
                                  placeholder="*Endereço"
                                />
                                {errors.address && <p>{errors.address.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  {...register("city")}
                                  placeholder="Cidade"
                                />
                                {errors.city && <p>{errors.city.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  {...register("neighborhood")}
                                  placeholder="Bairro"
                                />
                                {errors.neighborhood && <p>{errors.neighborhood.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input type="text" {...register("zip")} placeholder="Cep" />
                                {errors.zip && <p>{errors.zip.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>

                            <Col xs={12}>
                              <div className="property-details-google-map mb-60">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd"></iframe>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  {...register("mapIframe")}
                                  placeholder="Iframe Google Maps"
                                />
                                {errors.mapIframe && <p>{errors.mapIframe.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="fourth">
                        <div className="ltn__product-tab-content-inner">
                          <h6>Outros Detalhes</h6>
                          <Row>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="number"
                                  {...register("bedrooms")}
                                  placeholder="Quartos"
                                />
                                {errors.bedrooms && <p>{errors.bedrooms.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input type="number" {...register("bathrooms")} placeholder="Banheiros" />
                                {errors.bathrooms && <p>{errors.bathrooms.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="number"
                                  {...register("garages")}
                                  placeholder="Garagens"
                                />
                                {errors.garages && <p>{errors.garages.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input type="number" {...register("area")} placeholder="Área em m²" />
                                {errors.area && <p>{errors.area.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="five">
                        <div className="ltn__product-tab-content-inner">
                          <h6>Comodidades</h6>
                          <Row>
                            <Col xs={12} md={6} lg={4}>
                              <Form.Check
                                type="checkbox"
                                label="Academia"
                                {...register("amenities.academy")}
                              />
                              {errors.amenities && errors.amenities.academy && (
                                <p>{errors.amenities.academy.message}</p>
                              )}
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <Form.Check
                                type="checkbox"
                                label="Ar Condicionado"
                                {...register("amenities.airConditioning")}
                              />
                              {errors.amenities && errors.amenities.airConditioning && (
                                <p>{errors.amenities.airConditioning.message}</p>
                              )}
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <Form.Check
                                type="checkbox"
                                label="Wi-Fi"
                                {...register("amenities.wifi")}
                              />
                              {errors.amenities && errors.amenities.wifi && (
                                <p>{errors.amenities.wifi.message}</p>
                              )}
                            </Col>
                          </Row>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                  <div className="btn-wrapper text-center mt-30">
                    <button type="submit" className="btn theme-btn-1 btn-effect-1 text-uppercase">
                      Enviar
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
        <CallToAction />
      </LayoutOne>
    </>
  );
}

export default AddListingPage;
