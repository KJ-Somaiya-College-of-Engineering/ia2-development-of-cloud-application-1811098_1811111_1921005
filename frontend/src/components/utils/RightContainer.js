import React from "react";

import "./rightContainer.scss";

import { Col, Row } from "react-bootstrap";
import OverLay from "./overLay";
import { FiArrowRight } from "react-icons/fi";

const RightContainer = (props) => {
  const animation = props.isOpen
    ? { visibility: "visible", opacity: 1 }
    : { visibility: "hidden", opacity: 0 };

  const menuAnimation = props.isOpen
    ? { visibility: "visible", right: 0 }
    : { visibility: "hidden", right: -500 };
  return (
    <OverLay style={animation}>
      <Col
        style={{ ...menuAnimation }}
        className={`bg-white p-0 h-100 right-container ${props.className}`}
        md={3}
        sm={4}
        xs={9}
      >
        <Row onClick={props.close} className="back-arrow w-100 m-0">
          <FiArrowRight size={30} color="white" />
        </Row>

        <Row className="top-label text-light w-100 m-0">{props.title}</Row>
        <Row className="w-100 m-0">{props.children}</Row>
      </Col>
    </OverLay>
  );
};
export default RightContainer;
