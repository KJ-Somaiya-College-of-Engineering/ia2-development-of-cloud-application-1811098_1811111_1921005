import React, { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { SellerBooksApi } from "../../../utils/endpoints";
import { get } from "../../../utils/requests";
import { MdCancel } from "react-icons/md";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
const BookOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const [res] = await get(
          SellerBooksApi.getOrdersByBook(props.match.params.BookId),
          true
        );
        const { ordered, ...book } = res;
        setOrders(ordered);
        setBook(book);
      } catch (err) {
        alert(err);
      }
      setLoading(false);
    }
    getData();
  }, [props.match.params.BookId]);
  console.log(orders);
  return (
    <Container className="mx-0 p-0" fluid>
      <Row className="my-3 mx-1">
        <Col>
          <h3>Orders for {book.name}</h3>
        </Col>
      </Row>
      <Row className="mx-0">
        <Col className="w-100 p-0">
          <div style={{ border: "1px solid #eee" }}>
            <Table hover responsive>
              <thead className="bg-primary">
                <tr>
                  <th>CUSTOMER NAME</th>
                  <th>ADDRESS</th>
                  <th>PHONE NUMBER</th>
                  <th>ORDER DATE</th>
                  <th>PLAN</th>
                  <th>RETURN DATE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              {orders.length > 0 ? (
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.order.address.name}</td>
                      <td width="25%">{`${order.order.address.line1},${order.order.address.line2},${order.order.address.city},${order.order.address.state}-${order.order.address.zip}`}</td>
                      <td>{order.order.address.phoneNo}</td>
                      <td>{moment(order.createdAt).format("DD-MM-YYYY")}</td>
                      <td>{order.plan}</td>
                      <td>{moment(order.returnDate).format("DD-MM-YYYY")}</td>
                      <td width="10%">
                        <Row>
                          <Button className="mr-2" variant="success">
                            <FaCheck size={22} />
                          </Button>
                          <Button variant="danger">
                            <MdCancel size={22} />
                          </Button>
                        </Row>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tr>
                  <td colspan="100%">
                    <h2 className="w-100 text-center display-4">No Orders</h2>
                  </td>
                </tr>
              )}
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo((props) => <BookOrders {...props} />);
