import React from "react";
import "./CartItem.scss";
import { Row, Image, Col, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import QuantityChooser from "../utils/QuantityChooser";
import {
  modifyCartItemQuantity,
  removeFromCart,
} from "../../redux/actions/CartActions";
import { connect } from "react-redux";
import { mapPlanToText } from "../../utils/produtUtils";

const CartItem = ({ item, ...props }) => {
  console.log(item.bookId);
  return (
    <Row className="item-container w-100 m-0">
      <Col className="imgDiv" xs={4}>
        <Image
          className="img"
          src={
            item.book.images.length > 0 ? item.book.images[0].url : "/book1.png"
          }
        />
      </Col>
      <Col className="book-description">
        {/* <MdClose className=''/>s */}
        <p className="bookname ">{item.book.name}</p>
        <p className="mt-0">
          {item.qty} x
          <span className="text-primary cost">
            Rs. {item.price}
            /-
          </span>
        </p>
        <p>Plan: {mapPlanToText(item.plan)}</p>
        <p>Rent: Rs.{item.rent}/-</p>
        <Row className="buttons-div">
          <Col className="m-0 p-0 button" xs={8}>
            <QuantityChooser
              initialQuantity={1}
              maxQuantity={item.book.quantity}
              currentQuantity={item.qty}
              onChange={(newQuantity) => {
                props.updateQty(item.bookId, item.plan, newQuantity);
              }}
            />
          </Col>
          <Col className="m-0 p-0 button" xs={4}>
            <Button
              onClick={() => props.remove(item.bookId)}
              className="remove-btn"
              variant="danger"
            >
              <FaTrash />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateQty: (bookid, plan, qty) => {
    dispatch(modifyCartItemQuantity(bookid, plan, qty));
  },
  remove: (bookId) => dispatch(removeFromCart(bookId)),
});

export default connect(null, mapDispatchToProps)(CartItem);
