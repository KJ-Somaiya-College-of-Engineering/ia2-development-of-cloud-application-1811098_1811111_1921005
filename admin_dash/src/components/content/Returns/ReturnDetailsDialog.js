import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { returnsApi } from "../../../utils/EndPoints";
import { get } from "../../../utils/requests";
import moment from "moment";
import { returnStates } from "../../../utils/enums";
const ReturnDetailsDialog = ({
  isOpen,
  handleClose,
  openPaymentDetails,
  itemId,
}) => {
  const [returnDetails, setReturnDetails] = useState(undefined);

  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setReturnDetails(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (itemId && itemId !== "") {
      getData(returnsApi.getReturnDetails(itemId));
    }
  }, [itemId]);
  return (
    <Modal size="lg" centered show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Return Request Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              {returnDetails ? (
                <Table bordered>
                  <tbody>
                    <tr>
                      <th width="30%">ORDER ID</th>
                      <td>{returnDetails.order.id}</td>
                    </tr>
                    <tr>
                      <th>CUSTOMER DETAILS</th>
                      <td>
                        <p className="m-0">
                          <b>Name</b> : {returnDetails.order.address.name}
                        </p>
                        <p className="m-0">
                          <b>Mobile Number</b> :{" "}
                          {returnDetails.order.address.phoneNo}
                        </p>
                        <p className="m-0">
                          <b>Pickup Address</b> :{" "}
                          {`${returnDetails.order.address.line1}, ${returnDetails.order.address.line2}, ${returnDetails.order.address.city}, ${returnDetails.order.address.state}-${returnDetails.order.address.zip}`}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>BOOK DETAILS</th>
                      <td>
                        <p className="m-0">
                          <b>Book Name</b> : {returnDetails.book.name}
                        </p>
                        <p className="m-0">
                          <b>Author</b> : {returnDetails.book.author}
                        </p>
                        <p className="m-0">
                          <b>Publisher</b> :{returnDetails.book.publisher}
                        </p>
                        <p className="m-0">
                          <b>Edition</b> : {returnDetails.book.edition}
                        </p>
                        <p className="m-0">
                          <b>ISBN</b> : {returnDetails.book.isbn}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>MAX RETURN DATE</th>
                      <td>
                        {moment(returnDetails.returnDate).format("DD-MM-YYYY")}
                      </td>
                    </tr>
                    <tr>
                      <th>RETURN REQUEST DATE</th>
                      <td>
                        {moment(returnDetails.returnRequestDate).format(
                          "DD-MM-YYYY"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>RETURN PICKUP DATE</th>
                      <td>
                        {moment(returnDetails.returnRequestDate)
                          .add(7, "days")
                          .format("DD-MM-YYYY")}
                      </td>
                    </tr>
                    {returnDetails.isReturned === returnStates.RETURNED && (
                      <tr>
                        <th>RETURN TRANSACTION DETAILS</th>
                        <td>
                          <Table>
                            {returnDetails.payments.map((payment) => (
                              <tr>
                                <th>{payment.receiverType.toUpperCase()}</th>
                                <td>
                                  <p className="m-0">
                                    <b>Paid To </b> :{" "}
                                    {payment.paidTo.isAdmin
                                      ? "Martolex " +
                                        "(" +
                                        payment.paidTo.name +
                                        ")"
                                      : payment.paidTo.name}
                                  </p>
                                  <p className="m-0">
                                    <b>Payment Mode </b> : {payment.paymentMode}
                                  </p>
                                  <p className="m-0">
                                    <b>Payment Ref ID</b> :{" "}
                                    {payment.paymentRefId}
                                  </p>
                                  <p className="m-0">
                                    <b>Amount</b> : Rs.{payment.amount}/-
                                  </p>
                                </td>
                              </tr>
                            ))}
                            {/* <tr>
                              <th>SELLER</th>
                              <td>
                                <p className="m-0">
                                  <b>Paid To: </b> : {"Deepanshu"}
                                </p>
                                <p className="m-0">
                                  <b>Payment Mode </b> : google pay
                                </p>
                                <p className="m-0">
                                  <b>Payment Ref ID</b> : dfdf4545eft55
                                </p>
                              </td>
                            </tr> */}
                          </Table>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              ) : null}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          CLOSE
        </Button>
        {returnDetails?.isReturned === returnStates.RETURN_REQUESTED && (
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              openPaymentDetails(itemId);
            }}
          >
            ACCEPT RETURN
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ReturnDetailsDialog;
