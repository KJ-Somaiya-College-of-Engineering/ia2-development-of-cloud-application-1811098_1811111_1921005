import React from "react";
import "./overlayLoader.scss";
import { Container, Spinner } from "react-bootstrap";
const overlayLoader = (props) => {
  return (
    <Container
      className="loading-container bg-light"
      style={{ zIndex: 100, ...props.style }}
    >
      <Spinner animation="border" variant="primary" />
    </Container>
  );
};
export default overlayLoader;
