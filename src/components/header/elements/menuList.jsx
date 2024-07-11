import Link from "next/link";
import { FaPlus, FaAngleDoubleRight } from "react-icons/fa";
const MenuList = ({ addListing }) => {
  return (
    <ul>
      <li className="menu-icon">
        <Link href="/">
          Inicio <FaPlus />
        </Link>
      </li>
      <li className="menu-icon">
        <Link href="/about">
          Sobre Nós <FaPlus />
        </Link>
      </li>
      <li className="menu-icon">
        <Link href="/shop">
          Lançamentos <FaPlus />
        </Link>
      </li>
      <li className="menu-icon">
        <Link href="/shop">
          Destaques <FaPlus />
        </Link>
      </li>

      <li>
        <Link href="/contact">Contato</Link>
      </li>

      {addListing ? (
        <li className="special-link">
          <Link href="/add-listing">Chamar no Whatsapp</Link>
        </li>
      ) : null}
    </ul>
  );
};

export default MenuList;
