import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import MetaTags from "react-meta-tags";
const DamagePolicy = (props) => {
  return (
    <Container fluid className="p-0 mb-5">
      <MetaTags>
        <title>Damage Policy - Martolex.com </title>
        <meta
          name="description"
          content="Over the course of time, a book will be rented multiple times on martolex.com. Therefore, it is essential to not damage the book and respect the policy."
        />
      </MetaTags>
      <Row className="w-100 m-0 mt-3">
        <Col md={12} className="w-100 m-0 p-0 mb-2">
          <h2 className="h1 text-primary text-center">DAMAGE POLICY</h2>
        </Col>
      </Row>
      <Row className="px-3">
        <Container fluid className="lead">
          <Row className="mt-3">
            <Col>
              Over the course of time, a book will be rented multiple times.
              Therefore it is essential to take care of the rented book.
              <br />
              <br />
              If the book is returned in a condition such that it cannot be
              rented again, the company reserves the right to charge damage fees
              or replacement costs depending upon the condition of the book and
              may or may not accept the book back.
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <h3>These conditions are explained in detail below:</h3>
            </Col>
            <Col>
              <Row>
                <Col md={6}>
                  <ul>
                    <li>
                      There should be no<b> WATER Damage</b> or{" "}
                      <b>OIL Damage</b> on the books.
                    </li>
                  </ul>
                  <div className="text-center">
                    <Image src="/banners/damage1.jpg" />
                  </div>
                </Col>
                <Col md={6}>
                  <ul>
                    <li>
                      If the pages are <b>TORN or MISSING</b> . This implies for
                      the COVER PAGE(s).
                    </li>
                  </ul>
                  <div className="text-center">
                    <Image src="/banners/damage2.jpg" />
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={6}>
                  <ul>
                    <li>
                      During the rental period you are deemed to be solely
                      responsible for the rented book. You are responsible, if
                      it is damaged, lost or stolen. Keep the book safe and get
                      your money back!
                    </li>
                  </ul>
                  <div className="text-center">
                    <Image src="/banners/damage3.jpg" />
                  </div>
                </Col>
                <Col md={6}>
                  <ul>
                    <li>
                      <b>
                        Writing or underlining in the book with pen, marker,
                        textliner or any other product which uses permanent ink
                        isn’t allowed. You can use pencil for underlining or to
                        make notes.
                      </b>
                      <br />
                      The book needs to be returned in good condition, which
                      includes keeping the pages clean and free from any
                      markings or underlining by permanent ink.
                    </li>
                  </ul>
                  <div className="text-center">
                    <Image src="/banners/damage4.jpg" />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};
export default DamagePolicy;
