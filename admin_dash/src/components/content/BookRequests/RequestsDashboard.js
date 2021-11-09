import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { notFoundBooks } from "../../../utils/EndPoints";
import { get } from "../../../utils/requests";
import moment from "moment";
import Table from "../../../utils/Table";

const RequestDashboard = (props) => {
  const [queries, setQueries] = useState([]);
  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setQueries(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData(notFoundBooks);
  }, []);
  const headerCols = [
    "USER NAME",
    "MOBILE",
    "EMAIL",
    "BOOK NAME",
    "PUBLISHER",
    "AUTHOR",
    "EDITION",
    "ISBN",
    "DATE",
  ];

  const renderRow = (query) => [
    query.userName,
    query.userPhone,
    query.userEmail,
    query.name,
    query.publisher,
    query.author,
    query.edition,
    query.isbn,
    moment(query.createdAt).format("DD/MM/YYYY"),
  ];

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col>
          <div style={{ border: "1px solid #eee" }}>
            <Table
              data={queries}
              keyExtractor={(query) => query.id}
              headerCols={headerCols}
              renderEmpty={() => (
                <h2 className="w-100 text-center display-4">No Requests</h2>
              )}
              renderRow={renderRow}
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

export default RequestDashboard;
