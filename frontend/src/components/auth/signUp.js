import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./signUp.scss";
import OverLay from "../utils/overLay";
import OverlayLoader from "../utils/OverlayLoader";
import { post } from "../../utils/requests";
import { authApi } from "../../utils/endpoints";

const SignUp = (props) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setloading] = useState(false);
  const [data, setData] = useState({});
  async function signUp() {
    setloading(true);
    try {
      const postData = {
        name: data.fname + " " + data.lname,
        phone: data.phone,
        email: data.email,
        password: data.password,
      };
      const [res] = await post(authApi.signUp, false, postData);
      setloading(false);
      alert(res.message);
    } catch (err) {
      setloading(false);
      alert(err);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || data.password !== data.confPassword) {
      if (data.password !== data.confPassword) {
        alert("passwords do not match");
      }
      event.stopPropagation();
    } else {
      signUp();
    }
    setValidated(true);
  };
  return (
    <Container className="parent-container">
      {isLoading && (
        <OverLay style={{ position: "fixed", top: 0, left: 0 }}>
          <OverlayLoader />
        </OverLay>
      )}
      <Row className="container-row">
        <Col className="signup-containers left" md={6}>
          <Image src="/reading-corner-colour.svg" width={"90%"} />
        </Col>
        <Col className="signup-containers right" md={6}>
          <Container>
            <Row>
              <h1>Sign Up </h1>
            </Row>
            <Row>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="first-name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        onChange={(event) => {
                          setData({ ...data, fname: event.target.value });
                        }}
                        placeholder="First Name"
                      />
                      <Form.Control.Feedback type="invalid">
                        first Name is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="last-name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        onChange={(event) => {
                          setData({ ...data, lname: event.target.value });
                        }}
                        placeholder="Last Name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Last Name is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        onChange={(event) => {
                          setData({ ...data, email: event.target.value });
                        }}
                        placeholder="Email ID"
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter valid Email
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="Mobile-Number">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        minLength={10}
                        maxLength={10}
                        pattern="[789]+[0-9]+"
                        onChange={(event) => {
                          setData({ ...data, phone: event.target.value });
                        }}
                        placeholder="Mobile Number"
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter valid Mobile Number
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} xs={12}>
                    <Form.Group md={6} controlId="password">
                      <Form.Label>password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        minLength={8}
                        onChange={(event) => {
                          setData({ ...data, password: event.target.value });
                        }}
                        placeholder="password"
                      />

                      <Form.Control.Feedback type="invalid">
                        Password should contain Minimum eight characters
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="conf-password">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        onChange={(event) => {
                          setData({
                            ...data,
                            confPassword: event.target.value,
                          });
                        }}
                        placeholder="Confirm Password"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type="submit" variant="dark" block>
                      SIGN UP
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
