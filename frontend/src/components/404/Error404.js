import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Error404 = (props) => {
  return (
    <Container
      style={{
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row className="">
        <Col className="mx-auto" md={6} xs={8}>
          <Image src="/404.svg" width="100%" />
        </Col>
      </Row>
      <Row className="text-center mt-4  align-items-center justify-content-center">
        <h1 className="text-dark display-4">
          Uh Oh! Looks like You got lost!!
        </h1>
      </Row>
    </Container>
  );
};
export default Error404;
