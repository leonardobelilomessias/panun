import Link from "next/link";
import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import { LayoutOne } from "@/layouts";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import CallToAction from "@/components/callToAction";
import { FaPencilAlt, FaTrash, FaTrashAlt, } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { steps } from "framer-motion";
import { ButtonStep } from "../../components/addlist/first";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios";
import { useRouter } from "next/router";
import environment from "@/params/environment";
import cogoToast from "@hasanm95/cogo-toast";
import { ModalSelectImage } from "@/components/modal/modalSelectImage";
import Image from "next/image";
import { object } from "prop-types";
import {v4 } from 'uuid'
///mudando contexto
//mais m
const schema = yup
  .object({
    title: yup.string().required("Título é obrigatório"),
    description: yup.string().required("Descrição é obrigatória"),
    price: yup.number("preço de ve ser um numero").positive("preço").typeError("Preço obrigatorio. Digite apenas números").required("Preço é obrigatório"),
    address: yup.string().required("Endereço é obrigatório"),
    city: yup.string().required("Cidade é obrigatória"),
    neighborhood: yup.string().required("Bairro é obrigatório"),
    zip: yup.string().required("CEP é obrigatório"),
    bedrooms: yup.string().required("Quantidade de quartos  é obrigatório (Apenas números)"),
    bathrooms:yup.string().required("Quantidade de Banheiros  é obrigatório (Apenas números)"),
    garages:yup.string().required("Quantidade de Garagens  é obrigatório (Apenas números)"),
    garages:yup.string().required("Quantidade de Garagens  é obrigatório (Apenas números)"),
    area:yup.string().required("Tamanho da area  é obrigatório (Apenas números)"),
    amenities:yup.object({
      pool:yup.boolean(),
      porter:yup.boolean(),
      gym:yup.boolean(),
      private_area:yup.boolean(),
      lift:yup.boolean(),
      salon_party:yup.boolean(),
      playground:yup.boolean(),
      sauna:yup.boolean(),
      bike_rack:yup.boolean(),
      coworking:yup.boolean(),
      washing:yup.boolean(),
      handicapped:yup.boolean(),
      backyard:yup.boolean(),
      pet_place:yup.boolean(),
      service_area:yup.boolean(),

      
    })



  }).required();
