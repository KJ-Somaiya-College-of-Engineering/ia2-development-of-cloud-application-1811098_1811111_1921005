import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NoProducts = (props) => {
  return (
    <Container
      style={{
        minHeight: "60vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row className="justify-content-center">
        <Col md={2} xs={7}>
          <Image width="100%" src="/illustrations/not-found.png" />
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-4">
          <h3>No books found</h3>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <p>
            You can put in your book request and we will get back to you soon.
            Or Contact on <a href="https://wa.me/8779639797">WHATSAPP</a>
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Link to="/notFound">
            <Button>REQUEST BOOK</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NoProducts;
