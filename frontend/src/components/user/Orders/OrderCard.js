import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import moment from "moment";
import { getOrderTotal } from "../../Cart/checkoutUtils";
import {
  orderStatus,
  paymentMethods,
  paymentStatus,
} from "../../../utils/enums";
import OrderItem from "./OrderItem";
import "./orderCard.scss";
import RetryPayment from "./RetryPayment";
const isPaymentSuccessful = (order) =>
  (order.paymentMode === paymentMethods.CASHFREE &&
    order.paymentStatus === paymentStatus.PAID) ||
  order.paymentMode === paymentMethods.COD;
const OrderCard = ({ order, ...props }) => {
  const orderPaid = isPaymentSuccessful(order);
  return (
    <Card className=" mx-0 my-3">
      <Card.Header className="">
        <Row>
          <Col md={2}>
            <p className="m-0">
              <b>Order #</b> :
            </p>
            <p className="m-0">{order.id.substring(0, 13).toUpperCase()}</p>
          </Col>
          <Col md={2} xs={6}>
            <p className="m-0">
              <b>Order Date : </b>
            </p>
            <p className="m-0">
              {moment(order.createdAt).format("Do MMM, YYYY")}
            </p>
          </Col>
          <Col md={2} xs={6}>
            <p className="m-0">
              <b>Delivery Date:</b>
            </p>
            <p className="m-0">
              {order.actualDeliveryDate ? (
                moment(order.actualDeliveryDate).format("DD-MMM-YYYY")
              ) : (
                <span>Not Yet Delivered</span>
              )}
            </p>
          </Col>
          <Col md={2} xs={6}>
            <p className="m-0">
              <b>Grand Total: </b>
            </p>
            <p className="m-0">
              ₹{getOrderTotal(order.items, order.deliveryAmount)}
            </p>
          </Col>
          <Col md={2} xs={6}>
            <p className="m-0">
              <b>Order Status</b>
            </p>
            <p className="m-0">{order.orderStatus}</p>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row className="mb-2">
          <Col className="mb-2" md={3}>
            <Button block>Track Order</Button>
          </Col>
          <Col className="mb-2" md={3}>
            <Button block>Download Invoice</Button>
          </Col>
          {!orderPaid && (
            <Col className="mb-2" md={3}>
              {<RetryPayment block orderId={order.id} />}
            </Col>
          )}
        </Row>
        <Row>
          {order.items.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
              refreshOrders={props.refreshOrders}
              returnBook={(itemId) => props.returnBook(itemId)}
            />
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};
export default OrderCard;
