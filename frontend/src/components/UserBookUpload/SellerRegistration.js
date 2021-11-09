import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { getBankFromIFSC, userProfileApi } from "../../utils/endpoints";
import OverLay from "../utils/overLay";
import OverlayLoader from "../utils/OverlayLoader";
import { deliveryLocations } from "../../utils/deliveryLocations";
import Select from "react-select";
import { post } from "../../utils/requests";
import { makeSeller } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

const SellerRegistration = (props) => {
  const history = useHistory();
  const [details, setDetails] = useState({ state: "Maharashtra" });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [formValidated, setValidated] = useState(false);
  async function FetchIFSCDetails() {
    setLoading(true);
    try {
      const bankDetails = await getBankFromIFSC(details.ifsc);
      console.log(bankDetails);
      setDetails({
        ...details,
        bankName: bankDetails.BANK,
        bankBranch: `${bankDetails.BRANCH}, ${bankDetails.CITY}`,
      });
      if (errors.ifsc) {
        setErrors({ ...errors, ifsc: false });
      }
    } catch (err) {
      setErrors({ ...errors, ifsc: true });
    }
    setLoading(false);
  }

  const validateForm = () => {
    const errors = {};

    if (details.accNumber !== details.confAccNumber) {
      errors.accInvalid = true;
    }

    if (!details.addLine1 || details.addLine1.length === 0) {
      errors.addLine1 = true;
    }
    if (!details.addLine2 || details.addLine2.length === 0) {
      errors.addLine2 = true;
    }
    if (!details.city || details.city.length === 0) {
      errors.city = true;
    }
    if (!details.state || details.state.length === 0) {
      errors.state = true;
    }
    if (!details.pincode || details.pincode.length !== 6) {
      errors.pincode = true;
    }
    return errors;
  };
  if (props.isSeller) {
    return <Redirect to="/upload-book" />;
  }

  const submitForm = (event) => {
    if (!details.bankName) {
      FetchIFSCDetails(details.ifsc);
    }
    event.preventDefault();
    const form = event.currentTarget;
    const errors = validateForm();
    setErrors(errors);
    setValidated(true);
    if (form.checkValidity() === false || Object.keys(errors).length > 0) {
      alert("There are errors in your form");
      event.stopPropagation();
      return;
    } else {
      makeSeller();
    }
    setValidated(true);

    console.log("processing");
  };

  async function makeSeller() {
    setLoading(true);
    try {
      const postData = {
        accountNumber: details.accNumber,
        accountHolderName: details.accHolderName,
        IFSC: details.ifsc,
        bankName: details.bankName,
        bankBranch: details.bankBranch,
        line1: details.addLine1,
        line2: details.addLine2,
        city: details.city.value,
        state: details.state,
        zip: details.pincode,
      };

      const [res] = await post(userProfileApi.registerAsSeller, true, postData);
      props.makeSeller();
      history.push("/upload-book");
      console.log(postData);
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  }

  return (
    <Container fluid className="my-4">
      {isLoading && (
        <OverLay style={{ position: "fixed", top: 0, left: 0 }}>
          <OverlayLoader style={{ position: "absolute", top: "45vh" }} />
        </OverLay>
      )}
      <Row className="justify-content-center">
        <Col style={{ borderRadius: 5 }} md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center py-2 mb-0">Register as seller</h3>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <h4 className>BANK DETAILS</h4>
                </Col>
                <Col>
                  <p>
                    We'll use these to send out payments to you whenever your
                    book is sold
                  </p>
                </Col>
              </Row>
              <Form noValidate validated={formValidated} onSubmit={submitForm}>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="seller-acc-holder">
                      <Form.Label>Account Holder Name *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={details.accHolderName}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            accHolderName: event.target.value,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        account holder name is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="seller-acc">
                      <Form.Label>Account Number *</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        pattern="[0-9]+"
                        value={details.accNumber}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            accNumber: event.target.value,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter valid Account number
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="seller-acc-conf">
                      <Form.Label>Confirm Account Number *</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        pattern="[0-9]+"
                        value={details.confAccNumber}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            confAccNumber: event.target.value,
                          });
                        }}
                      />
                      {errors.accInvalid ? (
                        <p className=" error text-danger">
                          account numbers do not match
                        </p>
                      ) : (
                        <Form.Control.Feedback type="invalid">
                          Account number does not match
                        </Form.Control.Feedback>
                      )}
                      <Form.Control.Feedback type="invalid">
                        Account number does not match
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="seller-acc-ifsc">
                      <Form.Label>IFSC Code *</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        pattern="^[A-Za-z]{4}[0-9]{7}$"
                        value={details.ifsc}
                        onBlur={FetchIFSCDetails}
                        isInvalid={errors.ifsc}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            ifsc: event.target.value,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter valid IFSC
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="seller-acc-bank">
                      <Form.Label>Bank Name *</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        readOnly
                        pattern="^[A-Za-z]{4}[0-9]{7}$"
                        value={details.bankName}
                      />
                      <Form.Control.Feedback type="invalid">
                        Bank Name is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="seller-acc-bank-branch">
                      <Form.Label>Bank Branch *</Form.Label>
                      <Form.Control
                        required
                        readOnly
                        type="tel"
                        pattern="^[A-Za-z]{4}[0-9]{7}$"
                        value={details.bankBranch}
                      />
                      <Form.Control.Feedback type="invalid">
                        Bank branch is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <h4 className>PICKUP ADDRESS</h4>
                  </Col>
                  <Col>
                    <p>We'll pick up the books from this address</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="address-line1">
                      <Form.Label>Address line 1*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={details.addLine1}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            addLine1: event.target.value,
                          });
                        }}
                        placeholder="Address line 1"
                      />
                      {errors.addLine1 && (
                        <p className=" error text-danger">
                          Address is required
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="address-line2">
                      <Form.Label>Address line 2*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={details.addLine2}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            addLine2: event.target.value,
                          });
                        }}
                        placeholder="Address line 2"
                      />
                      {errors.addLine2 && (
                        <p className=" error text-danger">
                          address is required
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} xs={12}>
                    <Form.Group controlId="town">
                      <Form.Label>town / city*</Form.Label>
                      <Select
                        className="mb-0"
                        value={details.city}
                        onChange={(inputValue) => {
                          setDetails({
                            ...details,
                            city: inputValue,
                            state: "Maharashtra",
                          });
                        }}
                        options={deliveryLocations}
                        placeholder="city"
                      />
                      {errors.city && (
                        <p className=" error text-danger">city is required</p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={4} xs={12}>
                    <Form.Group controlId="state">
                      <Form.Label>State *</Form.Label>
                      <Form.Control
                        required
                        value={details.state}
                        readOnly
                        pattern="[a-zA-Z]+"
                        onChange={(event) => {
                          setDetails({ ...details, state: event.target.value });
                        }}
                        placeholder="state"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4} xs={12}>
                    <Form.Group controlId="pincode">
                      <Form.Label>PIN Code*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={details.pincode}
                        maxLength={6}
                        minLength={6}
                        pattern="[1-9][0-9]+"
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            pincode: event.target.value,
                          });
                        }}
                        placeholder="PIN Code"
                      />
                      {errors.pincode && (
                        <p className=" error text-danger">
                          Enter valid pincode
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Col md={6} className=" mt-4 mx-auto">
                  <Button type="submit" block>
                    SUBMIT
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  makeSeller: () => dispatch(makeSeller()),
});

const mapStateToProps = (state) => ({ isSeller: state.user.profile.isSeller });
export default connect(mapStateToProps, mapDispatchToProps)(SellerRegistration);
