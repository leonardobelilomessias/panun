import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cart-slice";
import { useState } from "react";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/store/slices/wishlist-slice";
import QuickViewtModal from "@/components/modals/quickViewModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Image from "next/image";
import { formatPriceToBRL } from "@/lib/formatPriceBlr";
const RelatedProduct2 = ({product}) => {
  let badgeText = "";

  if (product.status) {
    badgeText = "Financiamento facilitado";
  } else {
    badgeText = "Venda";
  }
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const wishListTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Wishlist
    </Tooltip>
  );
  const quickViewTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Quick View
    </Tooltip>
  );
  const addToCartTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add To Cart
    </Tooltip>
  );
  return (
    <>
      <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5">
        <div className="product-img">
          <Link href={`/imovel/${product.slug}`}>
            <Image
              width={500}
              height={300}              src={product?.cover?product.cover:`/img/no-image/no_image.jpg`}
              alt={`${product.title}`}
            />
          </Link>
          <div className="real-estate-agent">
            <div className="agent-img">
            </div>
          </div>
        </div>
        <div className="product-info">
          <div className="product-badge">
            <ul>
              <li
                className={`sale-badge ${product.status ? "bg-black" : ""}`}
              >
                {product.status}
              </li>
            </ul>
          </div>
          <h2 className="product-title">
            <Link href={`/imovel/${product.slug}`}>{product.title}</Link>
          </h2>
          <div className="product-img-location">
            <ul>
              <li>
                <Link href={`/imovel/${product.slug}`}>
                  <i className="flaticon-pin"></i>
                  {product.city}
                </Link>
              </li>
            </ul>
          </div>
          <ul className="ltn__plot-brief">
            <li>
              <span>{product.bedrooms}</span>
              <span className="ms-1">Quartos</span>
            </li>
            <li>
              <span>{product.bathrooms}</span>
              <span className="ms-1">Banheiros</span>
            </li>
            <li>
              <span>{product.area}</span>
              <span className="ms-1">metros&#178;</span>
            </li>
          </ul>
          {/* <div className="product-hover-action">
            <ul>
              <li>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={quickViewTooltip}
                >
                  <button onClick={() => setModalShow(true)}>
                    <i className="flaticon-expand"></i>
                  </button>
                </OverlayTrigger>
              </li>


            </ul>
          </div> */}
        </div>
        <div className="product-info-bottom">
          <div className="product-price">
            <span>
              {formatPriceToBRL(product.price)}
              {/* <label>/Month</label> */}
            </span>
          </div>
        </div>
      </div>

      <QuickViewtModal
        productData={product}
        show={modalShow}
        onHide={() => setModalShow(false)}
        slug={product.slug}
        discountedprice={product.price}
        productprice={product.price}
        wishlistitem={product}
        compareitem={product}
      />
    </>
  );
};

export default RelatedProduct2;
