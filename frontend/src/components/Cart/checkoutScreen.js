import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./checkoutScreen.scss";
import OverLay from "../utils/overLay";
import OverLayLoader from "../utils/OverlayLoader";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import cartStats, { itemPrice } from "../../utils/cartStats";
import { fetchAddresses } from "../../redux/actions/addressActions";
import { getDeliveryDate, getDeliveryCost } from "./checkoutUtils";
import AddressCards from "./AddressCards";
import { post } from "../../utils/requests";
import { ordersApi } from "../../utils/endpoints";
import { mapPlanToText } from "../../utils/produtUtils";
import { plans } from "../../utils/enums";
import querystring from "querystring";
const CheckoutScreen = ({ cart, user, ...props }) => {
  const [details, setDetails] = React.useState({
    errors: { termsError: false },
  });
  const [newAddress, setNewAddress] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [orderLoading, setOrderLoading] = React.useState(false);
  const checkoutStats = cartStats(cart);
  const [deliveryCharges, setDeliveryCharges] = useState({});
  React.useEffect(() => {
    (async () => {
      try {
        setOrderLoading(true);
        setDeliveryCharges(await getDeliveryCost(cart));
        setOrderLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const onAddressSelect = (id) => {
    setDetails({ ...details, addressId: id });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!!details.addressId) {
      if (details.termsAgreed) {
        handleTransaction(details);
      } else {
        setDetails({
          ...details,
          errors: { ...details.errors, termsError: true },
        });
        event.stopPropagation();
      }
    } else {
      if (!newAddress) {
        setDetails({
          ...details,
          errors: { ...details.errors, addressError: true },
        });
        alert("Please select an address");
      } else {
        if (form.checkValidity() === false || details.termsAgreed === false) {
          if (!details.termsAgreed) {
            setDetails({
              ...details,
              errors: { ...details.errors, termsError: true },
            });
          }
          event.stopPropagation();
        } else {
          handleTransaction(details);
        }
      }
    }

    setValidated(true);
  };

  const handleAddressSelectError = () =>
    setDetails({
      ...details,
      errors: { ...details.errors, addressError: false },
    });

  const handleTransaction = async (details) => {
    const params = {
      addressId: details.addressId,
      referralCode: details.referralCode,
      address: {
        name: details.name,
        type: "home",
        line1: details.addLine1,
        line2: details.addLine2,
        city: details.city,
        state: details.state,
        zip: details.pincode,
        phoneNo: details.phone,
      },
      deliveryAmount: deliveryCharges.forward + deliveryCharges.return,
      items: cart.map((cartItem) => ({
        qty: cartItem.qty,
        plan: cartItem.plan,
        bookId: cartItem.bookId,
        rent: cartItem.rent,
        deposit: cartItem.plan !== plans.SELL ? cartItem.price : 0,
      })),
    };

    try {
      setOrderLoading(true);
      const [res] = await post(ordersApi.create, true, params);
      console.log(res);
      window.location.href = res.paymentLink;
    } catch (err) {
      alert("something went wrong. Please Try again Later");
    }
    setOrderLoading(false);
  };

  React.useEffect(() => {
    props.syncAddresses();
    const { name, email, phoneNo } = user;
    setDetails({
      ...details,
      name,
      email,
      phone: phoneNo,
    });
  }, [user]);

  React.useEffect(() => {
    if (props.addresses.length === 0) {
      setNewAddress(true);
    } else {
      setNewAddress(false);
    }
  }, [props.addresses]);

  return (
    <Container className="checkout-page p-0" fluid>
      <MetaTags>
        <title>Checkout - Martolex.com</title>
        <meta
          name="description"
          content="Order your books by renting or buying all your College, Entrance Exam and School Books online at cheap price on Martolex.com. "
        />
      </MetaTags>
      {(props.isLoading || orderLoading) && (
        <OverLay>
          <OverLayLoader style={{ position: "absolute", top: "45vh" }} />
        </OverLay>
      )}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="w-100"
      >
        <Row className="w-100 m-0 bg-dark text-white">
          <Col>
            <h1 className="text-white text-center font-weight-light">
              CHECKOUT
            </h1>
          </Col>
        </Row>
        <Row className="px-2 w-100 m-0 my-3 checkout-page">
          <Col md={{ span: 7 }} className="shipping h-50">
            <Row>
              <Col>
                <h1 className="text-dark">BILLING / SHIPPING ADDRESS</h1>
                <hr />
              </Col>
            </Row>

            {newAddress ? (
              <div>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="full-name">
                      <Form.Label>Full Name*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={details.name}
                        onChange={(event) => {
                          setDetails({ ...details, name: event.target.value });
                        }}
                        placeholder="full Name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Name is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="Mobile-Number">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        value={details.phone}
                        minLength={10}
                        maxLength={10}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            mobile: event.target.value,
                          });
                        }}
                        placeholder="Mobile Number"
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter valid mobile number
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="address-line1">
                      <Form.Label>Address line 1*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            addLine1: event.target.value,
                          });
                        }}
                        placeholder="Address line 1"
                      />
                      <Form.Control.Feedback type="invalid">
                        address is required
                      </Form.Control.Feedback>
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
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            addLine2: event.target.value,
                          });
                        }}
                        placeholder="Address line 2"
                      />
                      <Form.Control.Feedback type="invalid">
                        Address is required
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="town">
                      <Form.Label>town / city*</Form.Label>
                      <Form.Control
                        required
                        as="select"
                        onChange={(event) => {
                          setDetails({ ...details, city: event.target.value });
                        }}
                        placeholder="Town / city"
                      >
                        <option value="Mumbai">Mumbai</option>
                        <option value="Navi Mumbai">Navi Mumbai</option>
                        <option value="Pune">Pune</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        Enter valid city name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="state">
                      <Form.Label>State*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        pattern="[a-zA-Z]+"
                        onChange={(event) => {
                          setDetails({ ...details, state: event.target.value });
                        }}
                        placeholder="state"
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter valid state name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="pincode">
                      <Form.Label>PIN Code*</Form.Label>
                      <Form.Control
                        required
                        type="text"
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
                      <Form.Control.Feedback type="invalid">
                        Enter valid Pincode
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="email">
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control
                        required
                        value={details.email}
                        type="text"
                        onChange={(event) => {
                          setDetails({ ...details, email: event.target.value });
                        }}
                        placeholder="Email ID"
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter valid Email
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="order-notes">
                      <Form.Label>Order notes</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            orderNotes: event.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            ) : (
              <div>
                <Row>
                  <h4>Select Address</h4>
                </Row>
                <AddressCards
                  addressError={details.errors.addressError}
                  addresses={props.addresses}
                  onSelect={onAddressSelect}
                  handleAddressSelectError={handleAddressSelectError}
                  addNewAddress={() => {
                    setNewAddress(true);
                    setValidated(false);
                  }}
                />
              </div>
            )}
          </Col>
          <Col md={{ span: 5 }} className="order-details bg-light mt-3 pt-2 ">
            <Row>
              <Col>
                <h3 className="text-center">YOUR ORDER</h3>
                <hr />
              </Col>
            </Row>
            <Row className="headers">
              <Col xs={9} md={9}>
                PRODUCT
              </Col>
              <Col className="total" xs={3} md={3}>
                TOTAL
              </Col>
            </Row>
            {cart.map((cartItem) => (
              <Row className="item" key={cartItem.BookId}>
                <Col xs={9} md={9}>
                  <p className="text-primary">
                    {cartItem.book.name} X {cartItem.qty}
                  </p>
                  <p className="text-primary">{`[ ${mapPlanToText(
                    cartItem.plan
                  )} = ₹ ${cartItem.rent}]`}</p>
                </Col>
                <Col className="total" xs={3} md={3}>
                  &#8377;
                  {` ${cartItem.price}/-`}
                </Col>
              </Row>
            ))}

            <hr />
            <Row className="">
              <Col xs={8} md={9}>
                <b>Amount You pay now</b>
              </Col>
              <Col className="total" xs={4} md={3}>
                &#8377; {`${checkoutStats.totalAmount}/-`}
              </Col>
            </Row>
            <hr />
            <Row className="">
              <Col md={4}>
                <b>REFERAL CODE:</b>
              </Col>
              <Col>
                <Form.Group controlId="referalCode">
                  <Form.Control
                    type="text"
                    pattern="[a-zA-Z0-9]+"
                    maxLength={6}
                    value={details.referralCode}
                    onChange={(event) => {
                      setDetails({
                        ...details,
                        referralCode: event.target.value,
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter valid REFERAL CODE
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row className="">
              <Col xs={8} md={9}>
                <b>Amount Amount Refunded On Return of Books</b>
              </Col>
              <Col className="total" xs={4} md={3}>
                &#8377;{" "}
                {`${checkoutStats.totalAmount - checkoutStats.rentalAmount}/-`}
              </Col>
            </Row>
            <hr />
            <Row className="">
              <Col xs={6} md={8}>
                <b>TOTAL SAVINGS</b>
              </Col>
              <Col className="total" xs={6} md={4}>
                <div className="bg-success text-center text-light font-weight-bold p-2">
                  &#8377;{" "}
                  {`${
                    checkoutStats.totalMrp - checkoutStats.rentalAmount
                  }/- (${(
                    ((checkoutStats.totalMrp - checkoutStats.rentalAmount) /
                      checkoutStats.totalMrp) *
                    100
                  ).toFixed(2)})%`}
                </div>
              </Col>
            </Row>
            <hr />

            <Row className="mb-3">
              <Col>SHIPPING</Col>
            </Row>
            <Row className="mb-1">
              <Col xs={7} md={8}>
                <b>Delivery Shipping</b>
              </Col>
              <Col xs={5} md={4}>
                {`${
                  deliveryCharges.forward !== 0
                    ? "₹ " + deliveryCharges.forward + "/-"
                    : " Free Delivery"
                }`}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col xs={7} md={8}>
                <b>Return Shipping</b>
              </Col>
              <Col xs={5} md={4}>
                {`${
                  deliveryCharges.return !== 0
                    ? "₹ " + deliveryCharges.return + "/-"
                    : " Free Delivery"
                }`}
              </Col>
            </Row>
            <Row className="mb-1">
              <Col xs={7} md={8}>
                <b>Expected Delivery</b>
              </Col>
              <Col xs={5} md={4}>
                {getDeliveryDate()}
              </Col>
            </Row>

            <hr />
            <Row className="item">
              <Col xs={7} md={9}>
                <h4>Grand Total</h4>
              </Col>
              <Col className="total" xs={5} md={3}>
                <h4>
                  &#8377;{" "}
                  {checkoutStats.totalAmount +
                    deliveryCharges.forward +
                    deliveryCharges.return}
                  /-
                </h4>
              </Col>
            </Row>

            <hr />

            <Form.Group controlId="terms accept">
              <Row>
                <Col xs={1} sm={1} md={1}>
                  <Form.Check
                    required
                    onChange={() => {
                      setDetails({
                        ...details,
                        termsAgreed: !details.termsAgreed,
                        errors: {
                          ...details.errors,
                          termsError: !details.termsAgreed
                            ? false
                            : details.errors.termsError,
                        },
                      });
                    }}
                    feedback="You must agree before submitting."
                  />
                </Col>
                <Col>
                  I have read and accept the <a href="/">Rental policy</a> along
                  with the <a href="/">Damage policy</a>
                  {details.errors.termsError && (
                    <p className="text-danger mt-2">
                      You must agree before placing your order.
                    </p>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <hr />

            <Row className="py-2">
              <Col>
                <Button
                  type="submit"
                  name="submit"
                  variant="primary"
                  block
                  className="btn-ripple"
                  size="lg"
                >
                  PAY NOW
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.items,
  user: state.user.profile,
  isLoading: state.addresses.loading,
  addresses: state.addresses.items,
});
const mapDispatchToProps = (dispatch) => ({
  syncAddresses: () => dispatch(fetchAddresses()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
