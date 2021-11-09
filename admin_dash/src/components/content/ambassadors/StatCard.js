import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const StatCard = ({ title, value }) => {
  return (
    <Card className="my-2">
      <Card.Body>
        <Container fluid>
          <Row>
            <Col>
              <h3 className="text-center">{value}</h3>
            </Col>
          </Row>
        </Container>
      </Card.Body>
      <Card.Footer className="bg-primary">
        <h5 className="text-center text-uppercase">{title}</h5>
      </Card.Footer>
    </Card>
  );
};
export default StatCard;
