import React, { useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Overlay from "../../utils/overLay";
import OverLayLoader from "../../utils/OverlayLoader";
import { get } from "../../../utils/requests";
import { ordersApi } from "../../../utils/endpoints";
import OrderCard from "./OrderCard";
import ReturnBookModal from "./ReturnBookModal";
import { Link } from "react-router-dom";
const UserOrders = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [returns, setReturnData] = useState({ visible: false });
  async function getData() {
    try {
      setLoading(true);
      const [userOrders] = await get(ordersApi.getOrders, true);
      setOrders(userOrders);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  }
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      {isLoading && (
        <Overlay style={{ position: "fixed", top: 0, left: 0 }}>
          <OverLayLoader />
        </Overlay>
      )}
      <ReturnBookModal
        show={returns.visible}
        itemDetails={returns}
        onHide={() => {
          setReturnData({ ...returns, visible: false });
        }}
        refreshOrders={getData}
      />
      <Row>
        <Col>
          <h2 className="text-dark font-weight-normal pt-4">Orders</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col className="p-0">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard
                refreshOrders={getData}
                returnBook={(itemId) => {
                  setReturnData({ visible: true, itemId, orderId: order.id });
                }}
                key={order.id}
                order={order}
              />
            ))
          ) : (
            <Container className="text-center justify-content-center">
              <Row className="text-center justify-content-center py-3 pb-5">
                <Col md={4} xs={9}>
                  <Image width="100%" src="/emptyOrders.svg" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2>No Orders</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="lead">Go find the books you like</p>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md={3} className="mb-3">
                  <Button as={Link} to="/" className="btn-link text-dark" block>
                    FIND BOOKS
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrders;
