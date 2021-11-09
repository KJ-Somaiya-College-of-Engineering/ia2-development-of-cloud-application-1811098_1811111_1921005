import React from "react";
import { Row, Col, ListGroup, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import OverLay from "../../utils/overLay";
import { connect } from "react-redux";
import { buildSubCatUrl, buildCatUrl } from "../../../utils/buildUrl";
const NavBarMobile = ({ categories, ...props }) => {
  const animation = props.isOpen
    ? { visibility: "visible", opacity: 1 }
    : { visibility: "hidden", opacity: 0 };

  const menuAnimation = props.isOpen
    ? { visibility: "visible", left: 0 }
    : { visibility: "hidden", left: -500 };
  return (
    <OverLay close={props.closeMenu} style={{ padding: 0, ...animation }}>
      <Col
        style={{
          overflowY: "scroll",
          transition: "all 500ms ease",
          position: "absolute",
          ...menuAnimation,
        }}
        className="bg-light h-100"
        xs={8}
      >
        <Row className="p-2">
          <FiArrowLeft size={30} onClick={props.closeMenu} />
        </Row>
        <Row>
          <ListGroup defaultActiveKey="" className="w-100">
            <ListGroup.Item href="/" action>
              HOME
            </ListGroup.Item>
            <Accordion>
              <Accordion.Toggle as={ListGroup.Item} eventKey="1">
                BOOKS
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <ListGroup>
                  {categories.map((category) =>
                    category.subcategories.length > 0 ? (
                      <Accordion key={category.id}>
                        <Accordion.Toggle as={ListGroup.Item} eventKey="1">
                          {category.name.toUpperCase()}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                          <ListGroup>
                            {category.subcategories.map((subcategory) => (
                              <Link
                                to={buildSubCatUrl(category.id, subcategory.id)}
                                className="text-dark btn-link"
                                key={subcategory.id}
                              >
                                <ListGroup.Item
                                  className="text-dark pl-5"
                                  onClick={() => {
                                    props.closeMenu();
                                  }}
                                >
                                  {subcategory.name.toUpperCase()}
                                </ListGroup.Item>
                              </Link>
                            ))}
                          </ListGroup>
                        </Accordion.Collapse>
                      </Accordion>
                    ) : (
                      <Link
                        to={buildCatUrl(category.id)}
                        className="text-dark btn-link"
                      >
                        <ListGroup.Item
                          className="pl-4"
                          onClick={() => {
                            props.closeMenu();
                          }}
                        >
                          {category.name.toUpperCase()}
                        </ListGroup.Item>
                      </Link>
                    )
                  )}
                </ListGroup>
              </Accordion.Collapse>
            </Accordion>
            <ListGroup.Item href="/static/how_it_works" action>
              HOW WE WORK
            </ListGroup.Item>
            <ListGroup.Item href="/static/about_us" action>
              ABOUT US
            </ListGroup.Item>
            <ListGroup.Item href="/notFound" action>
              DIDN'T FIND YOUR BOOK
            </ListGroup.Item>
            <ListGroup.Item href="/upload-book" action>
              SELL YOUR BOOK
            </ListGroup.Item>
            {props.isLoggedIn && (
              <ListGroup.Item href="/profile" action>
                DASHBOARD
              </ListGroup.Item>
            )}{" "}
          </ListGroup>
        </Row>
      </Col>
    </OverLay>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  isLoggedIn: state.user.auth,
});

export default connect(mapStateToProps)(NavBarMobile);
