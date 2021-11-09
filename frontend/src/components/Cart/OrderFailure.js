import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { FaRegFrown } from "react-icons/fa";

const OrderFailure = (props) => {
  return (
    <Container style={{ height: "65vh" }} className="text-center">
      <Row className="h-100 align-items-center">
        <Col>
          <Row className="justify-content-center">
            <Col md={{ span: 3 }} xs={{ span: 7 }}>
              <Image width="100%" src="/illustrations/payment-failed.png" />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="text-dark">Sorry, Your Payment Failed</h2>
              <p className="lead">
                You can retry placing your order by going to your Orders
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button href="/profile/orders">Go to Your Orders</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderFailure;
