import React from "react";
import { Image, Col, Row, Button } from "react-bootstrap";
import { mapPlanToText } from "../../../utils/produtUtils";
import { plans, returnStates, returnStateSetters } from "../../../utils/enums";
import moment from "moment";
import { post } from "../../../utils/requests";
import { ordersApi } from "../../../utils/endpoints";
import { getRefundAmount } from "../../Cart/checkoutUtils";
const OrderItem = ({ item, ...props }) => {
  const returnStatus = returnStates[item.isReturned];

  async function cancelReturn() {
    const cancelConfirmation = window.confirm(
      "Are you sure you want to cancel your return. You may not be able to return the book if your plan has expired"
    );
    if (cancelConfirmation) {
      try {
        const [res] = await post(ordersApi.cancelReturn(item.id));
        props.refreshOrders();
        alert(res.message);
      } catch (err) {
        window.alert(err);
      }
    }
  }
  return (
    <Col md={6} sm={12} className="my-2">
      <Row>
        <Col className="text-center" md={4}>
          <Image
            src={item.book.images[0]?.url || `/book1.png`}
            className="book-img"
          />
        </Col>
        <Col style={{ height: "100%" }} md={8}>
          {/* <Row style={{ height: "100%" }}>
            <Col md={8}> */}
          <p style={{ fontSize: "1.2em" }} className="mb-2 text-truncate">
            {item.book.name}
          </p>
          <p className="m-0">
            <b>Plan :</b> {mapPlanToText(item.plan)}
          </p>
          <p className="m-0">
            <b>Amount paid : </b>₹{" "}
            {(item.plan !== plans.SELL ? item.deposit : item.rent).toFixed(2)}
          </p>
          <p className="m-0">
            <b>Refundable amount: </b>
            {item.plan === plans.SELL
              ? "N.A."
              : `₹${getRefundAmount(item.rent, item.deposit).toFixed(2)}`}
          </p>
          <p className="m-0">
            <b>Return By : </b>
            {item.plan === plans.SELL
              ? "N.A"
              : moment(item.returnDate).format("DD-MM-YYYY")}
          </p>
          <p className="m-0">
            <b>Return status : </b>
            {
              <span className={`font-weight-bold text-${returnStatus.color}`}>
                {returnStatus.message}
              </span>
            }
          </p>
          {item.isReturned === returnStateSetters.NOT_RETURNED && (
            <Button
              onClick={() => props.returnBook(item.id)}
              disabled={new Date(item.returnDate).getTime() < Date.now()}
              className=""
              block
            >
              RETURN
            </Button>
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default OrderItem;
