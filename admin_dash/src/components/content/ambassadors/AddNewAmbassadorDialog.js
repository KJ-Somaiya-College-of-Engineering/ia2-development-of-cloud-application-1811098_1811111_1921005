import React, { useCallback, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import Select from "react-select/async";
import { ambassadorsApi, collegeApi } from "../../../utils/EndPoints";
import { get, post } from "../../../utils/requests";
import _ from "lodash";
const AddNewAmbassadorDialog = (props) => {
  const [data, setData] = useState({
    emailId: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    referralCode: "",
  });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [loading, isLoading] = useState(false);
  const loadColleges = useCallback(
    _.debounce((inputValue, callback) => {
      try {
        get(collegeApi, true, { query: inputValue }).then(([options]) => {
          callback(
            options.map((item) => ({
              value: item.id,
              label: item.name,
            }))
          );
        });
      } catch (err) {
        console.log(err);
      }
    }, 300),
    []
  );
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    validateForm();
    if (form.checkValidity() === false || Object.keys(errors).length > 0) {
      event.stopPropagation();
    } else {
      //   console.log("valid");
      createAmbassador();
    }
    setValidated(true);
  }

  function validateForm() {
    const errors = {};
    if (!data.college) {
      errors.collegeInvalid = true;
    }
    setErrors(errors);
  }

  async function checkIfUserExists() {
    try {
      isLoading(true);
      const [res] = await get(ambassadorsApi.isValidCandidate, true, {
        email: data.emailId,
      });
      setData({ ...data, userId: res.id });
      if (!res.isValid) {
        setErrors({ ...errors, invalidUser: true });
      } else {
        if (errors.invalidUser) {
          const { invalidUser, ...remainingErrors } = errors;
          setErrors(remainingErrors);
        }
      }
      isLoading(false);
    } catch (err) {}
  }

  async function createAmbassador() {
    try {
      const ambassadorParams = {
        emailId: data.emailId,
        collegeId: data.college.value,
        line1: data.line1,
        line2: data.line2,
        city: data.city,
        state: data.state,
        userId: data.userId,
        zip: data.zip,
        referralCode: data.referralCode.toUpperCase(),
      };
      await post(ambassadorsApi.createAmbassador, true, ambassadorParams);
      props.reload();
      props.handleClose();
    } catch (err) {
      alert(err);
    }
  }
  return (
    <Modal size="" centered show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ADD NEW AMBASSADOR</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col xs={10} md={11}>
              <Form.Group controlId="emailId">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  value={data.emailId}
                  required
                  onChange={(event) =>
                    setData({ ...data, emailId: event.target.value })
                  }
                  onBlur={checkIfUserExists}
                />
                {errors.invalidUser && (
                  <p className="text-danger">
                    User does not exist or is already an ambassador
                  </p>
                )}
                <Form.Control.Feedback type="invalid">
                  Enter Valid Email
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="my-auto " xs={2} md={1}>
              {loading && (
                <Spinner variant="info" animation="border" size="sm" />
              )}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="emailId">
                <Form.Label>College</Form.Label>
                <Select
                  placeholder="Select College ..."
                  value={data.college}
                  loadOptions={loadColleges}
                  onChange={(option) => {
                    setData({ ...data, college: option });
                  }}
                />
                {errors.collegeInvalid && (
                  <p className="text-danger">Select a college</p>
                )}
                <Form.Control.Feedback type="invalid">
                  Select a college
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="line1">
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control
                  type="text"
                  value={data.line1}
                  required
                  onChange={(event) =>
                    setData({ ...data, line1: event.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  address is required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="line2">
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control
                  type="text"
                  value={data.line2}
                  required
                  onChange={(event) =>
                    setData({ ...data, line2: event.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  address is required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={data.city}
                  required
                  onChange={(event) =>
                    setData({ ...data, city: event.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  City is Required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  value={data.state}
                  required
                  onChange={(event) =>
                    setData({ ...data, state: event.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  State is required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="pincode">
                <Form.Label>PIN Code</Form.Label>
                <Form.Control
                  type="number"
                  maxLength={6}
                  minLength={6}
                  value={data.zip}
                  required
                  onChange={(event) =>
                    setData({ ...data, zip: event.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  ZIP code is required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="referralCode">
                <Form.Label>referral Code</Form.Label>
                <Form.Control
                  maxLength={6}
                  minLength={6}
                  value={data.referralCode}
                  required
                  onChange={(event) =>
                    setData({ ...data, referralCode: event.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  referralCode is required
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="submit" block variant="success">
                ADD
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            props.handleClose();
          }}
        >
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewAmbassadorDialog;
