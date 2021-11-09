import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const HowItWorks = (props) => {
  return (
    <Container fluid className="p-0 mb-5">
      <Row className="w-100 m-0">
        <Col md={12} className="w-100 m-0 p-0">
          <Image
            className="w-100"
            src="https://martolex-static-web-content.s3.ap-south-1.amazonaws.com/how_it_works.jpg"
          />
        </Col>
      </Row>
      <Row className="w-100 m-0">
        <Col md={12} className="w-100 m-0 p-0">
          <Image
            className="w-100"
            src="https://martolex-static-web-content.s3.ap-south-1.amazonaws.com/how+it+works-01.png"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HowItWorks;
