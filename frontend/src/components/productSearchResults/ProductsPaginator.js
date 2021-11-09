import React from "react";
import ProductListing from "../productListing/productListing";
import {
  BsGrid3X3GapFill,
  BsList,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { desktopRes } from "../../viewPortBreakpoints";
import { useViewportHook } from "../utils/viewPortHandler";
import QueryString from "query-string";
import { Col, Row } from "react-bootstrap";
import {
  categorySearchApi,
  subCategorySearchApi,
  searchApi,
} from "../../utils/endpoints";
import { get } from "../../utils/requests";
import OverlayLoader from "../utils/OverlayLoader";

const ProductsPaginator = ({
  catId,
  subCatId,
  isSearch,
  queryString,
  ...props
}) => {
  const { width } = useViewportHook();
  const [displayType, setDisplayType] = React.useState("grid");
  const [products, setProducts] = React.useState([]);
  const [pagination, setPagination] = React.useState({});
  const [pageNum, setPageNum] = React.useState(1);
  const [isLoading, setLoading] = React.useState(false);
  async function getData(api) {
    try {
      setLoading(true);
      const [{ books }, pagination] = await get(api, false);
      setProducts(books);
      setPagination(pagination);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  }

  const nextPage = () => {
    const { offset } = QueryString.parse(pagination.nextUrl);
    if (offset) {
      setPageNum(pageNum + 1);
      getData(pagination.nextUrl);
      window.scrollTo(0, 0);
    }
  };
  const prevPage = () => {
    const { offset } = QueryString.parse(pagination.prevUrl);
    if (offset) {
      setPageNum(pageNum - 1);
      getData(pagination.prevUrl);
      window.scrollTo(0, 0);
    }
  };
  React.useEffect(() => {
    let api = "";
    if (isSearch) {
      api = searchApi(queryString); //search api
    } else {
      api = !subCatId
        ? categorySearchApi(catId)
        : subCategorySearchApi(catId, subCatId);
    }
    getData(api);
  }, [catId, subCatId, isSearch, queryString]);
  return (
    <Col md={9} className="px-md-4">
      <Row className="mx-0 mb-4 pagination-selector">
        {desktopRes < width && (
          <Col md={2} className="text-dark">
            <BsGrid3X3GapFill
              className="mr-1 buttons "
              size={20}
              onClick={() => {
                setDisplayType("grid");
              }}
            />
            <BsList
              className="mr-1 buttons btn-list"
              size={26}
              onClick={() => {
                setDisplayType("row");
              }}
            />
          </Col>
        )}
        <Col md={10} className="text-white">
          ---
        </Col>
        <Col className="pagination-header">Showing page {pageNum}</Col>
      </Row>
      <ProductListing
        isLoading={isLoading}
        products={products}
        displayType={displayType}
      />
      <Row className="pagination justify-content-center mt-3 mx-1 p-0">
        <Col md={3} className="p-md-0 m-0">
          <Row className="p-md-0 m-0">
            <Col onClick={prevPage} className="button">
              <BsChevronLeft size={20} />
            </Col>
            <Col className="button pageNum">
              <span style={{ fontSize: "1.3em" }}>{pageNum}</span>
            </Col>
            <Col onClick={nextPage} className="button m-0">
              <BsChevronRight size={20} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default ProductsPaginator;
