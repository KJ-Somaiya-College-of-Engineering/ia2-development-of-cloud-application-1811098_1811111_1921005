import React, { useState } from "react";
import { Col, Card, ListGroup } from "react-bootstrap";
import { buildSubCatUrl, buildCatUrl } from "../../utils/buildUrl";
import { connect } from "react-redux";
import { useViewportHook } from "../utils/viewPortHandler";
import { desktopRes } from "../../viewPortBreakpoints";

const SideBar = ({ displaySubCat, categories, ...props }) => {
  const { width } = useViewportHook();

  const [openFilters, setOpenFilters] = useState(width > desktopRes);

  return (
    <Col md={3}>
      <Card className="mb-2">
        <Card.Header
          style={{ cursor: "pointer", borderRadius: "2px" }}
          onClick={() => width < desktopRes && setOpenFilters(!openFilters)}
          className="text-center bg-primary text-dark font-weight-bold"
        >
          {!displaySubCat ? "FILTER BY CATEGORY" : "FILTER BY SUB-CATEGORY"}
        </Card.Header>

        {openFilters && (
          <ListGroup className="side-filter mt-2" variant="flush">
            {displaySubCat
              ? categories
                  .find((cat) => cat.id == props.catId)
                  ?.subcategories.map(({ id, name }, idx) => (
                    <ListGroup.Item
                      href={buildSubCatUrl(props.catId, id)}
                      action
                      active={props.subCatId === id}
                    >
                      {name.toUpperCase()}
                    </ListGroup.Item>
                  ))
              : categories.map(({ id, name }) => (
                  <ListGroup.Item href={buildCatUrl(id)} action>
                    {name.toUpperCase()}
                  </ListGroup.Item>
                ))}
          </ListGroup>
        )}
      </Card>
    </Col>
  );
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(SideBar);