function AddListingPage() {
  const [messageModal,setMessageModal] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cover,setCover]=useState(null)
  const [previewCover,setPreviewCover] = useState()
  const router = useRouter();
      const  stepName = ["first",'second','third','fourth','five']
    const [stp,setStp] = useState(0)
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [folderName, setFolderName] = useState('');
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {
    if(files.length<=0){
      setMessageModal('Você precisa selecionar pelo menos uma imagem')
      handleShow()
      return
    }
    if(!cover){
      setMessageModal('Você precisa selecionar Uma capa')
      handleShow()
      return
    }
    const formData = new FormData();
    const formCover = new FormData();

    try {
      for (const file of files) {
        formData.append('files', file);
      }
      formCover.append('files', cover);
      const uuidv4 = v4().split('-')[0]
      const slug = data.title.split(" ").join('-')+`-${uuidv4}`
      Object.assign(data,{slug:slug})
      
      const response = await axios.post('/api/createproduct', data);
      
      const {id} = response.data
      formData.append('bucket', `${id}`);
      formCover.append('bucket', `${id}`);

     
      if(files.length>0){
        const responseUploadImages = await axios.post('/api/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      if(files.length>0){

        const responseUploadCover= await axios.post('/api/uploadCover', formCover, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (response.status ==200) {
        router.push(`/sucesso/${slug}`);
      }

    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }

  }
  const handleCoverChange = (e) => {
     setCover(e.target.files[0]);
     const newPreviewCover = URL.createObjectURL(e.target.files[0])
     console.log(cover)
     setPreviewCover(newPreviewCover);
  };
  const handleRemoveCover = (index) => {
    setCover()
    setPreviewCover();
    //fileInputRef.current.value = '';
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    const newPreviewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };
  const handleRemoveImage = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    //fileInputRef.current.value = '';
  };
const [neighborhoods,setNeighBorhood]= useState([])
const [locations,setLocations] = useState([])
async function getLocations(){
  const resultLocations = await axios.get("/api/listLocations")
  setLocations(resultLocations.data)
  setNeighBorhood(resultLocations.data[0].neighborhood)

}
function getNeighBorhood(location){
  console.log(location.neighborhood)
  setNeighBorhood(location.neighborhood)
}
useEffect(()=>{
  getLocations()

},[])
  return (
    <>
      <LayoutOne topbar={true}>
        <ModalSelectImage show={show} handleClose={handleClose} messageModal={messageModal}/>
        <ShopBreadCrumb title="Adicionar Imovel" sectionPace="" currentSlug="Adicionar imóvel" />
        {/* // <!-- APPOINTMENT AREA START --> */}
        
        <div className="ltn__appointment-area pb-120">
          <Container>
            <Row>
              <Col xs={12}>
              
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Tab.Container defaultActiveKey="first">
                    <div className="ltn__tab-menu ltn__tab-menu-3 text-center">
                      <Nav className="nav justify-content-center">
                        <Nav.Link eventKey="first" onClick={()=>setStp(0)}>1. Descrição</Nav.Link>
                        <Nav.Link eventKey="second" onClick={()=>setStp(1)}>2. Midias</Nav.Link>
                        <Nav.Link eventKey="third" onClick={()=>setStp(2)}>3. Localização</Nav.Link>
                        <Nav.Link eventKey="fourth" onClick={()=>setStp(3)}>4. Detalhes</Nav.Link>
                        <Nav.Link eventKey="five" onClick={()=>setStp(4)}>5. Comodidades</Nav.Link>
                      </Nav>
                    </div>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="ltn__apartments-tab-content-inner">
                          <h6>Descrição do Imóvel</h6>

                          <Row>
                            <div className="col-md-12">
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <label>Titulo</label>
                                <input
                                  type="text"
                                  {...register("title")}
                                  placeholder="*Título Do Imóvel (Obrigatório)"
                                  onChange={(e)=> setFolderName(e.target.value)}
                                />
                                {(errors.title && !folderName)  && <p style={{color:"red"}} >{errors.title.message}</p>}
                              </div>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                              <label>Descrição</label>

                                <textarea
                                  {...register("description")}
                                  placeholder="Descrição"
                                ></textarea>
                                {errors.description && <p style={{color:"red"}} >{errors.description.message}</p>}
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
                                {errors.price && <p style={{color:"red"}}>{errors.price.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <h6>Selecione as categorias</h6>
                          <Row>
                            <Col xs={12} md={6} lg={4}>
                              <div className="input-item ltn__custom-icon">
                                <Form.Select className="nice-select" {...register("category")}>
                                  <option value="apartamento">Apartamento</option>
                                  <option value="lote">Lote</option>
                                  <option value="casa">Casa</option>
                                  <option value="sitio">Sítio</option>
                                </Form.Select>

                              </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <div className="input-item ltn__custom-icon">
                                <Form.Select className="nice-select" {...register("status")} >
                                  <option>Na Planta</option>
                                  <option value="Em Construção">Em Construção</option>
                                  <option value="Pronto Para Morar">Pronto Para Morar</option>
                                  <option value="Usado">Usado</option>
                                </Form.Select>
                              </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <div className="input-item ltn__custom-icon">
                                <Form.Select className="nice-select"  {...register("standard")} >
                                  <option value="Minha casa minha vida">Minha casa minha vida</option>
                                  <option value="Médio Padrão">Médio Padrão</option>
                                  <option value="Alto Padrão">Alto Padrão</option>
                                </Form.Select>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="second">
                        <div className="ltn__product-tab-content-inner">
                          <h4>Selecione uma capa</h4>
                          <div style={{position:"relative", width:'220px', height:'150px', margin:'20px'}}>
                          <Image src={previewCover?`${previewCover}`:"/img/no-image/no_image.jpg"} alt={`Preview`}fill/>
                            <button style={{position:"absolute", top:0, right:0}} onClick={() => handleRemoveCover()}>{previewCover && <FaTrash/>}</button>
                          </div>
                          <label style={{  display: "inline-block",
                                  padding:" 6px 12px",
                                  cursor: "pointer",
                                  backgroundColor: "Black",
                                  color: "white",

                                  borderRadius: "4px"}}>
      
                          <input
                          style={{display:"none"}}
                            title="tetst"
                            type="file"
                            id="myFile"
                            name="filename"
                            className="btn theme-btn-3 mb-10"
                            accept="image/*"
                            
                            ref={fileInputRef}
                            // onChange={(e) => {setFiles(Array.from(e.target.files));handleFileChange(e)}}
                            onChange={handleCoverChange}
                          />
                          {previewCover? 'Trocar Capa':"Selecionar Capa"}
                          </label>
      <h4 style={{marginTop:'2rem'}}>Adicione Fotos</h4>
      <div style={{display:"flex", flexWrap:"wrap"}}>
      { previewUrls.length<=0 &&   <div style={{position:"relative", width:'220px', height:'150px', margin:"1rem"}}>
           <Image  src={'/img/no-image/no_image.jpg'} alt={`Preview `}  fill />
           
      </div>}
        {previewUrls.map((url, index) => (
          <div style={{position:"relative", width:'220px', height:'150px', margin:"1rem"}}>
           <Image key={index} src={url} alt={`Preview ${index}`}  fill />
           <button style={{position:"absolute", top:0, right:0}} onClick={() => handleRemoveImage(index)}><FaTrash/></button>
          </div>

        ))}
      </div>      
                          <label style={{  display: "inline-block",
                                  padding:" 6px 12px",
                                  cursor: "pointer",
                                  backgroundColor: "Black",
                                  color: "white",

                                  borderRadius: "4px"}}>
                          <input
                          style={{display:"none"}}
                            title="tetst"
                            type="file"
                            id="myFile"
                            name="filename"
                            className="btn theme-btn-3 mb-10"
                            accept="image/*"
                            multiple
                            ref={fileInputRef}
                            // onChange={(e) => {setFiles(Array.from(e.target.files));handleFileChange(e)}}
                            onChange={handleFileChange}
                          />
                           Selecionar Imagens
                          </label>

                          <br />
                          <p>
                            <small>
                              * Selecione no minímo uma imagem
                            </small>
                            
                          </p>
                          {/* <h6>Video Option</h6>
                          <Row>
                            <Col xs={12} md={6}>
                              <div className="input-item ltn__custom-icon">
                                <Form.Select className="nice-select">
                                  <option>Make A Selection</option>
                                  <option value="1">New York</option>
                                  <option value="2">South Carolina</option>
                                  <option value="3">Los Angeles</option>
                                  <option value="4">Florida</option>
                                  <option value="5">New Jersey</option>
                                </Form.Select>
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
                          <h6>Virtual Tour</h6> */}
                          {/* <div className="input-item input-item-textarea ltn__custom-icon">
                            <textarea
                              name="ltn__message"
                              placeholder="Virtual Tour:"
                            ></textarea>
                            <span className="inline-icon">
                              <FaPencilAlt />
                            </span>
                          </div> */}
                
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div className="ltn__product-tab-content-inner">
                          <h6>Defina a Localização</h6>
                          <Row>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                              <label>Endereço</label>
                                <input
                                {...register("address")}
                                  type="text"
                                  placeholder="*Endereço"
                                />
                                 {errors.address && <p style={{color:"red"}}>{errors.address.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <div className="input-item ltn__custom-icon">
                              <label>Cidade</label>

                                <Form.Select className="nice-select" {...register("city")} >
                                  <option>Cidade</option>
                                  {
                                    locations.map((location)=>(
                                      <option onClick={()=>{getNeighBorhood(location)}} value={location.cityName}>{location.cityName}</option>
                                    ))
                                  }
                                </Form.Select>
                                {errors.city && <p style={{color:"red"}}>{errors.city.message}</p>}
                              </div>
                            </Col>

                            <Col xs={12} md={6} lg={4}>
                              <div className="input-item ltn__custom-icon">
                              <label>Bairro</label>
                                <Form.Select className="nice-select" {...register("neighborhood")} >
                                  <option>Bairro</option>
                                  {
                                    neighborhoods.map((neighborhood)=>(
                                      <option  value={neighborhood}>{neighborhood}</option>
                                    ))
                                  }
                                </Form.Select>
                                {errors.neighborhood && <p style={{color:"red"}}>{errors.neighborhood.message}</p>}
                              </div>
                            </Col>

                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input type="text" {...register("zip")} placeholder="Cep" />
                                {errors.zip && <p style={{color:"red"}}>{errors.zip.message}</p>}
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
                                {errors.mapIframe && <p style={{color:"red"}}>{errors.mapIframe.message}</p>}
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
                          <h6>Lista de Detalhes</h6>
                          <Row>
                          <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input type="text" {...register("area")} placeholder="Área em m²" />
                                {errors.area && <p style={{color:'red'}}>{errors.area.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  {...register("bedrooms")}
                                  placeholder="Quartos"
                                />
                                {errors.bedrooms && <p style={{color:"red"}}>{errors.bedrooms.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input type="text" {...register("bathrooms")} placeholder="Banheiros" />
                                {errors.bathrooms && <p style={{color:"red"}}>{errors.bathrooms.message}</p>}
                                <span className="inline-icon">
                                  <FaPencilAlt />
                                </span>
                              </div>
                            </Col>
                            <Col xs={12} md={6}>
                              <div className="input-item input-item-textarea ltn__custom-icon">
                                <input
                                  type="text"
                                  {...register("garages")}
                                  placeholder="Garagens"
                                />
                                {errors.garages && <p style={{color:"red"}}>{errors.garages.message}</p>}
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
                          <h6>Comodidades e serviços</h6>
                          
                          <Row>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item" >
                                Portaria 24hrs
                                <input type="checkbox" {...register("amenities.porter")}/>
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Academia
                                <input type="checkbox" {...register("amenities.gym")}/>
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Àrea Privativa 
                                <input type="checkbox" {...register("amenities.private_area")} />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Elevador
                                <input type="checkbox" {...register("amenities.lift")} />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          
                          <Row>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item" >
                                Piscina
                                <input type="checkbox"  {...register("amenities.pool")}/>
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Salão de festas
                                <input type="checkbox" {...register("amenities.salon_party")} />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Playground
                                <input type="checkbox" {...register("amenities.playground")}/>
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Sauna
                                <input type="checkbox"{...register("amenities.sauna")} />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Bicicletario
                                <input type="checkbox" {...register("amenities.bike_rack")} />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Coworking
                                <input type="checkbox" {...register("amenities.coworking")} />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Lavanderia
                                <input type="checkbox" {...register("amenities.washing")} />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Acesso para deficientes
                                <input type="checkbox"  {...register("amenities.handicapped")}/>
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Quintal
                                <input type="checkbox" {...register("amenities.backyard")}  />
                                <span className="checkmark"  ></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Pet Place
                                <input type="checkbox" {...register("amenities.pet_place")}  />
                                <span className="checkmark"></span>
                              </label>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <label className="checkbox-item">
                                Àrea de serviço
                                <input type="checkbox" {...register("amenities.service_area")} />
                                <span className="checkmark"></span>
                              </label>
                            </Col>

                          </Row>

                          <div className="alert alert-warning d-none" role="alert">
                            Please note that the date and time you requested may not
                            be available. We will contact you to confirm your actual
                            appointment details.
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                      <ButtonStep  setStp={setStp}stepName={stepName} stp={stp} />
                  </Tab.Container>
                  {
                    stp >=4&&
                <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">Enviar</button>
                }
                </form>

              </Col>
            </Row>
          </Container>
        </div>
        {/* // <!-- APPOINTMENT AREA END --> */}
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

export default AddListingPage;