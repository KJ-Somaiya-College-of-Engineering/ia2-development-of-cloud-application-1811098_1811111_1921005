import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { desktopRes } from "../../viewPortBreakpoints";
import { useViewportHook } from "../utils/viewPortHandler";

const AboutUs = (props) => {
  const { width } = useViewportHook();

  return (
    <Container fluid className="p-0 mb-5">
      <Row>
        <Col className="mx-3" xs={12}>
          <Tabs defaultActiveKey="english">
            <Tab eventKey="english" title="English">
              <Col className="d-flex justify-content-center p-2">
                <iframe
                  src="https://drive.google.com/file/d/15GZNLh750fx5S7y27kV5cR5bhjY5pTo6/preview"
                  width={width > desktopRes ? "640" : "320"}
                  height={width > desktopRes ? "480" : "240"}
                ></iframe>
              </Col>
            </Tab>
            <Tab eventKey="hindi" title="Hindi">
              <Col className="d-flex justify-content-center p-2">
                <iframe
                  src="https://drive.google.com/file/d/1pzb3XX-FZO1ud4pD7LI8SaJUDoQ2g25X/preview"
                  width="640"
                  height="480"
                ></iframe>
              </Col>
            </Tab>
          </Tabs>
        </Col>
        <Col></Col>
      </Row>
      <Row className="w-100 m-0 mt-3">
        <Col className="mx-4 mr-2 my-3 text-justify">
          <p className="lead">
            As a student in today's world, books are the second biggest expense
            in college life. Today even in schools, books beyond NCERT are
            required. Also in entrance exams more than one book is required to
            understand a topic. All these become sizeable expenditure in student
            life. Most books are needed for small periods of time, some for few
            days and others for few months or semester.
          </p>
          <p className="lead">
            If these costs are minimized, significant amount of money can be
            saved and hence students are looking for ways to save money on
            books.
          </p>
          <p className="lead">
            If this sounds right to you, we think you'll like it here. Because
            at Martolex we're all about removing the obstacles that stand in the
            way of the education and intend to make reading books a hassle free,
            cost effective and pleasurable experience. Buy textbooks and return
            them after use which will make them cost for a fraction of your
            total book expenditure. Through this venture we are helping students
            save time, save money and get smarter.
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default AboutUs;
