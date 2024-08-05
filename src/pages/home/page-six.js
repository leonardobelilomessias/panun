
import { useSelector } from "react-redux";
import { getProducts, productSlug, getDiscountPrice } from "@/lib/product";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { LayoutTwo } from "@/layouts";
import Feature from "@/components/features";
import TitleSection from "@/components/titleSection";
import ProductItem from "@/components/product";
import RelatedProduct from "@/components/product/related-product";
import CallToAction from "@/components/callToAction";
import VideoBanner from "@/components/banner/videoBanner";
import aminitiesData from "@/data/aminities/index.json";
import AminitiesItem from "@/components/aminities/item";
import TestimonialCarouselItem from "@/components/testimonialCarousel";
import testimonialData from "@/data/testimonial";
import BlogItem from "@/components/blog";
import blogData from "@/data/blog";
import featuresData from "@/data/service";
import CarDealerSearchFormTwo from "@/components/carDealerSearchForm/indexTwo";
import CarDealerSearchForm from "@/components/carDealerSearchForm";
import RelatedProduct2 from "@/components/product/related-product2";
import environment from "@/params/environment";


function HomePageSix({allproducts,names}) {
    const { products } = useSelector((state) => state.product);
    const featuredProducts = getProducts(products, "buying", "featured", 5);
    const latestListingsProducts = getProducts(products, "buying", "new", 6);
    const featureData = getProducts(featuresData, "buying", "featured", 3);
  
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={
                "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === 0 ? true : false}
            type="button"
        >
            <FaArrowLeft />
        </button>
    );
    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className={
                "slick-next slick-arrow" +
                (currentSlide === slideCount - 1 ? " slick-disabled" : "")
            }
            aria-hidden="true"
            aria-disabled={currentSlide === slideCount - 1 ? true : false}
            type="button"
        >
            <FaArrowRight />
        </button>
    );
    const productCarouselsettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        responsive: [
            {
                breakpoint: 1799,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const testiMonialsettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const blogSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,

        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const { compareItems } = useSelector((state) => state.compare);

    return (
        <>
            <LayoutTwo topbar={true}>
                {/* <!-- SLIDER AREA START (slider-4) --> */}
                <div className="ltn__slider-area ltn__slider-4">
                    <div className="ltn__slide-animation-active">

                        <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-4 bg-image bg-overlay-theme-black-60"
                            style={{
                                backgroundImage: `url("/img/slider/11.jpg")`,
                            }}>
                            <div className="ltn__slide-item-inner text-left">
                                {/* <CarDealerSearchFormTwo /> */}
                            </div>
                                <CarDealerSearchForm navMenuClass="d-none" customClasses="" />
                        </div>
                    </div>
                </div>
                {/* <!-- SLIDER AREA END --> */}




                {/* <!-- PRODUCT SLIDER AREA START --> */}
                <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-70">

                    <Container>
                        <Row>
                            <Col lg={12}>
                                <TitleSection
                                    sectionClasses="text-center"
                                    headingClasses="section-subtitle-2"
                                    titleSectionData={{
                                        subTitle: "Melhores opções",
                                        title: "Destaques da  Semana",
                                    }}
                                />
                            </Col>
                        </Row>


                        <Row>
                            {allproducts.slice(0,6).map((product, key) => {


                                return (
                                    
                                    <Col xs={12} sm={6} xl={4} key={key}>

                                    
                                        <RelatedProduct2
                                        product={product}
                                        />


                                    </Col>
                                );
                            })}

                        </Row>
                    </Container>

                </div>


                {/* <!-- FEATURE AREA START ( Feature - 6) --> */}
                <Feature
                    classes="section-bg-1"
                    servicebtn={true}
                    iconTag={false}
                    data={featureData}
                    headingClasses="section-subtitle-2"
                    titleSectionData={{
                        sectionClasses: "text-center",
                        subTitle: "Nossos Serviços",
                        title: "Especialistas em investimento imobiliário",
                    }}
                />
                {/* PRODUCT SLIDER AREA START */}
                <div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90 plr--7">
                    <Container fluid>
                        <Row>
                            <Col lg={12}>
                                <TitleSection
                                    sectionClasses="text-center"
                                    headingClasses="section-subtitle-2"
                                    titleSectionData={{
                                        subTitle: "Novidade",
                                        title: "Adicionados Recentemente",
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                {!!featuredProducts?.length ? (
                                    <Slider
                                        {...productCarouselsettings}
                                        className="ltn__product-slider-item-four-active-full-width slick-arrow-1"
                                    >
                                        {featuredProducts.map((product, key) => {
                                            const slug = productSlug(product.title);

                                            const discountedPrice = getDiscountPrice(
                                                product.price,
                                                product.discount
                                            ).toFixed(2);
                                            const productPrice = product.price.toFixed(2);
                                            const cartItem = cartItems.find(
                                                (cartItem) => cartItem.id === product.id
                                            );
                                            const wishlistItem = wishlistItems.find(
                                                (wishlistItem) => wishlistItem.id === product.id
                                            );
                                            const compareItem = compareItems.find(
                                                (compareItem) => compareItem.id === product.id
                                            );

                                            return (
                                                <ProductItem
                                                    key={product.id}
                                                    productData={product}
                                                    slug={slug}
                                                    baseUrl="shop"
                                                    discountedPrice={discountedPrice}
                                                    productPrice={productPrice}
                                                    cartItem={cartItem}
                                                    wishlistItem={wishlistItem}
                                                    compareItem={compareItem}
                                                />
                                            );
                                        })}
                                    </Slider>
                                ) : null}
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* PRODUCT SLIDER AREA END */}

                <div className="ltn__apartments-plan-area pb-70">
                    <Container>
                        <Row>
                            <Col>
                                <TitleSection
                                    sectionClasses="text-center"
                                    headingClasses="section-subtitle-2"
                                    titleSectionData={{
                                        subTitle: "Em Construção",
                                        title: "Apartamentos na Planta",
                                        additionalClassName: "",
                                    }}
                                />

                                <Tab.Container defaultActiveKey="first">
                                    <div className="ltn__tab-menu ltn__tab-menu-3 text-center">
                                        <Nav className="nav justify-content-center">
                                            <Nav.Link eventKey="first">Studio</Nav.Link>
                                            <Nav.Link eventKey="second">Deluxe Portion</Nav.Link>
                                            {/* <Nav.Link eventKey="third">Penthouse</Nav.Link> */}
                                        </Nav>
                                    </div>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <div className="ltn__apartments-tab-content-inner">
                                                <Row>
                                                    <Col xs={12} lg={6}>

                                                    <div className="apartments-plan-info section-bg-1">
                                                        <h2>O Estúdio</h2>
                                                        <p>
                                                            Este é um empreendimento imobiliário de estúdio na planta. Enimad minim veniam quis nostrud
                                                            exercitation ullamco laboris. Este empreendimento oferece uma excelente oportunidade de 
                                                            investimento com diversas comodidades e uma localização privilegiada. Aproveite a chance de 
                                                            adquirir um estúdio moderno e bem localizado.
                                                        </p>
                                                        <div className="apartments-info-list apartments-info-list-color mt-40">
                                                            <ul>
                                                            <li>
                                                                <label>Área Total</label>
                                                                <span>260 m²</span>
                                                            </li>
                                                            <li>
                                                                <label>Quarto</label>
                                                                <span>14 m²</span>
                                                            </li>
                                                            <li>
                                                                <label>Banheiro</label>
                                                                <span>4 m²</span>
                                                            </li>
                                                            <li>
                                                                <label>Varanda/Animais</label>
                                                                <span>Permitidos</span>
                                                            </li>
                                                            <li>
                                                                <label>Sala de Estar</label>
                                                                <span>60 m²</span>
                                                            </li>
                                                            </ul>
                                                        </div>
                                                        </div>

                                                    </Col>
                                                    <Col xs={12} lg={6}>
                                                        <div className="apartments-plan-img">
                                                            <img src="/img/others/10.png" alt="#" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <div className="ltn__product-tab-content-inner">
                                                <Row>
                                                    <Col xs={12} lg={6}>
                                                    <div className="apartments-plan-info section-bg-1">
                                                        <h2> Deluxe Portion</h2>
                                                        <p>
                                                            Esta é uma porção deluxe de um empreendimento imobiliário. Enimad minim veniam quis nostrud
                                                            exercitation ullamco laboris. Este empreendimento oferece uma excelente oportunidade de 
                                                            investimento com diversas comodidades e uma localização privilegiada. Aproveite a chance de 
                                                            adquirir uma unidade deluxe moderna e bem localizada.
                                                        </p>
                                                        <div className="apartments-info-list apartments-info-list-color mt-40">
                                                            <ul>
                                                            <li>
                                                                <label>Área Total</label>
                                                                <span>260 m²</span>
                                                            </li>
                                                            <li>
                                                                <label>Quarto</label>
                                                                <span>14 m²</span>
                                                            </li>
                                                            <li>
                                                                <label>Banheiro</label>
                                                                <span>4 m²</span>
                                                            </li>
                                                            <li>
                                                                <label>Varanda/Animais</label>
                                                                <span>Permitidos</span>
                                                            </li>
                                                            <li>
                                                                <label>Sala de Estar</label>
                                                                <span>60 m²</span>
                                                            </li>
                                                            </ul>
                                                        </div>
                                                        </div>

                                                    </Col>
                                                    <Col xs={12} lg={6}>
                                                        <div className="apartments-plan-img">
                                                            <img src="/img/others/10.png" alt="#" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Tab.Pane>
                                        {/* <Tab.Pane eventKey="third">
                                            <div className="ltn__product-tab-content-inner">
                                                <Row>
                                                    <Col xs={12} lg={6}>
                                                        <div className="apartments-plan-info ltn__secondary-bg text-color-white">
                                                            <h2>Penthouse</h2>
                                                            <p>
                                                                Enimad minim veniam quis nostrud exercitation
                                                                ullamco laboris. Lorem ipsum dolor sit amet cons
                                                                aetetur adipisicing elit sedo eiusmod
                                                                tempor.Incididunt labore et dolore magna aliqua.
                                                                sed ayd minim veniam.
                                                            </p>
                                                            <div className="apartments-info-list apartments-info-list-color mt-40">
                                                                <ul>
                                                                    <li>
                                                                        <label>Total Area</label>
                                                                        <span>2800 Sq. Ft</span>
                                                                    </li>
                                                                    <li>
                                                                        <label>Quartos</label>
                                                                        <span>150 Sq. Ft</span>
                                                                    </li>
                                                                    <li>
                                                                        <label>Banheiros</label>
                                                                        <span>45 Sq. Ft</span>
                                                                    </li>
                                                                    <li>
                                                                        <label>Belcony/Pets</label>
                                                                        <span>Allowed</span>
                                                                    </li>
                                                                    <li>
                                                                        <label>Lounge</label>
                                                                        <span>650 Sq. Ft</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} lg={6}>
                                                        <div className="apartments-plan-img">
                                                            <img src="/img/others/10.png" alt="#" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Tab.Pane> */}
                                    </Tab.Content>
                                </Tab.Container>
                            </Col>
                        </Row>
                    </Container>
                </div>


                {/* <!-- VIDEO AREA START --> */}
                <div className="ltn__video-popup-area">
                    <VideoBanner />
                </div>
                {/* <!-- VIDEO AREA END --> */}
                {/* <!-- CATEGORY AREA START -->  */}
                <div className="ltn__category-area ltn__product-gutter pt-115 pb-90">
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <TitleSection
                                    sectionClasses="text-center"
                                    headingClasses="section-subtitle-2"
                                    titleSectionData={{
                                        subTitle: "Sempre perto",
                                        title: "As Melhores Comodidades.",
                                        additionalClassName: "",
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="slick-arrow-1 justify-content-center">
                            {aminitiesData.map((data, key) => {
                                return (
                                    <Col key={key} xs={12} sm={6} md={4} lg={3}>
                                        <AminitiesItem data={data} />
                                    </Col>
                                );
                            })}
                        </Row>
                    </Container>
                </div>
                {/* <!-- CATEGORY AREA END --> */}

                {/* <!-- TESTIMONIAL AREA START (testimonial-7) -->  */}
                <div
                    className="ltn__testimonial-area bg-image-top pt-115 pb-70"
                    style={{ backgroundImage: `url("../img/bg/20.jpg")` }}
                >
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <TitleSection
                                    sectionClasses="text-center"
                                    headingClasses="section-subtitle-2"
                                    titleSectionData={{
                                        subTitle: "Depoimentos",
                                        title: "Feedback de Clientes ",
                                    }}
                                />
                            </Col>
                        </Row>

                        <Slider
                            {...testiMonialsettings}
                            className="ltn__testimonial-slider-5-active slick-arrow-1"
                        >
                            {testimonialData.map((data, key) => {
                                return <TestimonialCarouselItem key={key} data={data} />;
                            })}
                        </Slider>
                    </Container>
                </div>
                {/* <!-- TESTIMONIAL AREA END --> */}

                {/* <!-- BLOG AREA START (blog-3) -->  */}
                <div className="ltn__blog-area pb-70">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <TitleSection
                                    sectionClasses="text-center"
                                    headingClasses="section-subtitle-2"
                                    titleSectionData={{
                                        subTitle: "Noticia e Blog",
                                        title: "Últimas Informações",
                                    }}
                                />
                            </Col>
                        </Row>
                        <Slider
                            {...blogSettings}
                            className="ltn__blog-slider-one-active slick-arrow-1 ltn__blog-item-3-normal"
                        >
                            {blogData.map((data, key) => {
                                const slug = productSlug(data.title);
                                return (
                                    <BlogItem key={key} baseUrl="/blog" data={data} slug={slug} />
                                );
                            })}
                        </Slider>
                    </Container>
                </div>
                {/* <!-- BLOG AREA END --> */}

                <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <CallToAction />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </LayoutTwo>
        </>
    );
}


export default HomePageSix;

export async function getStaticProps() {
    try {
      // Fazendo a requisição para a API para obter a lista de produtos
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listproducts`);
      const allproducts = res.data;
    const names ={tilio:"joune"}
    console.log(june)
      // Retornar os dados dos produtos como props
      return {
        props: { allproducts},
      };
    } catch (error) {
      // Lidar com erros na requisição
      console.error(error);
      return {
        props: { products: [] },
      };
    }
  }