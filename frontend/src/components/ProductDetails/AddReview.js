import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import ReactStars from "react-stars";
import { useParams } from "react-router";
import { BsX as Close } from "react-icons/bs";
import { connect } from "react-redux";
import { post } from "../../utils/requests";
import { bookReviewAPI } from "../../utils/endpoints";
const AddReview = (props) => {
  const { bookId } = useParams();

  const [data, setData] = useState({ bookId });

  const submitReview = () => {
    post(bookReviewAPI, true, data);
    props.addReview({ user: { name: props.userName }, ...data });
    props.closeWindow();
  };
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
      <Button
        onClick={() => props.closeWindow()}
        variant="light"
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        <Close size={25} />
      </Button>
      <Row className="">
        <h4 className="text-center mx-auto">ADD REVIEW</h4>
      </Row>
      <hr className="mt-0" />
      <Row classname="align-items-center">
        <Col md={2}>
          <p className="mt-1" style={{ fontSize: "1.2em" }}>
            Your Rating :
          </p>
        </Col>
        <Col>
          <ReactStars
            className="ratings"
            count={5}
            value={data.rating}
            onChange={(rating) => setData({ ...data, rating })}
            size={30}
            color2={"#ffd700"}
          />
        </Col>
      </Row>
      <Row classname="align-items-center">
        <Col md={2}>
          <p className="mt-1" style={{ fontSize: "1.2em" }}>
            Your Review:
          </p>
        </Col>
        <Col>
          <Form.Control
            onChange={(event) =>
              setData({ ...data, review: event.target.value })
            }
            value={data.review}
            as="textarea"
            rows="3"
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="mx-auto" md={7}>
          <Button onClick={submitReview} block>
            {" "}
            SUBMIT REVIEW
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({ userName: state.user.profile.name });
export default connect(mapStateToProps)(AddReview);
