import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import MetaTags from "react-meta-tags";
const RentalPolicy = (props) => {
  return (
    <Container fluid className="p-0 mb-5">
      <MetaTags>
        <title>Buyback Policy - Martolex.com </title>
        <meta
          name="description"
          content="Buyback Policy helps in understanding the return procedure and cashback payments of the book in martolex.com. "
        />
      </MetaTags>
      <Row className="w-100 m-0">
        <Col md={12} className="w-100 m-0 p-0 mb-2">
          <h2 className="h1 text-primary text-center">RENTAL POLICY</h2>
        </Col>
      </Row>
      <Row className="px-3">
        <Container fluid className="lead">
          <Row className="mt-4">
            <Col md={12}>
              <strong>Returns after use or end of rental period</strong>
            </Col>
            <Col>
              The user can request to return the book under orders section after
              logging in the account. The books cannot be accepted by Martolex
              if:
              <ol>
                <li>
                  There is a change in syllabus, new or cheap edition is
                  available or expected.
                </li>
                <li>
                  The book is not in good condition . Please refer{" "}
                  <a href="/static/Damage_policy">Damage Policy</a>.
                </li>
                <li>7 days have passed after the rental time period.</li>
                <li>User wants to return it before rental time period.</li>
              </ol>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <strong>Payments after return of books</strong>
            </Col>
            <Col>
              Once the books are accepted and received by us, the cashback
              payment will start. The user will get the cashback payment either
              by UPI, Account transfer or in terms of Martolex Cash. The payment
              would be done within 7 days after receiving the book.
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default RentalPolicy;
