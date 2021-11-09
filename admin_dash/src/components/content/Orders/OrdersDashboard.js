import React, { useEffect, useState } from "react";

import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../../../styles/Content/Orders/OrderDashboard.scss";
import { ordersApi } from "../../../utils/EndPoints";
import moment from "moment";
import { get } from "../../../utils/requests";
import IDGen from "../../../utils/IDGen";
import { orderStatus } from "../../../utils/enums";
import Table from "../../../utils/Table";
import FiltersDialog from "./FiltersDialog";
import { FiFilter } from "react-icons/fi";
const OrdersDashboard = (props) => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({ status: orderStatus.PROCESSING });
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  async function getData(api, params) {
    try {
      const [data] = await get(api, true, params);
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    console.log(filters);
    getData(ordersApi.getOrders, filters);
  }, [filters]);
  function getOrderByType(eventKey) {
    setFilters({ status: eventKey });
  }

  function openFiltersDialog() {
    setFilterDialogOpen(true);
  }

  const tableHeaders = [
    "ORDER ID",
    "CUSTOMER NAME",
    "DELIVERY CITY",
    "PAYMENT MODE",
    "PAYMENT STATUS",
    "ORDER PRICE",
    "ORDER DATE",
  ];

  const renderRow = (item) => [
    <Link to={`${props.location.pathname}/${item.id}`}>{IDGen(item.id)}</Link>,
    item.user.name,
    item.address.city,
    item.paymentMode,
    item.paymentStatus,
    `Rs. ${item.totalAmount}/-`,
    moment(item.createdAt).format("DD-MM-YYYY"),
  ];

  return (
    <Container className="mt-4" fluid>
      <FiltersDialog
        isOpen={filterDialogOpen}
        handleClose={() => setFilterDialogOpen(false)}
        filterSetter={setFilters}
      />
      <Row
        className="mb-3  mx-1"
        style={{ border: "1px solid #ddd", borderRadius: 5 }}
      >
        <Col className="py-2">
          <Nav
            onSelect={getOrderByType}
            variant="pills"
            defaultActiveKey={orderStatus.PROCESSING}
          >
            <Nav.Item>
              <Nav.Link className="text-dark" eventKey={orderStatus.PROCESSING}>
                NOT PROCESSED
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-dark" eventKey={orderStatus.SHIPPED}>
                DISPATCHED
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-dark" eventKey={orderStatus.DELIVERED}>
                DELIVERED
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={2} className="py-2">
          <Button
            className="align-items"
            block
            variant="primary"
            onClick={openFiltersDialog}
          >
            <FiFilter className="mr-2" />
            FILTERS
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ border: "1px solid #eee" }}>
            <Table
              data={orders}
              keyExtractor={(item) => item.id}
              headerCols={tableHeaders}
              renderRow={renderRow}
              selectable={false}
              renderEmpty={() => (
                <h2 className="w-100 text-center display-4">No Orders</h2>
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

export default OrdersDashboard;
