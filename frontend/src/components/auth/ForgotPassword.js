import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { authApi } from "../../utils/endpoints";
import { post } from "../../utils/requests";

const ForgotPassword = (props) => {
  const [creds, setCreds] = useState({ email: "" });
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    console.log("here");
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
    } else {
      sendPasswordResetRequest();
    }
  };
  async function sendPasswordResetRequest() {
    try {
      const [res] = await post(authApi.forgotPassword.sendRequest, false, {
        email: creds.email,
      });
      if (res.sent) {
        alert(
          "An email with the reset link has been sent to your email address"
        );
      }
    } catch (err) {
      alert(err);
    }
  }
  return (
    <Container style={{ height: "65vh" }} fluid>
      <Row className="justify-content-center align-items-center h-100">
        <Col md={5}>
          <Card>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="w-100"
              >
                <Row>
                  <Col>
                    <FormGroup>
                      <Form.Label className="lead">Email ID</Form.Label>
                      <Form.Control
                        onChange={({ target: { value: email } }) =>
                          setCreds({ ...creds, email })
                        }
                        value={creds.email}
                        type="email"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Email ID is invalid
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className="text-danger">{props.error}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type="submit" size="lg" block variant="info">
                      GET PASSWORD RESET LINK
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
