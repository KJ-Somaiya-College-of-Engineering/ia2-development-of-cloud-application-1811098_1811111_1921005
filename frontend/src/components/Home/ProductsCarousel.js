import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { categorySearchApi } from "../../utils/endpoints";
import { get } from "../../utils/requests";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ProductCard from "../productListItem/productCard/ProductCard";
import { Link } from "react-router-dom";
import { buildCatUrl } from "../../utils/buildUrl";
import ProductCardSkeleton from "../productListItem/productCard/ProductCardSkeleton";
import Skeleton from "react-loading-skeleton";

const ITEMS_IN_ROW = { desktop: 5, mobile: 1, smallDektop: 3, tablet: 2 };
const ProductCarousel = ({ catId, label, ...props }) => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  async function getData(api, params) {
    console.log(params);
    try {
      const [data] = await get(api, true, params);
      console.log(data);
      setProducts(data.books);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    if (catId) getData(categorySearchApi(catId));
  }, [catId]);

  return (
    <Container className="prod-carousel my-3 mt-2" fluid>
      <Row>
        <Col className="text-center header-container">
          <h2 className="heading">
            {catId ? (
              <Link className="btn-link text-dark" to={buildCatUrl(catId)}>
                <b>{label.toUpperCase()}</b>
              </Link>
            ) : (
              <Row>
                <Col md={{ offset: 4, span: 4 }}>
                  <Skeleton />
                </Col>
              </Row>
            )}
          </h2>
        </Col>
      </Row>
      <Row className="scrollable-div">
        <Col className="d-block">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={5000}
            autoPlay
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={true}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: ITEMS_IN_ROW.desktop,
                partialVisibilityGutter: 40,
              },
              smallDesktop: {
                breakpoint: {
                  max: 1024,
                  min: 768,
                },
                items: ITEMS_IN_ROW.smallDektop,
                partialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: ITEMS_IN_ROW.mobile,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 768,
                  min: 464,
                },
                items: ITEMS_IN_ROW.tablet,
                partialVisibilityGutter: 30,
              },
            }}
            showDots={true}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {!loading
              ? products.length > 0 &&
                products.map((product) => (
                  <ProductCard product={product} style={{ width: "100%" }} />
                ))
              : [...Array(ITEMS_IN_ROW.desktop).keys()].map((item) => (
                  <ProductCardSkeleton style={{ width: "100%" }} />
                ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(ProductCarousel);
