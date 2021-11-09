import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { ordersApi } from "../../../../utils/EndPoints";
import { orderStatus } from "../../../../utils/enums";
import { post } from "../../../../utils/requests";
const DispatchDialog = ({
  orderId,
  deliveryDates,
  show,
  handleClose,
  ...props
}) => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    min: new Date().toISOString(),
    max: new Date().toISOString(),
  });
  useEffect(() => {
    setData(deliveryDates);
  }, [deliveryDates]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatchOrder();
    }
    setValidated(true);
  };

  async function dispatchOrder() {
    setLoading(true);
    const payLoad = {
      minDate: data.min,
      maxDate: data.max,
      status: orderStatus.SHIPPED,
    };
    try {
      await post(ordersApi.ModifyOrderStatus(orderId), true, payLoad);
      props.reload();
      handleClose();
    } catch (err) {
      alert(err);
    }
    setLoading(false);
    // handleClose();
  }
  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton={!loading}>
        <Modal.Title>Confirm Dispatch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col>
              <h3>Estimated Delivery Dates</h3>
            </Col>
          </Row>
          <Form
            id="date-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mt-3">
              <Col>
                <Form.Group controlId="min-delivery">
                  <Form.Label>Earliest Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={new Date(data.min).toISOString().substring(0, 10)}
                    onChange={(event) =>
                      setData({ ...data, min: event.target.value })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="min-delivery">
                  <Form.Label>Max Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={new Date(data.max).toISOString().substring(0, 10)}
                    onChange={(event) =>
                      setData({ ...data, max: event.target.value })
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    Required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          form="date-form"
          disabled={loading}
          type="submit"
          variant="success"
        >
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              className="mr-2"
              role="status"
              aria-hidden="true"
            />
          )}
          dispatch
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DispatchDialog;
