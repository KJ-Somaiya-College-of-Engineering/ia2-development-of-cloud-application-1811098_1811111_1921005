import React, { useState } from "react";

import { Container, Col, Row, Form, Button, Spinner } from "react-bootstrap";
import "./Login.scss";
import RightContainer from "../utils/RightContainer";
import { loginUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { getCart } from "../../redux/actions/CartActions";
import { Link } from "react-router-dom";
import GoogleSignIn from "./GoogleSigIn";
const Login = (props) => {
  const [validated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const { auth, closeLogin } = props;
  React.useEffect(() => {
    if (auth === true) {
      closeLogin();
    }
  }, [auth, closeLogin]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      props.login(email, password);
      props.syncCart();
      if (props.auth) {
        props.closeLogin();
      }
    }
  };

  return (
    <RightContainer
      title="Login / SignUp "
      isOpen={props.isOpen}
      close={props.closeLogin}
    >
      <Form
        className="p-3 w-100"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col>
            <Form.Group controlId="validationCustom01">
              <Form.Label>Registered Email Id</Form.Label>
              <Form.Control
                required
                type="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                placeholder="enter your registered email ID "
              />

              <Form.Control.Feedback type="invalid">
                Enter valid Email
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="validationCustom02">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
                placeholder="enter your password "
              />

              <Form.Control.Feedback type="invalid">
                Enter valid Password
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {props.error && <p class="text-danger">{props.error}</p>}
        <Row>
          <Col>
            <Button className="text-light" block type="submit">
              LOGIN
            </Button>
          </Col>
        </Row>

        <Row>
          <Col className="text-right" xs={12}>
            <Link onClick={props.closeLogin} to="/forgot-password">
              forgot password?
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className="mt-5">
            <GoogleSignIn closeLogin={closeLogin} theme="dark" />
          </Col>
        </Row>
        <Row className="mt-2 text-center">
          <Col xs={12}>Do not have a account yet?</Col>
          <Col xs={12}>
            <Link onClick={props.closeLogin} to="/signup">
              SIGN UP
            </Link>
          </Col>
        </Row>
      </Form>

      {props.isLoading && (
        <Container className="loading-container">
          <Spinner animation="border" variant="primary" />
        </Container>
      )}
    </RightContainer>
  );
};
const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => {
    dispatch(loginUser(email, password));
  },
  syncCart: () => {
    dispatch(getCart());
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
  auth: state.user.auth,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
