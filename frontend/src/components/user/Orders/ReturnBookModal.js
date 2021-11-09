import React, { useState } from "react";
import { Modal, Button, Container, Row } from "react-bootstrap";
import { get, post } from "../../../utils/requests";
import { ordersApi } from "../../../utils/endpoints";
import OverlayLoader from "../../utils/OverlayLoader";

const ReturnBookModal = ({
  itemDetails: { itemId, orderId },
  refreshOrders,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({});
  async function getAddress(orderId) {
    try {
      setLoading(true);
      const [orderAddress] = await get(ordersApi.getOrderAddress, true, {
        orderId,
      });
      setAddress(orderAddress);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  }
  React.useEffect(() => {
    if (orderId) {
      getAddress(orderId);
    }
  }, [orderId]);

  async function confirmReturn() {
    try {
      setLoading(true);
      await post(ordersApi.returnItem(itemId));
      props.onHide();
      refreshOrders();
      alert("return request successfull");
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Return Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to return the book ?</h4>
        <p>
          Your book will be picked up from the same address to which it was
          delivered.
        </p>
        {!loading ? (
          <div>
            <Container>
              <p classMame="my-0">
                <b>Pick up address : </b>
              </p>

              <p className="m-0">{address.name} </p>
              <p className="m-0">{address.line1}</p>
              <p className="m-0">{address.line2}</p>
              <p className="m-0">{address.city}</p>
              <p className="m-0">
                {address.state} - {address.zip}
              </p>
            </Container>
          </div>
        ) : (
          <OverlayLoader />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Button variant="success" onClick={confirmReturn}>
            CONFIRM RETURN
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default ReturnBookModal;
