import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { returnsApi } from "../../../utils/EndPoints";
import { get, post } from "../../../utils/requests";

const ReturnsPaymentDetails = ({ isOpen, handleClose, itemId }) => {
  const [validated, setValidated] = useState(false);
  const [returnPaymentData, setData] = useState(undefined);
  const [paymentRefs, setPaymentRefs] = useState({
    buyer: { mode: "", refId: "" },
    seller: { mode: "", refId: "" },
  });
  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (isOpen && itemId && itemId !== "")
      getData(returnsApi.returnPaymentDetails(itemId));
  }, [itemId, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("here");
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      completeReturn();
    }
    setValidated(true);
  };

  async function completeReturn() {
    const postData = {
      seller: {
        amount: returnPaymentData.returnToSeller,
        paymentMode: !returnPaymentData.seller.isAdmin
          ? paymentRefs.seller.mode
          : "INTERNAL",
        refId: !returnPaymentData.seller.isAdmin
          ? paymentRefs.seller.refId
          : "INTERNAL",
      },
      buyer: {
        amount: returnPaymentData.returnToBuyer,
        paymentMode: paymentRefs.buyer.mode,
        refId: paymentRefs.buyer.refId,
      },
    };
    try {
      const [data] = await post(
        returnsApi.returnPaymentDetails(itemId),
        true,
        postData
      );
      alert(data.message);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Modal centered show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>RETURN PAYMENT DETAILS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {returnPaymentData ? (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Table bordered>
                  {!returnPaymentData.seller.isAdmin ? (
                    <tr>
                      <th width="40%">SELLER DETAILS</th>
                      <td>
                        <p className="m-0">
                          <b>Name</b> :{returnPaymentData.seller.name}
                        </p>
                        <p className="m-0">
                          <b>Mobile Number</b> :
                          {returnPaymentData.seller.phoneNo}
                          {/* {returnDetails.order.address.phoneNo} */}
                        </p>
                        <p className="m-0">
                          <b>Return Address</b> :
                          {`${returnPaymentData.seller.sellerDetails.line1}, ${returnPaymentData.seller.sellerDetails.line2}, ${returnPaymentData.seller.sellerDetails.city}, ${returnPaymentData.seller.sellerDetails.state}-${returnPaymentData.seller.sellerDetails.zip}`}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <th width="40%">SELLER DETAILS</th>
                      <td>SOLD BY MARTOLEX</td>
                    </tr>
                  )}
                  {!returnPaymentData.seller.isAdmin && (
                    <tr>
                      <th>SELLER BANK DETAILS: </th>
                      <td>
                        <p className="m-0">
                          <b>A/c Holder</b> :{" "}
                          {
                            returnPaymentData.seller.sellerDetails
                              .accountHolderName
                          }
                        </p>

                        <p className="m-0">
                          <b>A/c Number</b> :{" "}
                          {returnPaymentData.seller.sellerDetails.accountNumber}
                        </p>
                        <p className="m-0">
                          <b>IFSC code</b> :{" "}
                          {returnPaymentData.seller.sellerDetails.IFSC.toUpperCase()}
                        </p>
                        <p className="m-0">
                          <b>Bank Name</b> :{" "}
                          {returnPaymentData.seller.sellerDetails.bankName}
                        </p>
                        <p className="m-0">
                          <b>Branch</b> :{" "}
                          {returnPaymentData.seller.sellerDetails.bankBranch}
                        </p>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <th>BUYER RETURN</th>
                    <td>{returnPaymentData.returnToBuyer}/-</td>
                  </tr>
                  <tr>
                    <th>SELLER RETURN</th>
                    <td>{returnPaymentData.returnToSeller}/-</td>
                  </tr>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>PAYMENT DETAILS</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table>
                  <tbody>
                    <tr>
                      {!returnPaymentData.seller.isAdmin && (
                        <td>
                          <Form.Group controlId="sellerpaymentMode">
                            <Form.Label>Seller Payment Mode</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              value={paymentRefs.seller.mode}
                              onChange={(event) =>
                                setPaymentRefs({
                                  ...paymentRefs,
                                  seller: {
                                    ...paymentRefs.seller,
                                    mode: event.target.value,
                                  },
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              payment Mode is Required
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="sellerRefId">
                            <Form.Label>Seller Payment Reference ID</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              value={paymentRefs.seller.refId}
                              onChange={(event) =>
                                setPaymentRefs({
                                  ...paymentRefs,
                                  seller: {
                                    ...paymentRefs.seller,
                                    refId: event.target.value,
                                  },
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Reference ID is Required
                            </Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      )}
                      <td>
                        <Form.Group controlId="buyerpaymentMode">
                          <Form.Label>Buyer Payment Mode</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            value={paymentRefs.buyer.mode}
                            onChange={(event) =>
                              setPaymentRefs({
                                ...paymentRefs,
                                buyer: {
                                  ...paymentRefs.buyer,
                                  mode: event.target.value,
                                },
                              })
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            payment Mode is Required
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="buyerrefId">
                          <Form.Label>Buyer Payment Reference ID</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            value={paymentRefs.buyer.refId}
                            onChange={(event) =>
                              setPaymentRefs({
                                ...paymentRefs,
                                buyer: {
                                  ...paymentRefs.buyer,
                                  refId: event.target.value,
                                },
                              })
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            Reference ID is Required
                          </Form.Control.Feedback>
                        </Form.Group>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col className="text-right">
                <Button variant="primary" type="submit">
                  CONFIRM RETURN
                </Button>
              </Col>
            </Row>
          </Form>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default ReturnsPaymentDetails;
