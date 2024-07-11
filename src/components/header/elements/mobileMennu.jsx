import Link from "next/link";
import {
  FaRegUser,
  FaRegHeart,
  FaShoppingCart,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaSearch,
} from "react-icons/fa";

import {
  getSiblings,
  getClosest,
  slideUp,
  slideDown,
  slideToggle,
} from "@/lib/product";
import { useSelector } from "react-redux";

const MobileMenu = function ({ offCanVastoggleBtn, closeSideBar }) {
  const { cartItems } = useSelector((state) => state.cart);

  const onClickHandler = (e) => {
    const target = e.currentTarget;
    const parentEl = target.parentElement;
    parentEl.classList.toggle("active");
    if (
      parentEl?.classList.contains("menu-expand") ||
      target.classList.contains("menu-expand")
    ) {
      const element = target.classList.contains("icon") ? parentEl : target;
      const parent = getClosest(element, "li");
      const childNodes = parent.childNodes;
      const parentSiblings = getSiblings(parent);
      parentSiblings.forEach((sibling) => {
        sibling.classList.remove("active");
        const sibChildNodes = sibling.childNodes;
        sibChildNodes.forEach((child) => {
          if (child.nodeName === "UL") {
            slideUp(child, 1000);
          }
        });
      });
      childNodes.forEach((child) => {
        if (child.nodeName === "UL") {
          slideToggle(child, 1000);
        }
      });
    }
  };

  return (
    <>
      <div
        id="ltn__utilize-mobile-menu"
        className={`ltn__utilize ltn__utilize-mobile-menu   ${
          offCanVastoggleBtn ? "ltn__utilize-open" : ""
        }`}
      >
        <div className="ltn__utilize-menu-inner ltn__scrollbar">
          <div className="ltn__utilize-menu-head">
            <div className="site-logo">
              <Link href="/">
                <img src="/img/logo.png" alt="Logo" />
              </Link>
            </div>
            <button onClick={closeSideBar} className="ltn__utilize-close">
              ×
            </button>
          </div>
          <div className="ltn__utilize-menu-search-form">
            <form action="#">
              <input type="text" placeholder="Search..." />
              <button>
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="ltn__utilize-menu">
            <ul>
              <li>
                <Link href="/">Inicio</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
              </li>
              <li>
                <Link href="/shop">Imóveis</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
              </li>
             
              <li>
                <Link href="/shop/list">Lançamentos</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
              </li>
              <li>
                <Link href="/shop/grid">Destaques</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
              </li>
              <li>
                <Link href="#">Sobre Nós</Link>
                <span
                  className="menu-expand"
                  onClick={onClickHandler}
                  aria-hidden="true"
                ></span>
              </li>
              <li>
                <Link href="/contact">Contato</Link>
              </li>
            </ul>
          </div>
          <div className="ltn__utilize-buttons ltn__utilize-buttons-2">
          </div>
          <div className="ltn__social-media-2">
            <ul>
              <li>
                <Link href="#">
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaLinkedin />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FaInstagram />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
