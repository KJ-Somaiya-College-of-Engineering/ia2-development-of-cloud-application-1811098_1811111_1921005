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
import { useHistory } from "react-router";
import { authApi } from "../../utils/endpoints";
import { post } from "../../utils/requests";
import OverlayLoader from "../utils/OverlayLoader";

const PasswordReset = (props) => {
  const history = useHistory();
  const [creds, setCreds] = useState({ password: "", confPassword: "" });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, isTokenValid] = useState(false);
  const handleSubmit = (event) => {
    console.log("here");
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.stopPropagation();
    } else if (creds.confPassword != creds.password) {
      setError("passwords do not match");
    } else {
      setError("");
      changePassword();
    }
  };

  React.useEffect(() => {
    async function checkTokenValidity() {
      try {
        const [res] = await post(authApi.forgotPassword.verifyRequest, false, {
          token: props.match.params.token,
        });

        isTokenValid(res.valid);
      } catch (err) {
        alert(err);
        history.push("/");
      }
    }
    checkTokenValidity();
  }, []);

  async function changePassword() {
    try {
      const payload = {
        token: props.match.params.token,
        password: creds.password,
      };
      const [res] = await post(
        authApi.forgotPassword.resetPassword,
        false,
        payload
      );
      if (res.success) {
        alert("password changed");
        history.push("/");
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError(err);
    }
  }

  return (
    <Container style={{ height: "65vh" }} fluid>
      {tokenValid ? (
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
                        <Form.Label className="lead">Password</Form.Label>
                        <Form.Control
                          onChange={({ target: { value: password } }) =>
                            setCreds({ ...creds, password })
                          }
                          value={creds.password}
                          type="password"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Password is required
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Form.Label className="lead">
                          Confirm password
                        </Form.Label>
                        <Form.Control
                          onChange={({ target: { value: confPassword } }) =>
                            setCreds({ ...creds, confPassword })
                          }
                          value={creds.confPassword}
                          type="password"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Password confirm is required
                        </Form.Control.Feedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className="text-danger">{error}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button type="submit" size="lg" block variant="info">
                        CHANGE PASSWORD
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <OverlayLoader />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
