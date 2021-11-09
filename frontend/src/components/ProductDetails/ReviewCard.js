import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import ReactStars from "react-stars";
import Avatar from "react-avatar";
const ReviewCard = ({ review }) => {
  return (
    <Container
      style={{
        border: "1px solid #eee",
        backgroundColor: "",
        borderRadius: 5,
      }}
      fluid
      className=" py-2 mb-3"
    >
      <Row>
        <Col className="reviewer-name">
          <Avatar
            size={50}
            round
            color="#3ac6bf"
            maxInitials={2}
            name={review.user.name}
            fgColor="#333"
            textSizeRatio={1.8}
          />
          <h3>{review.user.name}</h3>
        </Col>
      </Row>
      <Row className="align-items-center rating-row">
        <Col className="d-flex align-items-center">
          <span>Rating:</span>
          {"  "}
          <ReactStars
            className="ratings"
            count={5}
            edit={false}
            value={review.rating}
            size={25}
            color2={"#ffd700"}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{review.review}</p>
        </Col>
      </Row>
    </Container>
  );
};
export default ReviewCard;
