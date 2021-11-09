import React, { useEffect, useState } from "react";

import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { ordersApi } from "../../../../utils/EndPoints";
import { get, post } from "../../../../utils/requests";
import moment from "moment";
import DispatchDialog from "./DispatchDialog";
import OrderSummaryCard from "./OrderSummaryCard";
import AddressCard from "./AddressCard";
import {
  orderStatus,
  paymentMethods,
  paymentStatus,
} from "../../../../utils/enums";
import Table from "../../../../utils/Table";
const OrderDetails = (props) => {
  const [order, setOrder] = useState(undefined);

  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setOrder(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData(ordersApi.orderDetails(props.match.params.id));
  }, [props.match.params.id]);

  async function deliverItem() {
    try {
      await post(ordersApi.ModifyOrderStatus(order.id), true, {
        status: orderStatus.DELIVERED,
      });
      getData(ordersApi.orderDetails(props.match.params.id));
    } catch (err) {
      alert(err);
    }
  }

  const nextStateButton = () => {
    if (order) {
      switch (order.orderStatus) {
        case orderStatus.PROCESSING:
          return (
            <Col md={3}>
              <Button
                block
                variant="success"
                onClick={() => setDispatchModalOpen(true)}
              >
                DISPATCH
              </Button>
            </Col>
          );
        case orderStatus.SHIPPED:
          return (
            <Col md={3}>
              <Button block variant="success" onClick={() => deliverItem()}>
                DELIVER ITEM
              </Button>
            </Col>
          );
        default:
          return (
            <Col>
              <Alert variant="success">
                <Alert.Heading>Order is Delivered</Alert.Heading>
              </Alert>
            </Col>
          );
      }
    }
  };

  async function sendPaymentLink() {
    console.log("here");
    try {
      await post(ordersApi.resendPaymentLink(order.id), true);
      alert("link sent successfully");
    } catch (err) {
      alert(err);
    }
  }

  const deliveryDates = order
    ? {
        min: order.deliveryMinDate,
        max: order.deliveryMaxDate,
      }
    : null;
  return order ? (
    <Container className="mt-4" fluid>
      {order.paymentStatus === paymentStatus.PAID ? (
        <DispatchDialog
          show={dispatchModalOpen}
          orderId={order.id}
          reload={() => getData(ordersApi.orderDetails(props.match.params.id))}
          deliveryDates={deliveryDates}
          handleClose={() => setDispatchModalOpen(false)}
        />
      ) : null}
      <Row className>
        <Col>
          <h3 className="text-dark my-3 mb-0">Order details</h3>
        </Col>
      </Row>
      <Row className="">
        <Col className="mb-3" xs={12} md={6}>
          <OrderSummaryCard order={order} orderModifier={setOrder} />
        </Col>
        <Col>
          <AddressCard address={order.address} />
        </Col>
      </Row>
      <Row className="my-2">
        {order.paymentStatus === paymentStatus.PAID ||
        order.paymentMode === paymentMethods.COD ? (
          nextStateButton()
        ) : (
          <Col md={3}>
            <Button variant="warning" onClick={sendPaymentLink}>
              RESEND PAYMENT LINK
            </Button>
          </Col>
        )}
      </Row>

      <Row className="mt-3" key={"123"}>
        <Col>
          <div style={{ border: "1px solid #eee" }}>
            <Table
              data={order.items}
              keyExtractor={(item) => item.id}
              headerCols={[
                "SOLD BY",
                "BOOK NAME",
                "AUTHOR",
                "PUBLISHER",
                "ISBN",
                "PLAN",
                "QTY",
                "RETURN DATE",
              ]}
              renderRow={(item) => [
                item.book.upload.name,
                item.book.name,
                item.book.author,
                item.book.publisher,
                item.book.isbn,
                item.plan,
                item.qty,
                moment(item.returnDate).format("DD-MM-YYYY"),
              ]}
              selectable={false}
            />
          </div>
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default OrderDetails;
