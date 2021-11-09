import React from "react";
import "./Cart.scss";
import { Row, Col, Button, Image } from "react-bootstrap";
import RightContainer from "../utils/RightContainer";
import CartItem from "./CartItem";
import { getCart } from "../../redux/actions/CartActions";
import { connect } from "react-redux";
import OverlayLoader from "../utils/OverlayLoader";
import cartStatsCalculator from "../../utils/cartStats";
import { Link } from "react-router-dom";

const Cart = (props) => {
  React.useEffect(() => {
    if (props.isAuth) {
      props.syncCart();
    }
  }, [props.isAuth]);

  const [cartStats, setCartStats] = React.useState({
    totalAmount: 0,
    rentalAmount: 0,
  });
  React.useEffect(() => {
    setCartStats(cartStatsCalculator(props.cart));
  }, [props.cart]);
  return (
    <RightContainer close={props.closeCart} title="Cart" isOpen={props.isOpen}>
      {props.isLoading && <OverlayLoader />}

      {props.cart.length > 0 ? (
        <div>
          {props.cart.map((cartItem) => (
            <CartItem key={cartItem.BookId} item={{ ...cartItem }} />
          ))}

          <div className="details-div w-100 m-0">
            <Row className="details-row  w-100 m-0">
              <span>Amount you pay now:</span>
              <span className="text-primary">Rs.{cartStats.totalAmount}/-</span>
            </Row>

            <Row className="details-row w-100 m-0">
              <span>Amount refunded:</span>
              <span className="text-primary">
                Rs. {cartStats.totalAmount - cartStats.rentalAmount}/-
              </span>
            </Row>
          </div>
          <Row>
            <Col className="px-4 w-100 m-0">
              <Link className="btn-link" to="/checkout">
                <Button onClick={props.closeCart} className="my-3 " block>
                  CHECKOUT
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      ) : (
        <Row className="empty-cart px-3">
          <Image className="w-100" src="/empty-cart.svg" />
          <p>Looks Like your cart is empty</p>
        </Row>
      )}
    </RightContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.user.auth,
  cart: state.cart.items,
  isLoading: state.cart.loading,
});
const mapDispatchToProps = (dispatch) => ({
  syncCart: () => dispatch(getCart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
