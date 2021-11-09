import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { get } from "../../utils/requests";
import { LeadsApi } from "../../utils/EndPoints";
import Table from "../../utils/Table";

const LeadsDashboard = (props) => {
  const [leads, setleads] = useState([]);
  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setleads(data);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getData(LeadsApi.getLeads);
  }, []);
  return (
    <Container className="mt-4" fluid>
      <Row className="mb-2 justify-content-center">
        <Col md={8} className="text-right">
          <Button variant="info">SEND PROMO EMAIL</Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div style={{ border: "1px solid #eee" }}>
            <Table
              data={leads}
              keyExtractor={(item) => item.id}
              headerCols={["NAME", "EMAIL", "PHONE"]}
              renderRow={(item) => {
                return [item.name, item.email, item.phoneNo];
              }}
              renderEmpty={() => (
                <h2 className="w-100 text-center display-4">No leads</h2>
              )}
              dataModifier={setleads}
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

export default LeadsDashboard;
