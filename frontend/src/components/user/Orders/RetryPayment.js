import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import propTypes from "prop-types";
import { post } from "../../../utils/requests";
import { ordersApi } from "../../../utils/endpoints";
const RetryPayment = ({ orderId, ...props }) => {
  const [isLoading, setLoading] = useState(false);
  async function retryPayment() {
    try {
      setLoading(true);
      const [res] = await post(ordersApi.retryPayment, true, { orderId });
      setLoading(false);
      window.location.href = res.paymentLink;
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  }
  return (
    <Button
      disabled={isLoading}
      onClick={retryPayment}
      variant="warning"
      block={props.block}
      className="d-flex align-items-center justify-content-center"
    >
      RETRY PAYMENT
      {isLoading && (
        <Spinner animation="border" size="sm" className="ml-1 mt-1" />
      )}
    </Button>
  );
};

RetryPayment.propTypes = {
  block: propTypes.bool,
  orderId: propTypes.string,
};

export default RetryPayment;
