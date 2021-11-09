import React, { useState } from "react";
import "./BookNotFound.scss";
import { Container, Image, Col, Row, Form, Button } from "react-bootstrap";
import OverLay from "../utils/overLay";
import OverlayLoader from "../utils/OverlayLoader";
import { post } from "../../utils/requests";
import { notFoundBookApi } from "../../utils/endpoints";
import MetaTags from "react-meta-tags";
const BookNotFound = (props) => {
  const [details, setDetails] = useState({});
  const [validated, setValidated] = useState(false);
  const [isLoading, setloading] = useState(false);

  async function submitBook() {
    setloading(true);
    try {
      const postData = {
        name: details.bookName,
        author: details.bookAuthor,
        publisher: details.bookPublisher,
        edition: details.edition,
        isbn: details.bookIsbn,
        userName: details.name,
        userEmail: details.email,
        userPhone: details.phone,
      };
      await post(notFoundBookApi, false, postData);
      setloading(false);
      alert("Your request is submitted we will get in touch soon.");
    } catch (err) {
      setloading(false);
      window.alert(err);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      submitBook();
    }
    setValidated(true);
  };
  return (
    <Container fluid className="p-0">
      <MetaTags>
        <title>Didn’t find your book- Martolex.com </title>
        <meta
          name="description"
          content="Didn’t find your book? Fill the form or contact us to request for the book you required. We’ll provide you with extra discount on your order."
        />
      </MetaTags>
      {isLoading && (
        <OverLay style={{ position: "fixed", top: 0, left: 0 }}>
          <OverlayLoader />
        </OverLay>
      )}
      <Row className="w-100 m-0">
        <Col md={12} className="w-100 m-0 p-0">
          <Image
            className="w-100"
            src="https://martolex-static-web-content.s3.ap-south-1.amazonaws.com/did_not_find_book.jpg"
          />
        </Col>
      </Row>
      <Row className="m-0">
        <Col className="p-1 px-2">
          <p className="text-center font-size lead">
            Hey, we are sorry that you didn’t find your book. At Martolex, we
            are continuously trying to grow and improve our services each day.
          </p>
          <Row className="m-0">
            <Col className="p-1 px-2">
              <p className="text-center font-size lead">
                Just fill out this form and our executive will get in touch with
                you to process your order. Also as a token of love, we will give
                you an <b>ADDITIONAL DISCOUNT</b> on your order.
              </p>
              <p className="text-center font-size lead">
                Or Contact on{" "}
                <a href="https://wa.me/8779639797">
                  <b>WHATSAPP</b>
                </a>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="m-0 p-4">
        <Form
          className="w-100"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="your-name">
                <Form.Label>Your Name *</Form.Label>
                <Form.Control
                  required
                  size="lg"
                  type="text"
                  value={details.name}
                  onChange={(event) => {
                    setDetails({ ...details, name: event.target.value });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Name is required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="Mobile-Number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  size="lg"
                  value={details.phone}
                  minLength={10}
                  maxLength={10}
                  pattern="[789]+[0-9]+"
                  onChange={(event) => {
                    setDetails({
                      ...details,
                      phone: event.target.value,
                    });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid phone number
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="email-id">
                <Form.Label>Email ID *</Form.Label>
                <Form.Control
                  required
                  size="lg"
                  type="email"
                  value={details.email}
                  onChange={(event) => {
                    setDetails({ ...details, email: event.target.value });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Enter vali Email
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="book-name">
                <Form.Label>Book Name *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  value={details.bookName}
                  onChange={(event) => {
                    setDetails({
                      ...details,
                      bookName: event.target.value,
                    });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Book Name is required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="book-publisher">
                <Form.Label>Book Publisher *</Form.Label>
                <Form.Control
                  required
                  size="lg"
                  type="text"
                  value={details.bookPublisher}
                  onChange={(event) => {
                    setDetails({
                      ...details,
                      bookPublisher: event.target.value,
                    });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Publisher name is required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="book-author">
                <Form.Label>Author *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  value={details.bookAuthor}
                  onChange={(event) => {
                    setDetails({
                      ...details,
                      bookAuthor: event.target.value,
                    });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Author Name is required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="book-edition">
                <Form.Label>Edition </Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  value={details.bookEdition}
                  onChange={(event) => {
                    setDetails({ ...details, edition: event.target.value });
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="book-isbn">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  value={details.bookIsbn}
                  onChange={(event) => {
                    setDetails({
                      ...details,
                      bookIsbn: event.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button block size="lg" type="submit">
                Request Book
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};
export default BookNotFound;
