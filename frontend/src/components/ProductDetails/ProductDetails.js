import React from "react";
import ReactStars from "react-stars";
import "./ProductDetails.scss";
import {
  Row,
  Col,
  Button,
  Container,
  Carousel,
  Form,
  Breadcrumb,
} from "react-bootstrap";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import MetaTags from "react-meta-tags";
import QuantityChooser from "../utils/QuantityChooser";
import ProductListing from "../productListing/productListing";
import { get } from "../../utils/requests";
import { productDetailsApi, subCategorySearchApi } from "../../utils/endpoints";
import OverLayLoader from "../utils/OverlayLoader";
import OverLay from "../utils/overLay";
import { buildCatUrl, buildSubCatUrl } from "../../utils/buildUrl";
import { desktopRes } from "../../viewPortBreakpoints";
import { useViewportHook } from "../utils/viewPortHandler";
import { connect } from "react-redux";
import checkItemInCart from "../../utils/checkItemInCart";
import { addToCart } from "../../redux/actions/CartActions";
import { plans } from "../../utils/enums";
import {
  getMinPlan,
  getProductPrice,
  getRefundAmount,
} from "../../utils/produtUtils";
import ReviewList from "./ReviewList";
const ProductDetails = (props) => {
  const { width: viewPortWidth } = useViewportHook();
  const [product, setProduct] = React.useState({});
  const [similarproducts, setsimilarproducts] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [similarLoading, setSimilarLoading] = React.useState(true);
  const [plan, setPlan] = React.useState({});

  React.useEffect(() => {
    async function getData() {
      try {
        const [product] = await get(
          productDetailsApi(props.match.params.bookId),
          false
        );
        if (product) {
          setProduct(product);
          const minPlan = getMinPlan(product);
          setPlan({ plan: minPlan, rent: product.rent[minPlan], qty: 1 });
          setLoading(false);
          const [similarproducts] = await get(
            subCategorySearchApi(
              product.subCat.category.id,
              product.subCat.id,
              viewPortWidth < desktopRes ? 4 : 12
            )
          );

          setsimilarproducts(similarproducts.books);
          setSimilarLoading(false);
        } else {
          window.location.href = "/not-found-error";
        }
      } catch (err) {
        alert(err);
      }
    }
    getData();
  }, [props.match.params.bookId]);

  const changePlan = ({ target: { value } }) =>
    setPlan({ ...plan, plan: value, rent: product.rent[value] });
  const modifyQuantity = (qty) => setPlan({ ...plan, qty });

  return isLoading ? (
    <OverLay>
      <OverLayLoader />
    </OverLay>
  ) : (
    <Container fluid>
      <MetaTags>
        <title>{`Buy or Rent a Textbook of ${product.name} by ${product.author} of ${product.publisher} online at cheap price on Martolex.com`}</title>
        <meta
          name="description"
          content={`Buy or Rent a Textbook of ${product.name} by ${product.author} of ${product.publisher} online at cheap price on Martolex.com.`}
        />
      </MetaTags>
      <Row>
        <Col
          className="p-4 carouselContainer d-flex justify-content-center"
          md={4}
        >
          <Carousel className="w-75 imgcarousel">
            {product.images.map((img, idx) => (
              <Carousel.Item key={idx}>
                <img
                  alt={`product ${idx + 1}`}
                  className="d-block w-100 "
                  src={img.url}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={8} className="py-4 ">
          <Breadcrumb className="prod-breadcrumb">
            <Breadcrumb.Item href={buildCatUrl(product.subCat.category.id)}>
              {product.subCat.category.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              href={buildSubCatUrl(
                product.subCat.category.id,
                product.subCat.id
              )}
            >
              {product.subCat.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
          </Breadcrumb>
          <h3 className="prod-name">{product.name}</h3>
          <p className="sub-head">
            Author: <b className="val">{product.author}</b>
          </p>
          <p className="sub-head">
            Publication:<b className="val"> {product.publisher}</b>
          </p>
          <p className="sub-head">
            Book Edition:{" "}
            <b className="val">{product.edition || "Not available"}</b>
          </p>
          <p className="sub-head">
            Book ISBN: <b className="val">{product.isbn}</b>
          </p>
          <p className="sub-head">
            Availability: <b className="val">In Stock</b>
          </p>
          <p className="sub-head">
            {product.isBuyBackEnabled ? (
              <b className="val">Buyback available</b>
            ) : (
              <b className="val text-danger">BuyBack not available</b>
            )}
          </p>
          <Row className="align-items-center pl-3">
            Average Rating :{" "}
            <ReactStars
              className="ratings"
              count={5}
              edit={false}
              value={product.rating}
              size={30}
              color2={"#ffd700"}
            />
            ({product.reviews.length})
          </Row>
          <Row className=" pl-3 py-3 align-items-center">
            <p className="mr-4">
              <b>Quantity</b>
            </p>
            <QuantityChooser
              onChange={modifyQuantity}
              initialQuantity={1}
              maxQuantity={product.quantity}
            />
          </Row>
          {product.isBuyBackEnabled && (
            <Row className="w-100 py-2">
              <Col md={6}>
                <Form className="w-100">
                  <Form.Label>BuyBack Period</Form.Label>
                  <Form.Control
                    as="select"
                    size="lg"
                    custom
                    onChange={changePlan}
                  >
                    <option value={plans.MONTHLY}>1 Month</option>
                    <option value={plans.QUATERLY}>3 Months</option>
                    <option value={plans.SEMIANNUAL}>6 months</option>
                    <option value={plans.NINEMONTHS}>9 months</option>
                    <option value={plans.ANNUAL}>12 months</option>
                    <option value={plans.SELL}>Buy Book</option>
                  </Form.Control>
                </Form>
              </Col>
            </Row>
          )}

          <p className="amount">
            Amount You Pay Now:{" "}
            <span>
              ₹ {getProductPrice(plan, product.rent, product.isBuyBackEnabled)}
            </span>
          </p>
          {product.isBuyBackEnabled && plan.plan !== plans.SELL && (
            <p className="amount">
              Amount refunded on return :{" "}
              <span>₹{getRefundAmount(product.rent, plan)}</span>
            </p>
          )}
          {product.isBuyBackEnabled && plan.plan !== plans.SELL && (
            <p className="amount">
              Rental Amount : <span>₹{plan.rent}</span>
            </p>
          )}
          <p className="amount">
            Your Savings:
            <span>
              {(
                (getRefundAmount(product.rent, plan) /
                  getProductPrice(
                    plan,
                    product.rent,
                    product.isBuyBackEnabled
                  )) *
                100
              ).toFixed(0)}
              %
            </span>
          </p>
          <Row className="my-4">
            <Col md={4} className="py-2">
              <Button
                disabled={props.isPresentInCart}
                onClick={() => props.addToCart(product.id, plan.plan, plan.qty)}
                block
                size="lg"
                variant="success"
              >
                <FaShoppingCart className="mr-2" size={20} />
                {props.isPresentInCart ? "ITEM IN CART" : "ADD TO CART"}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {product.description && (
        <Row className="mb-3">
          <Row className="w-100 row-header-box">
            <h2 className="row-header">DESCRIPTION</h2>
          </Row>
          <Col className="px-4">{product.description}</Col>
        </Row>
      )}

      <ReviewList reviews={product.reviews} />
      <Row>
        <Row className="w-100 row-header-box">
          <h2 className="row-header">RELATED PRODUCTS</h2>
        </Row>

        <ProductListing
          style={{ padding: "0 20px" }}
          displayType={"grid"}
          isLoading={similarLoading}
          products={similarproducts}
        />
      </Row>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isPresentInCart: checkItemInCart(
    state.cart.items,
    ownProps.match.params.bookId
  ),
});

const mapDispatchToprops = (dispatch, ownProps) => ({
  addToCart: (bookId, plan, qty) => {
    dispatch(addToCart(bookId, plan, qty));
  },
});

export default connect(mapStateToProps, mapDispatchToprops)(ProductDetails);
