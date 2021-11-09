import React, { useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { booksApi } from "../../../utils/EndPoints";
import { get } from "../../../utils/requests";
import BooksTable from "./BooksTable";

const ThirdPartyBooks = (props) => {
  const [books, setBooks] = useState([]);
  const [type, setType] = useState("Pending Approval");
  async function getData(api, params, setter) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setter(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function changeBookType(eventKey) {
    switch (eventKey) {
      case "approved":
        setType("approved");
        break;
      case "notApproved":
        setType("not approved");
        break;
      case "pendingApproval":
        setType("Pending Approval");
        break;
      default:
        break;
    }
    getData(booksApi.thirdParty[eventKey], null, setBooks);
  }

  React.useEffect(() => {
    getData(booksApi.thirdParty.pendingApproval, null, setBooks);
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col>
          <Dropdown onSelect={changeBookType}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              APPROVAL TYPE
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="pendingApproval">PENDING</Dropdown.Item>
              <Dropdown.Item eventKey="notApproved">NOT APPROVED</Dropdown.Item>
              <Dropdown.Item eventKey="approved">APPROVED</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>{type}</h4>
        </Col>
      </Row>
      <BooksTable thirdParty books={books} />
    </Container>
  );
};

export default ThirdPartyBooks;
