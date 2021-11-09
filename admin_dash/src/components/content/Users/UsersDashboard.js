import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { get } from "../../../utils/requests";
import { UsersApi } from "../../../utils/EndPoints";
import Table from "../../../utils/Table";

const UsersDashboard = (props) => {
  const [users, setUsers] = useState([]);
  const [sellerSwitch, sellerOnly] = useState(false);
  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    getData(UsersApi.getUsers, { isSeller: sellerSwitch });
  }, [sellerSwitch]);
  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col>
          <Form.Check
            type="switch"
            checked={sellerSwitch}
            id="custom-switch"
            onChange={(event) => {
              sellerOnly(!sellerSwitch);
            }}
            label="Sellers only"
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <div style={{ border: "1px solid #eee" }}>
            <Table
              data={users}
              keyExtractor={(user) => users.id}
              headerCols={["NAME", "EMAIL", "MOBILE", "COLLEGE", "SELLER"]}
              renderRow={(user) => [
                user.name,
                user.email,
                user.phoneNo,
                user.college || "not available",
                user.isSeller ? "YES" : "NO",
              ]}
              selectable={false}
              renderEmpty={() => (
                <h2 className="w-100 text-center display-4">No Users</h2>
              )}
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

export default UsersDashboard;
