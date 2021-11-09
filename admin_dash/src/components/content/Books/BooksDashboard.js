import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";

import { Switch, useHistory, useLocation } from "react-router";
import PrivateRoute from "../../../utils/PrivateRoute";
import MartolexSoldBooks from "./MartolexSoldBooks";
import ThirdPartyBooks from "./ThirdPartyBooks";

const BooksDashboard = (props) => {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  return (
    <Container className="mt-4" fluid>
      <Row className="mb-3 py-2">
        <Col
          style={{ border: "1px solid #ddd", borderRadius: 5 }}
          className="py-2 mx-md-3"
        >
          <Nav
            onSelect={(eventkey) => {
              history.push("/books/" + eventkey.toLowerCase());
            }}
            variant="pills"
            defaultActiveKey="MARTOLEX"
          >
            <Nav.Item>
              <Nav.Link
                className="text-dark"
                active={
                  location.pathname.includes("martolex") ||
                  location.pathname === "/books"
                }
                eventKey="MARTOLEX"
              >
                MARTOLEX SOLD
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                className="text-dark"
                active={location.pathname.includes("other")}
                eventKey="OTHER"
              >
                OTHER USERS
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Switch>
        <PrivateRoute exact path="/books/martolex">
          <MartolexSoldBooks />
        </PrivateRoute>
        <PrivateRoute exact path="/books/">
          <MartolexSoldBooks />
        </PrivateRoute>
        <PrivateRoute exact path="/books/other">
          <ThirdPartyBooks />
        </PrivateRoute>
      </Switch>
    </Container>
  );
};

export default BooksDashboard;
