import React from "react";
import "./bottomNavBarMobile.scss";
import { Container, Col, Row } from "react-bootstrap";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FaBookOpen } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
const BottomNavbarMobile = (props) => {
  const history = useHistory();
  return (
    <Container fluid className="bottom-navbar">
      <Row>
        <Col
          onClick={() => history.push("/")}
          className="justify-content-center"
          sm={3}
          xs={3}
        >
          <AiOutlineHome size={25} />
          <p>Home</p>
        </Col>
        <Col
          onClick={() => history.push("/upload-book")}
          className="justify-content-center"
          sm={3}
          xs={3}
        >
          <FaBookOpen size={25} />
          <p>Sell</p>
        </Col>
        <Col
          className="justify-content-center"
          xs={3}
          sm={3}
          onClick={props.isLoggedIn ? props.openCart : props.openLogin}
        >
          <FiShoppingCart size={25} />
          <p>Cart</p>
        </Col>
        <Col
          onClick={() =>
            props.isLoggedIn ? props.openDashBoard() : props.openLogin()
          }
          className="justify-content-center"
          xs={3}
          sm={3}
        >
          <AiOutlineUser size={25} />
          <p>{props.isLoggedIn ? "Account" : "login"}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default BottomNavbarMobile;
