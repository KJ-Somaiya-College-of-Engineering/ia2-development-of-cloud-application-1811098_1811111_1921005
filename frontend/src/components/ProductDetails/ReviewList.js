import React from "react";
import ReviewCard from "./ReviewCard";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import AddReview from "./AddReview";

const ReviewList = ({ reviews, ...props }) => {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    setList(reviews);
  }, [reviews]);
  const [reviewPageVisible, showReviewPage] = React.useState(false);
  const addNewReview = (review) => setList([...list, review]);
  return (
    <Row className="mb-3 px-2">
      <Row className="w-100 row-header-box">
        <h2 className="row-header">REVIEWS</h2>
      </Row>
      <Col md={7} className="mx-auto p-2">
        {!reviewPageVisible ? (
          <div>
            {props.isLoggedIn && (
              <Button
                block
                onClick={() => showReviewPage(true)}
                className="my-2"
              >
                ADD REVIEW
              </Button>
            )}
            {list.length > 0 ? (
              list.map((review) => <ReviewCard review={review} />)
            ) : (
              <h2 className="font-weight-light text-center">
                No Reviews Present
              </h2>
            )}
          </div>
        ) : (
          <AddReview
            addReview={addNewReview}
            closeWindow={() => showReviewPage(false)}
          />
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({ isLoggedIn: state.user.auth });

export default connect(mapStateToProps)(ReviewList);
