import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ShopBreadCrumb from "@/components/breadCrumbs/shop";
import { getSortedProducts, productSlug,getDiscountPrice } from "@/lib/product";
import { LayoutOne } from "@/layouts";
import {
  FaThLarge,
  FaThList,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import RelatedProduct from "@/components/product/related-product";
import ProductList from "@/components/product/list";
import Search from "@/components/search";
import ReactPaginate from "react-paginate";
import CallToAction from "@/components/callToAction";
import RelatedProduct2 from "@/components/product/related-product2";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "@/components/common/Loading";

function ShopGrid() {
  const router = useRouter()
  const queryParams = router.asPath.split('?').slice(1,router.asPath.length)
  
  function getParamsSearch(){
    const meuobjeto ={}
    queryParams.forEach((item)=>{
      const moldeItem = item.split("=")
      if(moldeItem[0]==='cidade') meuobjeto.city = moldeItem[1]
      if(moldeItem[0]==='bairro') meuobjeto.bairro = moldeItem[1]
      if(moldeItem[0]==='tipo') meuobjeto.tipo = moldeItem[1]
    })
    return meuobjeto
  }


  const { products } = useSelector((state) => state.product);
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [sortedProducts, setSortedProducts] = useState([]);
  const pageLimit = 6;
  const [currentItems, setCurrentItems] = useState(products);
  const [pageCount, setPageCount] = useState(0);

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };


  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  const [query, setQuery] = useState("");
  const keys = ["title"];
  const SearchProduct = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
   
  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);

    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );

    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);

    setCurrentItems(sortedProducts.slice(offset, offset + pageLimit));

    setCurrentItems(
      SearchProduct(sortedProducts.slice(offset, offset + pageLimit))
    );
  }, [
    offset,
    products,
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    query,
  ]);

  useEffect(() => {
    const endOffset = offset + pageLimit;
    setCurrentItems(products.slice(offset, endOffset));
    setPageCount(Math.ceil(products.length / pageLimit));
  }, [offset, pageLimit]);

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * pageLimit) % products.length;
  //   setOffset(newOffset);
  // };
  const [houses,setHouses] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  async function  getHouses(){
    const resp= await axios.get(`/api/listProductsPagination`)
    console.log(resp.data)
    setHouses(resp.data.products)

  }
  const searchItem= getParamsSearch()
  console.log('meus items',searchItem)
  useEffect(()=>{
    //getHouses() 
    fetchProducts(currentPage + 1);
  },[currentPage])
  const fetchProducts = async (page) => {

    setLoading(true);
    try {
        const response = await axios.get(`/api/listProductsPaginationWithValues`, {
            params: {
                page,
                pageSize,
                city:searchItem.city,
                neighBorhood:searchItem.bairro,
                type:searchItem.tipo

            }
        });
        setHouses(response.data.products);
        setTotalPages(response.data.totalPages);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    setLoading(false);
};
const handlePageClick = ({ selected }) => {
  setCurrentPage(selected);
};
  return (
    <LayoutOne topbar={true}>
      {/* <!-- BREADCRUMB AREA START --> */}

      <ShopBreadCrumb
        title="Destaques"
        sectionPace=""
        currentSlug="Destaques"
      />
      {/* <!-- BREADCRUMB AREA END -->
    
    <!-- PRODUCT DETAILS AREA START --> */}

      <div className="ltn__product-area ltn__product-gutter mb-120">
        <Container>
          <Row>
            <Col xs={12}>
              <Tab.Container defaultActiveKey="first">
                <div className="ltn__shop-options">
                  <ul>
                    <li>
                      <div className="ltn__grid-list-tab-menu">
                        <Nav className="nav">
                          <Nav.Link eventKey="first">
                            <FaThLarge />
                          </Nav.Link>
                          <Nav.Link eventKey="second">
                            <FaThList />
                          </Nav.Link>
                        </Nav>
                      </div>
                    </li>

                    <li>
                      <div className="short-by text-center">
                        <Form.Select
                          className="form-control nice-select"
                          onChange={(e) =>
                            getFilterSortParams("filterSort", e.target.value)
                          }
                        >
                          <option value="default">Padrão</option>
                          <option value="priceHighToLow">
                            Preço - Mais alto 
                          </option>
                          <option value="priceLowToHigh">
                            Price - Mais Baixo
                          </option>
                        </Form.Select>
                      </div>
                    </li>
                    <li>
                      <div className="showing-product-number text-right">
                        <span>
                          {`Mostrando ${currentPage +1} of ${
                            totalPages
                          } resultados`}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* <Search spaceBottom="mb-30" setQuery={setQuery} /> */}
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                 {loading&& <Loading/>}
                      <Row>
                        {houses.map((product, key) => {
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
                            <Col key={key} xs={12} sm={6} lg={4}>
                                <RelatedProduct2
                                        product={product}
                                        />
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <div className="ltn__product-tab-content-inner ltn__product-list-view">
                      <Row>
                        {currentItems.map((product, key) => {
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
                            <Col key={key} xs={12}>
                              <ProductList
                                slug={slug}
                                baseUrl="shop/grid"
                                productData={product}
                                discountedPrice={discountedPrice}
                                productPrice={productPrice}
                                cartItem={cartItem}
                                wishlistItem={wishlistItem}
                                compareItem={compareItem}
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
             
              <div className="ltn__pagination-area text-center">
                <ReactPaginate
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  pageCount={totalPages}
                  nextLabel={<FaAngleDoubleRight />}
                  previousLabel={<FaAngleDoubleLeft />}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination ltn__pagination justify-content-center"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <!-- PRODUCT DETAILS AREA END -->

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
  );
}

export default ShopGrid;
