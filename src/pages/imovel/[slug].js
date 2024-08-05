import { useState } from "react";
import ModalVideo from "react-modal-video";
import Link from "next/link";
import Slider from "react-slick";
import {
  FaArrowRight,
  FaArrowLeft,
  FaPlay,
  FaStar,
  FaStarHalfAlt,
  FaSearch,
  FaRegStar,
  FaDribbble,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaUserAlt,
  FaEnvelope,
  FaGlobe,
  FaPencilAlt,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import BreadCrumb from "@/components/breadCrumbs";

import { LayoutOne, LayoutTwo } from "@/layouts";
import { useSelector } from "react-redux";
import { getProducts, productSlug, getDiscountPrice } from "@/lib/product";
// import products from "./products.json";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import RelatedProduct from "@/components/product/related-product";
import FollowUs from "@/components/followUs";
import Tags from "@/components/tags";
import blogData from "@/data/blog";
import CallToAction from "@/components/callToAction";
import axios from "axios";
import { PhotosGalery } from "../../components/imovel/photosgalery";
import { captalize } from "../../components/imovel/captalize";
import { Amenities } from "../../components/imovel/amenities";
import { formatPriceToBRL } from "@/lib/formatPriceBlr";
import environment from "@/params/environment";

function ProductDetails({ product,images }) {
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const latestdBlogs = getProducts(blogData, "buying", "featured", 4);
console.log(product)
  const relatedProducts = getProducts(
    products,
    product.category[0],
    "popular",
    2
  );

  const topRatedProducts = getProducts(
    products,
    product.category[0],
    "topRated",
    2
  );
  const popularProducts = getProducts(
    products,
    product.category[0],
    "popular",
    4
  );

  const discountedPrice = getDiscountPrice(
    product.price,
    product.discount
  ).toFixed(2);

  const productPrice = product.price.toFixed(2);
  const cartItem = cartItems.find((cartItem) => cartItem.id === product.id);
  const wishlistItem = wishlistItems.find(
    (wishlistItem) => wishlistItem.id === product.id
  );
  const compareItem = compareItems.find(
    (compareItem) => compareItem.id === product.id
  );


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
  const productDetailsCarouselSettings = {
    centerMode: true,
    infinite: true,
    centerPadding: "450px",
    slidesToShow: 1,
    dots: true,
    speed: 500,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "250px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "250px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "150px",
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
          dots: true,
        },
      },
    ],
  };

  const popular_product = {
    infinite: true,
    slidesToShow: 1,
    dots: true,
    speed: 500,
    arrows: false,
  };

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <LayoutOne topbar={true}>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="XVHBVqKVmzA"
          onClose={() => setOpen(false)}
        />
        {/* <!-- BREADCRUMB AREA START --> */}

        <BreadCrumb
          title="Detalhes"
          sectionPace="mb-0"
          currentSlug={product.title}
        />

        {/* <!-- BREADCRUMB AREA END --> */}

        {/* <!-- IMAGE SLIDER AREA START (img-slider-3) --> */}
        <div className="ltn__img-slider-area mb-90">
          <Container fluid className="px-0">
            <Slider
              {...productDetailsCarouselSettings}
              className="ltn__image-slider-5-active slick-arrow-1 slick-arrow-1-inner"
            >
              {images.urls.map((single, key) => {
                return (
                  <div className="ltn__img-slide-item-4" key={key}>
                    <Link href="#">
                      <img
                        src={`${single}`}
                        alt={`${single}`}
                      />
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </Container>
        </div>
        {/* <!-- IMAGE SLIDER AREA END -->

    <!-- SHOP DETAILS AREA START --> */}
        <div className="ltn__shop-details-area pb-10">
          <Container>
            <Row>
           
              <Col xs={12} lg={8}>
                <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                  <div className="ltn__blog-meta">
                    <ul>
                      {
                          <li className="ltn__blog-category">
                          <Link href="#">Lançamento</Link>
                        </li>
                      }

                      <li className="ltn__blog-date">
                        <i className="far fa-calendar-alt"></i>
                        {product.date}
                      </li>
                    </ul>
                  </div>
                  <h1> {captalize(product.title)}</h1>
                  <label>
                    <span className="ltn__secondary-color">
                      <i className="flaticon-pin"></i>
                    </span>{" "}
                    {captalize(product.neighborhood)} - {captalize(product.city)}
                  </label>
                  <h4 className="title-2"> Descrição</h4>
                  <p>{product.description} </p>


                  <h4 className="title-2">Detalhes do Imóvel</h4>
                  <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                    <ul>
                      <li>
                        <label>id do produto:</label>{" "}
                        <span>{product.id}</span>
                      </li>
                      <li>
                        <label>Area total: </label>{" "}
                        <span>{product.area} m2</span>
                      </li>

                      <li>
                        <label>cep:</label>{" "}
                        <span>{product.zip}</span>
                      </li>

                      <li>
                        <label>Endereço:</label>{" "}
                        <span>{product.address}</span>
                      </li>
                    </ul>
                    <ul>
  
                      <li>
                        <label>Preço:</label> <span>
                          
                          {formatPriceToBRL(product.price)}
                          </span>
                      </li>
                      <li>
                        <label>Status:</label>{" "}
                        <span>{product.status}</span>
                      </li>
                      <li>
                        <label>Padrão:</label>{" "}
                        <span>{product.standard}</span>
                      </li>
                      <li>
                        <label>Tipo:</label>{" "}
                        <span>{product.category}</span>
                      </li>
                    </ul>
                  </div>

                  <h4 className="title-2">Mais detalhes</h4>
                  <div className="property-detail-feature-list clearfix mb-45">
                    <ul>

                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-garage"></i>
                          <div>
                            <h6> {product.garages} Garage{`${product.garages>1?"ns":'m'}`}</h6>
                            
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-double-bed"></i>
                          <div>
                            <h6>{product.bedrooms} Quarto{`${product.bedrooms>1?"s":''}`}</h6>
                      
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="property-detail-feature-list-item">
                          <i className="flaticon-bathtub"></i>
                          <div>
                            <h6>{product.bathrooms} Banheiro{`${product.bathrooms>1?"s":''}`}</h6>
                           
                          </div>
                        </div>
                      </li>

                     
                    </ul>
                  </div>
{/* 
                <PhotosGalery product={product}/> */}

                <Amenities amenities={product.amenities}/>

                  <h4 className="title-2">Localização</h4>
                  <div className="property-details-google-map mb-60">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120048.59789740962!2d-44.04645099167165!3d-19.902535918464174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690cacacf2c33%3A0x5b35795e3ad23997!2sBelo%20Horizonte%2C%20MG!5e0!3m2!1spt-BR!2sbr!4v1722271027854!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allowFullScreen=""
                    ></iframe>
                  </div>

                  {/* <!-- Apartamentos na Planta AREA START --> */}


                  {/* <!-- Apartamentos na Planta AREA END --> */}



                </div>
              </Col>

              <Col xs={12} lg={4}>
                <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
                  {/* <!-- Author Widget --> */}
                  {/* <div className="widget ltn__author-widget">
                    <div className="ltn__author-widget-inner text-center">
                      <img
                        src={`/img/team/${product.agent.img}`}
                        alt={`${product.agent.fullName}`}
                      />
                      <h5>{product.agent.fullName}</h5>
                      <small>{product.agent.designation}</small>
                      <div className="product-ratting">
                        <ul>
                          <li>
                            <a href="#">
                              <FaStar />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FaStar />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FaStar />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FaStar />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FaRegStar />
                            </a>
                          </li>
                          <li className="review-total">
                            {" "}
                            <Link href="#">
                              {" "}
                              ( {product.agent.raiting} Reviews )
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <p>{product.agent.description}</p>

                      <div className="ltn__social-media">
                        <ul>
                          <li>
                            <a href="#" title="Facebook">
                              <FaFacebookF />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="Twitter">
                              <FaTwitter />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="Linkedin">
                              <FaInstagram />
                            </a>
                          </li>

                          <li>
                            <a href="#" title="Youtube">
                              <FaDribbble />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Search Widget --> */}
                  {/* <div className="widget ltn__search-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Fazer Busca
                    </h4>
                    <form action="#">
                      <input
                        type="text"
                        name="search"
                        placeholder="Faça uma busca..."
                      />
                      <button type="submit">
                        <FaSearch />
                      </button>
                    </form>
                  </div> */}
                  {/* <!-- Form Widget --> */}
                  <div className="widget ltn__form-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Deixe uma menssagem
                    </h4>
                    <form action="#">
                      <input
                        type="text"
                        name="yourname"
                        placeholder="Your Name*"
                      />
                      <input
                        type="text"
                        name="youremail"
                        placeholder="Your e-Mail*"
                      />
                      <textarea
                        name="yourmessage"
                        placeholder="Write Message..."
                      ></textarea>
                      <button type="submit" className="btn theme-btn-1">
                        Enviar Menssagem
                      </button>
                    </form>
                  </div>
                  {/* <!-- Maior Avaliação Widget --> */}
                  {/* <div className="widget ltn__top-rated-product-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Maior Avaliação
                    </h4>
                    <ul>
                      {topRatedProducts.map((product, keys) => {
                        const slug = productSlug(product.title);
                        let key = keys + 1;
                        return (
                          <li key={product.id}>
                            <div className="top-rated-product-item clearfix">
                              <div className="top-rated-product-img">
                                <a href={`/shop/${slug}`}>
                                  <img
                                    src={`/img/product/${key}.png`}
                                    alt={product.title}
                                  />
                                </a>
                              </div>
                              <div className="top-rated-product-info">
                                <div className="product-ratting">
                                  <ul>
                                    <li>
                                      <a href="#">
                                        <FaStar />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <FaStar />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <FaStar />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <FaStar />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <FaStar />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <h6>
                                  <a href={`/shop/${slug}`}>{product.title}</a>
                                </h6>
                                <div className="product-price">
                                  <span>${product.price}</span>
                                  <del>${discountedPrice}</del>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div> */}
                  {/* <!-- Menu Widget (Category) --> */}
                  {/* <div className="widget ltn__menu-widget ltn__menu-widget-2--- ltn__menu-widget-2-color-2---">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Melhores Categorias
                    </h4>
                    <ul>
                      <li>
                        <Link href="#">
                          Apartments <span>(26)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Picture Stodio <span>(30)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Office <span>(71)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Luxary Vilas <span>(56)</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          Duplex House <span>(60)</span>
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                  {/* <!-- Popular Product Widget --> */}
                  <div className="widget ltn__popular-product-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Mais Acessados
                    </h4>

                    <Slider
                      {...popular_product}
                      className="row ltn__popular-product-widget-active slick-arrow-1"
                    >
                      {/* <!-- ltn__product-item --> */}

                      {popularProducts.map((product, key) => {
                        const slug = productSlug(product.title);
                        return (
                          <div
                            key={key}
                            className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---"
                          >
                            <div className="product-img">
                              <Link href={`/shop/${slug}`}>
                                <img
                                  src={`/img/product-3/${product.productImg}`}
                                  alt={slug}
                                />
                              </Link>
                              <div className="real-estate-agent">
                                <div className="agent-img">
                                  <Link href="#">
                                    <img src={`/img/blog/author.jpg`} alt="#" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="product-info">
                              <div className="product-price">
                                <span>
                                  ${product.price}
                                  {/* <label>/Month</label> */}
                                </span>
                              </div>
                              <h2 className="product-title">
                                <Link href={`/shop/${slug}`}>
                                  {product.title}
                                </Link>
                              </h2>
                              <div className="product-img-location">
                                <ul>
                                  <li>
                                    <Link href="product-details">
                                      <i className="flaticon-pin"></i>
                                      {product.locantion}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                <li>
                                  <span>
                                    {product.bedrooms}
                                  </span>
                                  <span className="ms-1">Quartos</span>
                                </li>
                                <li>
                                  <span>{product.bathsrooms}</span>
                                  <span className="ms-1">Banheiros</span>
                                </li>
                                <li>
                                  <span>{product.area}</span>
                                  <span className="ms-1">metros&#178;</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                  {/* <!-- Popular Post Widget --> */}
                  <div className="widget ltn__popular-post-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Post Blog
                    </h4>
                    <ul>
                      {latestdBlogs.map((blog, key) => {
                        const slug = productSlug(blog.title);
                        let imagecount = key + 1;

                        return (
                          <li key={key}>
                            <div className="popular-post-widget-item clearfix">
                              <div className="popular-post-widget-img">
                                <Link href={`/blog/${slug}`}>
                                  <img
                                    src={`/img/team/${imagecount}.jpg`}
                                    alt="#"
                                  />
                                </Link>
                              </div>
                              <div className="popular-post-widget-brief">
                                <h6>
                                  <Link href={`/blog/${slug}`}>
                                    {blog.title}
                                  </Link>
                                </h6>
                                <div className="ltn__blog-meta">
                                  <ul>
                                    <li className="ltn__blog-date">
                                      <Link href={`/blog/${slug}`}>
                                        <span>
                                          <FaCalendarAlt />
                                        </span>
                                        <span>{blog.date}</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <FollowUs title="Siga-nos" />

                  {/* <!-- Tagcloud Widget --> */}

                  {/* <Tags title="Popular Tags" /> */}
                </aside>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- SHOP DETAILS AREA END -->

    <!-- CALL TO ACTION START (call-to-action-6) --> */}
        <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
          <Container>
            <Row>
              <Col xs={12}>
                <CallToAction />
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- CALL TO ACTION END --> */}
      </LayoutOne>

    </>
  );
}

export default ProductDetails;

export async function getStaticProps({ params }) {
  // get product data based on slug
  // const data2 =await  axios.get(`${process.env.BASE_URL_DEV}/api/listproducts`)
  // const products = data2.data
  // let  product = products.filter(
  //   (single) => productSlug(single.title) === params.slug
  // )[0];
  console.log("Slug=>",params.slug)
  console.log("Slug=>",`/listfakeproduct`)
  // const productsteste =await  axios.get(`${process.env.BASE_URL_DEV}/api/listproducts`)
  const data =await  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listproductByslug?slug=${params.slug.trim()}`)
  let product = data.data
  //console.log("oi",product.id)

  const dataImages = await  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listimage?id=${product.id.trim()}`)
  const images = dataImages.data
  console.log(images)
  return { props: { product, images } };
}

export async function getStaticPaths() {
  // get the paths we want to pre render based on products
  const data =await  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listproducts`)
  const products = data.data
 
  const paths = products.map((product) => ({
    params: { slug: product.slug.trim() },
  }));

  return { paths, fallback: false };
}
