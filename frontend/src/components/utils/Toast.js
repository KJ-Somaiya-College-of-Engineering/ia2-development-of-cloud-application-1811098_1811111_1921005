import React from "react";
import { Toast } from "react-bootstrap";

export default (props) => {
  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 100 }}>
      <Toast
        onClose={() => props.onClose(false)}
        show={props.isVisible}
        delay={3000}
        autohide
      >
        <Toast.Header className="bg-primary text-light">
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-5">{props.header}</strong>
          <small>Just Now</small>
        </Toast.Header>
        <Toast.Body className="bg-light">{props.body}</Toast.Body>
      </Toast>
    </div>
  );
};
