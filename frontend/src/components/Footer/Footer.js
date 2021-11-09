import React, { useState } from "react";
import "./footer.scss";
import { Container, Col, Row, Form, Button, Image } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { subscribeToNewsLetter } from "../../utils/endpoints";
import { post } from "../../utils/requests";
const Footer = (props) => {
  const [details, setDetails] = useState({ name: "", email: "" });
  async function subscribe(e) {
    e.preventDefault();
    try {
      const { name, email } = details;
      let [data] = await post(subscribeToNewsLetter, false, { name, email });
      alert(data.message);
    } catch (err) {
      alert(err);
    }
  }
  return (
    <div>
      <Row className="bg-primary text-dark social py-3">
        <Col className="justify-content-center " md={10}>
          <h3>Connect with us on Social Networks</h3>
        </Col>
        <Col className="icons">
          <a
            className="text-dark"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/MartolexIndia/"
          >
            <FaFacebook size={30} className="mr-1" />
          </a>
          <a
            className="text-dark"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/martolexindia"
          >
            <FaTwitter size={30} className="mr-1" />
          </a>

          <a
            className="text-dark"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/martolex/"
          >
            <FaInstagram size={30} className="mr-1" />
          </a>
          <a
            className="text-dark"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/company/martolex/"
          >
            <FaLinkedin size={30} className="mr-1" />
          </a>
        </Col>
      </Row>
      <Container fluid className="bg-dark pt-5 px-5 pb-1">
        <Row>
          <Col>
            <Row>
              <Col md={4} className="pr-5">
                <Row>
                  <h3 className=" text-light">About Martolex</h3>
                </Row>
                <Row>
                  <p>
                    Martolex is an online book rental marketplace where you can
                    buy books and return them after use to save up to 70% of
                    your book expenditures in your college or school. Helping
                    students save time, save money and get smarter.
                  </p>
                </Row>
              </Col>
              <Col md={3}>
                <Row>
                  <h3 className=" text-light">Information</h3>
                </Row>
                <Row>
                  <a href="/static/terms_conditions" className="footer-link">
                    Terms and conditions
                  </a>
                </Row>
                <Row>
                  <a href="/static/Privacy_policy" className="footer-link">
                    Privacy Policy
                  </a>
                </Row>

                <Row>
                  <a href="/static/Damage_policy" className="footer-link">
                    Damage Policy
                  </a>
                </Row>

                <Row></Row>
              </Col>
              <Col md={2}>
                <Row>
                  <h3 className=" text-light">Useful Links</h3>
                </Row>
                <Row>
                  <a href="/" className="footer-link">
                    Media
                  </a>
                </Row>
                <Row>
                  <a href="/static/faq" className="footer-link">
                    FAQ
                  </a>
                </Row>
                <Row>
                  <a href="/static/Rental_policy" className="footer-link">
                    Rental Policy
                  </a>
                </Row>
              </Col>
              <Col md={3} className="">
                <Row>
                  <h3 className=" text-light">Hear from Us</h3>
                </Row>
                <Row>
                  <p>
                    Be the first to know about the launch of books of other
                    educational fields and upcoming offers to save your money on
                    them! Rent smart and save smart!
                  </p>
                </Row>

                <Form onSubmit={subscribe}>
                  <Row className="my-2">
                    <Form.Control
                      // value={details.name}
                      onChange={(event) => {
                        setDetails({
                          ...details,
                          name: event.target.value,
                        });
                      }}
                      type="text"
                      required
                      placeholder="Your Name"
                    />
                  </Row>
                  <Row>
                    <Form.Control
                      value={details.email}
                      onChange={(event) =>
                        setDetails({
                          ...details,
                          email: event.target.value,
                        })
                      }
                      type="email"
                      required
                      placeholder="Your E-mail"
                    />
                  </Row>
                  <Row className="my-2">
                    <Button variant="primary" type="submit" block>
                      SUBSCRIBE
                    </Button>
                  </Row>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col className="citations justify-content-center">
                <Image src="https://www.martolex.com/image/support/payments.png" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
