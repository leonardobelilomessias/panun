import path from "path";
import fs from "fs/promises";
import { useSelector } from "react-redux";
import { getProducts, productSlug, getDiscountPrice } from "@/lib/product";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { LayoutOne } from "@/layouts";
import HeroSectionStyleOne from "@/components/hero/styleOne";
import CarDealerSearchForm from "@/components/carDealerSearchForm";
import AboutUsStyleOne from "@/components/aboutUs/aboutUsStyleOne";
import AboutUsStyleTwo from "@/components/aboutUs/aboutUsStyleTwo";
import CounterUp from "@/components/counterUp";
import Feature from "@/components/features";
import TitleSection from "@/components/titleSection";
import ProductItem from "@/components/product";
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
import HeroSectionStyleSix from "@/components/hero/styleSix";
import HomePageSix from "./home/page-six";
import axios from "axios";
import environment from "@/params/environment";

function HomePage({allproducts, names}) {

  return (
    <>
     <HomePageSix allproducts={allproducts}/>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "src/data/hero/", "index.json");
  const Herodata = JSON.parse(await fs.readFile(filePath));
  try {
    // Fazendo a requisição para a API para obter a lista de produtos
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listproducts`);
    const allproducts = res.data;
  const names ={tilio:"joune"}
  console.log(names)
    // Retornar os dados dos produtos como props
    return {
      props: { allproducts, Herodata,names},
    };
  } catch (error) {
    // Lidar com erros na requisição
    console.error(error);
    return {
      props: { products: [] },
    };
  }

}

export default HomePage;
