import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../../styles/Layout/Wrapper.scss";
import DataContainer from "./DataContainer";
import SideBar from "./SideBar";
import OrdersDashboard from "../content/Orders/OrdersDashboard";
import OrderDetails from "../content/Orders/OrderDetails/OrderDetails";
import ReturnsDashboard from "../content/Returns/ReturnsDashboard";
import RequestDashboard from "../content/BookRequests/RequestsDashboard";
import BooksDashboard from "../content/Books/BooksDashboard";
import LeadsDashboard from "../content/LeadsDashboard";
import ReviewsDashboard from "../content/reviews/reviewsDashboard";
import { BiPackage } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import { GiGraduateCap, GiReturnArrow } from "react-icons/gi";
import { GoRequestChanges } from "react-icons/go";
import {
  MdRateReview,
  MdEmail,
  MdPeople,
  MdShoppingCart,
  MdMenu,
} from "react-icons/md";
import UsersDashboard from "../content/Users/UsersDashboard";
import UserCartsDashboard from "../content/Users/UserCarts";
import AmbassadorsDashboard from "../content/ambassadors/AmbassadorsDashboard";
const sideBarItems = [
  {
    title: "orders",
    path: "/orders",
    exact: true,
    icon: { component: BiPackage, size: 25 },
    component: OrdersDashboard,
    subRoutes: [{ path: "/:id", component: OrderDetails }],
  },
  {
    title: "books",
    icon: { component: FaBook, size: 22 },
    path: "/books",
    component: BooksDashboard,
  },
  {
    title: "returns",
    icon: { component: GiReturnArrow, size: 22 },
    path: "/returns",
    component: ReturnsDashboard,
  },
  {
    title: "book Requests",
    path: "/requests",
    component: RequestDashboard,
    icon: { component: GoRequestChanges, size: 22 },
  },
  {
    title: "Reviews",
    path: "/reviews",
    icon: { component: MdRateReview },
    component: ReviewsDashboard,
  },
  {
    title: "leads",
    path: "/leads",
    icon: { component: MdEmail },
    component: LeadsDashboard,
  },
  {
    title: "ambassadors",
    path: "/ambassadors",
    icon: { component: GiGraduateCap },
    component: AmbassadorsDashboard,
  },
  {
    title: "users",
    path: "/users",
    icon: { component: MdPeople },
    component: UsersDashboard,
  },
  {
    title: "user carts",
    path: "/carts",
    icon: { component: MdShoppingCart },
    component: UserCartsDashboard,
  },
];
const Wrapper = (props) => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  return (
    <Container
      style={{
        flexDirection: "column",
        height: "100vh",
        transition: "500ms ease all",
      }}
      fluid
    >
      <Row style={{ height: "8vh" }} className="bg-primary header">
        <Col
          className="d-flex align-items-center d-md-none text-center name"
          md={1}
          xs={2}
        >
          <MdMenu size={30} onClick={() => setMenuExpanded(!menuExpanded)} />
        </Col>
        <Col className="text-center name" md={3} xs={10}>
          Martolex Dashboard
        </Col>
      </Row>
      <Row style={{ flex: "auto" }}>
        <Col
          md={2}
          xs={menuExpanded ? 7 : 2}
          style={{
            width: "200px",
            height: "92vh",
            position: menuExpanded ? "absolute" : "relative",
            zIndex: 10,
          }}
          className=" sidebar bg-dark text-light"
        >
          <SideBar
            items={sideBarItems}
            isOpen={menuExpanded}
            closeMenu={() => setMenuExpanded(false)}
          />
        </Col>
        <Col
          style={{
            height: "92vh",
            overflowY: "scroll",
          }}
          xs={{ offset: menuExpanded ? 2 : 0 }}
        >
          <DataContainer items={sideBarItems} />
        </Col>
      </Row>
    </Container>
  );
};

export default Wrapper;
