import React, { useState, useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Select from "react-select/async";
import { ambassadorsApi, collegeApi } from "../../../utils/EndPoints";
import { get, post } from "../../../utils/requests";
import _ from "lodash";
import AddNewAmbassadorDialog from "./AddNewAmbassadorDialog";
import { FaTrash } from "react-icons/fa";
import AmbassadorStatsDialog from "./AmbassadorStatsDialog";
import IDGen from "../../../utils/IDGen";
import Table from "../../../utils/Table";
const AmbassadorsDashboard = (props) => {
  const [ambassadors, setAmbassadors] = useState([]);
  const [college, setCollege] = useState("");
  const [ambassadorDialogOpen, setAmbassadorDialogOpen] = useState(false);
  const [ambassadorStatsDialogOpen, setAmbassadorStatsDialogOpen] = useState(
    false
  );
  const [currAmbassadorId, setCurrAmbassador] = useState(undefined);

  async function getData(api, params) {
    console.log(params);
    try {
      const [data] = await get(api, true, params);
      setAmbassadors(data);
    } catch (err) {
      console.log(err);
    }
  }
  const loadData = () => {
    if (college === "") {
      getData(ambassadorsApi.getAmbassadors);
    } else {
      getData(ambassadorsApi.getAmbassadors, { collegeId: college });
    }
  };
  React.useEffect(loadData, [college]);

  const loadColleges = useCallback(
    _.debounce((inputValue, callback) => {
      try {
        get(collegeApi, true, { query: inputValue }).then(([options]) => {
          console.log(options);
          callback(
            options.map((item) => {
              console.log(item);
              return { value: item.id, label: item.name };
            })
          );
        });
      } catch (err) {
        console.log(err);
      }
    }, 300),
    []
  );
  function showAmbassadorStats(id) {
    setAmbassadorStatsDialogOpen(true);
    setCurrAmbassador(id);
  }

  async function deactivateAmbassador(id) {
    try {
      await post(ambassadorsApi.deactivate, true, {
        ambassadorId: id,
      });
      loadData();
    } catch (err) {
      alert(err);
    }
  }
  return (
    <Container className="mt-4" fluid>
      <AddNewAmbassadorDialog
        show={ambassadorDialogOpen}
        reload={loadData}
        handleClose={() => setAmbassadorDialogOpen(false)}
      />
      <AmbassadorStatsDialog
        show={ambassadorStatsDialogOpen}
        ambassadorId={currAmbassadorId}
        handleClose={() => setAmbassadorStatsDialogOpen(false)}
      />
      <Row className="mb-3">
        <Col>
          <Row>
            <Col xs={10}>
              <Select
                placeholder="Select College ..."
                loadOptions={loadColleges}
                onChange={(option) => {
                  setCollege(option.value);
                }}
              />
            </Col>
            <Col xs={2}>
              <Button block variant="info" onClick={() => setCollege("")}>
                CLEAR
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col md={{ offset: 6, span: 6 }}>
              <Button
                onClick={() => setAmbassadorDialogOpen(true)}
                variant="success"
                block
              >
                ADD AMBASSADOR
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <div style={{ border: "1px solid #eee" }}>
            <Table
              data={ambassadors}
              keyExtractor={(item) => item.id}
              selectable={false}
              headerCols={[
                "ID",
                "NAME",
                "EMAIL",
                "MOBILE",
                "COLLEGE",
                "ACTIONS",
              ]}
              renderEmpty={() => (
                <h2 className="w-100 text-center display-4">No ambassadors</h2>
              )}
              renderRow={(ambassador) => [
                IDGen(ambassador.id),
                ambassador.user.name,
                ambassador.user.email,
                ambassador.user.phoneNo,
                ambassador.college.name,
                <Button
                  onClick={() => deactivateAmbassador(ambassador.id)}
                  variant="danger"
                >
                  <FaTrash />
                </Button>,
              ]}
              onRowClick={(ambassador) => {
                showAmbassadorStats(ambassador.id);
              }}
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
export default AmbassadorsDashboard;
