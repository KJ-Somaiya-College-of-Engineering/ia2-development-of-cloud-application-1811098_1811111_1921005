import React from "react";
import { Container } from "react-bootstrap";
import "./overlay.scss";

const OverLay = (props) => (
  <Container fluid style={props.style} className="overlay">
    {props.children}
  </Container>
);
export default OverLay;
