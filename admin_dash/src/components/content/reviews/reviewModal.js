import React from "react";
import { Button, Modal } from "react-bootstrap";

const ReviewModal = (props) => {
  return (
    <Modal centered show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.review && props.review.review}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            props.handleClose();
            props.deleteReview(props.review && props.review.id);
          }}
        >
          DELETE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
