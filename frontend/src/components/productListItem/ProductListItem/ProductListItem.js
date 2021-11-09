import React from "react";
import ReactStars from "react-stars";
import "./ProductListItem.scss";
import { Row, Col, Image, Button } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { buildBookDetailsUrl } from "../../../utils/buildUrl";
import { connect } from "react-redux";
import checkItemInCart from "../../../utils/checkItemInCart";
import { addToCart } from "../../../redux/actions/CartActions";
import { getMinPlan } from "../../../utils/produtUtils";

const ProductCard = ({ product, ...props }) => {
  const productPlan = getMinPlan(product);
  const price = product.rent[productPlan];
  const discount = (
    ((product.rent.mrp - price) / product.rent.mrp) *
    100
  ).toFixed(0);
  return (
    <Row className="product-card">
      <Col md={2} className="product-img">
        <Image src={product.images[0]?.url || "/book1.png"} />
      </Col>
      <Col className="pt-1 pl-2 prod-details" md={7}>
        <a href={buildBookDetailsUrl(product.id)} className="prod-name">
          {product.name}
        </a>
        <p className="prod-author">
          <b>Author:</b> {product.author}
        </p>
        <p className="prod-publisher">
          <b>Publisher:</b> {product.publisher}
        </p>
        {/* <p className="prod-description">
          <b style={{ fontSize: "1.1em" }}>description:</b>{" "}
          {product.description
            ? product.description.length > 200
              ? product.description.substring(0, 200) + "..."
              : product.description
            : "Not Available"}
        </p> */}

        {product.isBuyBackEnabled ? (
          <p className="prod-publisher text-success">Buyback available</p>
        ) : (
          <p className="prod-publisher text-danger">Buyback not available</p>
        )}

        <ReactStars
          className="ratings"
          count={5}
          value={product.rating}
          edit={false}
          size={30}
          color2={"#ffd700"}
        />
      </Col>
      <Col md={3} className="right-block">
        <Row>
          <div className="prices">
            <span className="price">&#8377;{price}/-</span>
            <span className="actual-price">&#8377;{product.rent.mrp}/-</span>
            <p className="discount">Save {discount}%</p>
          </div>
        </Row>
        <Row className="w-100 mt-1">
          <Button
            onClick={() => {
              props.addToCart(product.id, productPlan, 1);
            }}
            disabled={props.isPresentInCart}
            variant="success"
            block
          >
            <FiShoppingCart className="mr-1" size={20} />
            {props.isPresentInCart ? "ITEM IN CART" : "ADD TO CART"}
          </Button>
          <Button variant="warning" block>
            <FaRegHeart className="mr-1" size={20} />
            ADD TO WISHLIST
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isPresentInCart: checkItemInCart(state.cart.items, ownProps.product.id),
});

const mapDispatchToprops = (dispatch, ownProps) => ({
  addToCart: (bookId, plan, qty) => {
    dispatch(addToCart(bookId, plan, qty));
  },
});

export default connect(mapStateToProps, mapDispatchToprops)(ProductCard);
