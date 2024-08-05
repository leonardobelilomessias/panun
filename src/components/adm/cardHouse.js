import environment from "@/params/environment";
import Link from "next/link";
import { FaRegStar, FaRegStarHalf, FaStar, FaTrashAlt } from "react-icons/fa";
import { ModalDelete } from "../modal/modalDelete";
import { useState } from "react";
import axios from "axios";

export function CardHouse({house, setHouses,getHouses}){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
function deleteHouse(){
  console.log(house.id)
  axios.delete(`${environment('dev')}/api/deleteproduct?id=${house.id}`)
  getHouses()
  handleClose()
 // setHouses([])
}

    return(
        <tr>
        <td className="ltn__my-properties-img">
          <Link href="https://quarter-nextjs.netlify.app/shop/new-apartment-nice-view">
            <img
              src="/img/product-3/2.jpg"
              alt="#"
            />
          </Link>
        </td>
        <td>
          <div className="ltn__my-properties-info">
            <h6 className="mb-10">
              <Link href="https://quarter-nextjs.netlify.app/shop/new-apartment-nice-view">
                {house.title}
              </Link>
            </h6>
            <small>
              <i className="icon-placeholder"></i>
              Minas Gerais -  Brasil 
            </small>
            <div className="product-ratting">
              <ul>
                <li>
                  <Link href="#">
                    <span>
                      <FaStar />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span>
                      <FaStar />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span>
                      <FaStar />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span>
                      <FaRegStarHalf />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span>
                      <FaRegStar />
                    </span>
                  </Link>
                </li>
                <li className="review-total">
                  <Link href="#"> ( 95 Reviews )</Link>
                </li>
              </ul>
            </div>
          </div>
        </td>
        <td>Feb 22, 2023</td>
        <td>
          <Link href={`${environment()}/edit/${house.slug}`}>Edit</Link>
        </td>
        <td>
          <div style={{backgroundColor:"red"}} onClick={()=>{handleShow()}}>
            <span>
              <FaTrashAlt />
            </span>
          </div>
        </td>
        <ModalDelete deleteHouse={deleteHouse} handleClose={handleClose} show={show} item={house}/>
      </tr>
    )
}