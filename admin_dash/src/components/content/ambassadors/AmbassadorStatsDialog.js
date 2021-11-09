import React, { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { ambassadorsApi } from "../../../utils/EndPoints";
import { get } from "../../../utils/requests";
import StatCard from "./StatCard";

const AmbassadorStatsDialog = (props) => {
  const [stats, setStats] = useState({});
  async function getData(api, params) {
    console.log(params);
    try {
      const [{ stats }] = await get(api, true, params);
      console.log(stats);
      setStats(stats);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    if (props.ambassadorId) {
      getData(ambassadorsApi.stats(props.ambassadorId));
    }
  }, [props.ambassadorId]);
  return (
    <Modal centered size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>STATS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {stats && (
          <Container fluid>
            <Row>
              <Col>
                <StatCard
                  title="total sales"
                  value={`₹${stats.totalSales || "0.00"}`}
                />
              </Col>
              <Col>
                <StatCard
                  title="Total Earning"
                  value={`₹${stats.totalEarning || "0.00"}`}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <StatCard
                  title="sale this month"
                  value={`₹${stats.oneMonthSales || "0.00"}`}
                />
              </Col>
              <Col>
                <StatCard
                  title="earning this month"
                  value={`₹${stats.oneMonthEarning || "0.00"}`}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <StatCard
                  title="total Books Sold"
                  value={stats.booksSold || 0}
                />
              </Col>
              <Col>
                <StatCard title="total leads" value={stats.leads || 0} />
              </Col>
            </Row>
          </Container>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AmbassadorStatsDialog;
