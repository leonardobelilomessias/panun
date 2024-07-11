import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";
import { useState } from "react";
function AboutUsStyleOne({ sectionSpace }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="XVHBVqKVmzA"
        onClose={() => setOpen(false)}
      />
      <div className={`ltn__about-us-area ${sectionSpace}`}>
        <Container>
          <Row>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-img-wrap about-img-left">
                <img src="/img/others/7.png" alt="About Us Image" />
                <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
                  <div className="ltn__video-img ltn__animation-pulse1">
                    <img src="/img/others/8.png" alt="video popup bg image" />
                    <button
                      onClick={() => setOpen(true)}
                      className="ltn__video-icon-2"
                    >
                      <FaPlay />
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} lg={6} className="align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area mb-20">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                    About Us
                  </h6>
                  <h1 className="section-title">
                    Liderando e Inovando Soluçoes Para o Mercado Imobiliário<span>.</span>
                  </h1>
                  <p>
                    Trabalho com ética e dedicação para oferecer as melhores soluções para o crescente mercado imobiliário. Lideramos inovações e acreditamos que a excelência e fundamental para negociações bem sucedidas. 
                  </p>
                </div>
                <ul className="ltn__list-item-half clearfix">
                  <li>
                    <i className="flaticon-home-2"></i>
                    Atendimento Personalizado
                  </li>
                  <li>
                    <i className="flaticon-mountain"></i>
                    Constante Inovação
                  </li>
                  <li>
                    <i className="flaticon-heart"></i>
                    Relacionamentos de Qualidade
                  </li>
                  <li>
                    <i className="flaticon-secure"></i>
                    Estratégias de Mercado
                  </li>
                </ul>
                <div className="ltn__callout bg-overlay-theme-05  mt-30">
                  <p>
                    A melhor maneira de  prever o futuro <br />
                    é  trabalhar para que ele se torne realidade.
                  </p>
                </div>
                <div className="btn-wrapper animated">
                  <Link
                    href="/shop"
                    className="theme-btn-1 btn btn-effect-1"
                  >
                    Nossos Empreendimentos
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUsStyleOne;
