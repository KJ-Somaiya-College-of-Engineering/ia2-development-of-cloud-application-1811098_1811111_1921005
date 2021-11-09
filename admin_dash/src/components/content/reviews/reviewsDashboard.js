import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { deleteCall, get } from "../../../utils/requests";
import { reviewsApi } from "../../../utils/EndPoints";
import moment from "moment";
import ReviewModal from "./reviewModal";
import Table from "../../../utils/Table";
import IDGen from "../../../utils/IDGen";
const ReviewsDashboard = (props) => {
  const [reviews, setReviews] = useState([]);
  const [viewReview, setCurrReview] = useState({
    isOpen: false,
    review: { id: "", review: "" },
  });
  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setReviews(data);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getData(reviewsApi.getReviews);
  }, []);

  async function deleteReview(id) {
    const confirmation = window.confirm("are you sure ? ");
    if (confirmation) {
      try {
        await deleteCall(reviewsApi.delete, true, { id });
        setReviews([...reviews.filter((review) => review.id !== id)]);
      } catch (err) {}
    }
  }
  function openReview(id) {
    setCurrReview({
      isOpen: true,
      review: reviews.find((review) => review.id === id),
    });
  }
  const headerCols = [
    "REVIEW ID",
    "BOOK",
    "RATING",
    "REVIEW",
    "POSTED BY",
    "DATE/TIME",
    "DELETE",
  ];
  const renderRow = (review) => [
    IDGen(review.id),
    review.book.name,
    review.rating,
    <Button variant="info" onClick={() => openReview(review.id)}>
      View Review
    </Button>,
    review.user.name,
    moment(review.createdAt).fromNow(),
    <Button onClick={() => deleteReview(review.id)} variant="danger">
      Delete
    </Button>,
  ];
  return (
    <Container className="mt-4" fluid>
      <ReviewModal
        show={viewReview.isOpen}
        review={viewReview.review}
        handleClose={() => setCurrReview({ isOpen: false })}
        deleteReview={deleteReview}
      />
      <Row className="justify-content-center">
        <Col>
          <div style={{ border: "1px solid #eee" }}>
            <Table
              data={reviews}
              keyExtractor={(review) => review.id}
              headerCols={headerCols}
              renderRow={renderRow}
              renderEmpty={() => (
                <h2 className="w-100 text-center display-4">No Reviews</h2>
              )}
              selectable={false}
            />
          </div>
        </Col>
      </Row>
      <Row className="pagination justify-content-center mt-3 p-0">
        <Col md={3} className="p-0 m-0">
          <Row className="p-0 m-0">
            <Col onClick={() => {}} className="button">
              <BsChevronLeft size={20} />
            </Col>
            <Col className="button pageNum">
              <span style={{ fontSize: "1.3em" }}>{1}</span>
            </Col>
            <Col onClick={() => {}} className="button m-0">
              <BsChevronRight size={20} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewsDashboard;
