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
const RelatedProduct = ({
  productData,
  slug,
  baseUrl,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  compareItem,
}) => {
  let badgeText = "";

  if (productData.rent) {
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
          <Link href={`/${baseUrl}/${slug}`}>
            <img
              src={`/img/product-3/${productData.productImg}`}
              alt={`${productData.title}`}
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
                className={`sale-badge ${productData.rent ? "bg-black" : ""}`}
              >
                {badgeText}
              </li>
            </ul>
          </div>
          <h2 className="product-title">
            <Link href={`/${baseUrl}/${slug}`}>{productData.title}</Link>
          </h2>
          <div className="product-img-location">
            <ul>
              <li>
                <Link href={`/${baseUrl}/${slug}`}>
                  <i className="flaticon-pin"></i>
                  {productData.locantion}
                </Link>
              </li>
            </ul>
          </div>
          <ul className="ltn__plot-brief">
            <li>
              <span>{productData.propertyDetails.bedrooms}</span>
              <span className="ms-1">Quartos</span>
            </li>
            <li>
              <span>{productData.propertyDetails.baths}</span>
              <span className="ms-1">Banheiros</span>
            </li>
            <li>
              <span>{productData.propertyDetails.area}</span>
              <span className="ms-1">metros&#178;</span>
            </li>
          </ul>

        </div>
        <div className="product-info-bottom">
          <div className="product-price">
            <span>
              {`R$ ${productData.price}`}
              {/* <label>/Month</label> */}
            </span>
          </div>
        </div>
      </div>


    </>
  );
};

export default RelatedProduct;
