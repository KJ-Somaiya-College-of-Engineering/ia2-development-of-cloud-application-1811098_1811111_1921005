import React, { useState } from "react";
import { Card, Col, Row, Form } from "react-bootstrap";
import IDGen from "../../../../utils/IDGen";
import moment from "moment";
import { FaPen, FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { post } from "../../../../utils/requests";
import { ordersApi } from "../../../../utils/EndPoints";
const OrderSummaryCard = ({ order, ...props }) => {
  const [deliveryDateEditingMode, setDeliveryDateEditingMode] = useState(false);
  const [deliveryDates, setDeliveryDates] = useState({});
  async function modifyDeliveryDates() {
    try {
      await post(ordersApi.modifyDeliveryDates(order.id), true, deliveryDates);
      props.orderModifier({
        ...order,
        deliveryMinDate: deliveryDates.deliveryMinDate,
        deliveryMaxDate: deliveryDates.deliveryMaxDate,
      });
      setDeliveryDateEditingMode(false);
    } catch (err) {
      alert(err);
    }
  }
  React.useEffect(() => {
    setDeliveryDates({
      deliveryMinDate: order.deliveryMinDate,
      deliveryMaxDate: order.deliveryMaxDate,
    });
  }, [order.deliveryMinDate, order.deliveryMaxDate]);

  return (
    <Card style={{ height: "100%" }}>
      <Card.Header>
        <b>ORDER SUMMARY</b>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={3}>
            <b>Order #:</b>
          </Col>
          <Col>{IDGen(order.id)}</Col>
        </Row>
        <Row>
          <Col xs={3}>
            <b>Order Date:</b>
          </Col>
          <Col>{moment(order.createdAt).format("DD-MM-YYYY")}</Col>
        </Row>

        <Row>
          <Col xs={3}>
            <b>Order Total:</b>
          </Col>
          <Col>₹ {order.totalAmount}/-</Col>
        </Row>
        <Row>
          <Col xs={3}>
            <b>Delivery Date: </b>
          </Col>
          <Col className="align-items-center">
            {order.actualDeliveryDate ? (
              <Row>
                <Col>
                  <span className="mr-3">
                    {moment(order.actualDeliveryDate).format("DD-MM-YYYY")}
                  </span>
                </Col>
              </Row>
            ) : (
              <Row>
                {deliveryDateEditingMode ? (
                  <Col md={10}>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="min-delivery">
                          <Form.Control
                            type="date"
                            required
                            placeholder="min Delivery date"
                            value={new Date(deliveryDates.deliveryMinDate)
                              .toISOString()
                              .substring(0, 10)}
                            onChange={(event) =>
                              setDeliveryDates({
                                ...deliveryDates,
                                deliveryMinDate: event.target.value,
                              })
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Required
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="max-delivery">
                          <Form.Control
                            type="date"
                            required
                            placeholder="max delivery date"
                            value={new Date(deliveryDates.deliveryMaxDate)
                              .toISOString()
                              .substring(0, 10)}
                            onChange={(event) =>
                              setDeliveryDates({
                                ...deliveryDates,
                                deliveryMaxDate: event.target.value,
                              })
                            }
                          />

                          <Form.Control.Feedback type="invalid">
                            Required
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                ) : (
                  <Col md={7}>
                    <span>{`${moment(order.deliveryMinDate).format(
                      "DD-MM-YYYY"
                    )} - ${moment(order.deliveryMaxDate).format(
                      "DD-MM-YYYY"
                    )}`}</span>
                  </Col>
                )}

                <Col>
                  {!deliveryDateEditingMode ? (
                    <FaPen
                      onClick={() => setDeliveryDateEditingMode(true)}
                      className="text-danger"
                    />
                  ) : (
                    <Row>
                      <FaCheck
                        size={20}
                        onClick={() => modifyDeliveryDates()}
                        className="text-success mr-2 mt-2"
                      />
                      <MdClose
                        size={25}
                        onClick={() => setDeliveryDateEditingMode(false)}
                        className="text-danger mt-1"
                      />
                    </Row>
                  )}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <b>Delivery charge: </b>
          </Col>
          <Col>{`₹ ${order.deliveryAmount}/-`}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrderSummaryCard;
