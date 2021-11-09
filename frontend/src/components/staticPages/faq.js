import React from "react";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const FAQ = (props) => {
  return (
    <Container fluid className="p-0 mb-5">
      <Row className="d-flex justify-content-center ">
        <Col className="mx-3 py-3 px-xs-6 px-md-0" xs={11} md={8}>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Do we need to create an account to order books ?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  Yes, you will be able to order books once you are logged in.
                  Your personalised account helps you to get your dashboard
                  where you can see all your order details and request us with
                  the Return option to take back the book after using it. Plus,
                  we would love you to be a part of Martolex family.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                How do you charge the rent ? What we have to pay ?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <p>
                    We help you to rent books for 1,3,6,9 and 12 month(s) and
                    charge you accordingly. For example, when you want to use
                    the book for 3 months, you have to pay the MRP of the book
                    which is like a deposit. After using the book for 3 months,
                    you can request us to return the book by using the RETURN
                    option from your account dashboard. Our executives will come
                    at your doorstep to collect the book along with a small
                    quality check of it. As soon as we receive the book, the
                    rental amount of 3 months will be charged and the rest will
                    be refunded in 7 working days.
                    <br />
                    For more information, you can check{" "}
                    <Link
                      to="/static/how_it_works"
                      style={{ color: "#3ac6bf" }}
                    >
                      How it works
                    </Link>
                  </p>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                What if we use excessive permanent inks or the book is damaged ?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <p>
                    If you receive a book which has excessive permanent ink or
                    is damaged from our side, you can just click the photo and
                    mail us along with the order details.
                    <br />
                    If the book/books from your side have excessive permanent
                    inks or damaged in any way after returning, then amount from
                    your deposit will be deducted and it will be decided
                    depending on the type of damage of the book. Damage to any
                    book can cost you upto 70-95% of the amount deposited. Do
                    read our{" "}
                    <Link
                      to="/static/Damage_policy"
                      style={{ color: "#3ac6bf" }}
                    >
                      Damage Policy
                    </Link>{" "}
                    for more information.
                  </p>{" "}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                What books do we get ?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <p>
                    The books will be a hard copy. It will be new or as good as
                    new. The edition would either be the one shown in product
                    image or the latest edition depending on the availability.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center ">
        <Col className="mx-3 py-3 px-xs-6 px-md-0" xs={11} md={8}>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Do you buy used books from us or can we donate books to you ?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  No, we don’t buy used books from you. If you wish to donate,
                  you can mail us the details.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                What if I'm not able to find the book I want ?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <p>
                    We are sorry that you didn’t find your book. But don't worry
                    at all because we have a portal{" "}
                    <Link to="/notFound" style={{ color: "#3ac6bf" }}>
                      here
                    </Link>{" "}
                    on which you can just fill up the form. One of our executive
                    will get in touch with you to let you know about the
                    availability of the book and help you in processing the
                    order. For more information, you can contact us.{" "}
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                In how many days the books will be delivered ?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <p>You will receive your order within 3-7 working days.</p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                What books do we get ?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <p>
                    The books will be a hard copy. It will be new or as good as
                    new. The edition would either be the one shown in product
                    image or the latest edition depending on the availability.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="4">
                Do you sell advertising on your site ?
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  <p>
                    Currently, we do not sell banner advertising on our site.
                    However, for information on Co-op promotional opportunities,
                    please contact us.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQ;
