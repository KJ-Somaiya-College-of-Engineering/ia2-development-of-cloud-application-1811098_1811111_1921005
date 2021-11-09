import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { paymentMethods, paymentStatus } from "../../../utils/enums";

const sellerTypes = ["MARTOLEX", "OTHERS"];

const initialFiltersState = {
  sellerTypes: [],
  paymentMethods: [],
  paymentStatus: [],
  minOrderDate: undefined,
  maxOrderDate: undefined,
};

const FiltersDialog = ({ isOpen, handleClose, filterSetter, ...props }) => {
  const [filters, setFilters] = useState({ ...initialFiltersState });
  function applyFilters() {
    filterSetter((prev) => ({ ...prev, ...filters }));
    handleClose();
  }
  function clearFilters() {
    setFilters({ ...initialFiltersState });
    filterSetter((prev) => ({ ...prev, ...initialFiltersState }));
    handleClose();
  }
  const onFilterChange = (filterName) => (event) => {
    const newFilters = filters[filterName].includes(event.target.value)
      ? filters[filterName].filter((type) => type !== event.target.value)
      : [...filters[filterName], event.target.value];
    setFilters({ ...filters, [filterName]: newFilters });
  };

  return (
    <Modal centered show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col>
              <Row>
                <Col>
                  <p className="lead">Sellers</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  {sellerTypes.map((type, idx) => (
                    <Form.Check
                      inline
                      onChange={onFilterChange("sellerTypes")}
                      label={type}
                      checked={filters.sellerTypes.includes(type)}
                      value={type}
                      type="checkbox"
                      name="sellerType"
                    />
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Row>
                <Col>
                  <p className="lead">Payment Method</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  {Object.values(paymentMethods).map((type, idx) => (
                    <Form.Check
                      onChange={onFilterChange("paymentMethods")}
                      label={type}
                      value={type}
                      checked={filters.paymentMethods.includes(type)}
                      type="checkbox"
                      name="paymentMethods"
                    />
                  ))}
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <p className="lead">Payment Status</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  {Object.values(paymentStatus).map((type, idx) => (
                    <Form.Check
                      onChange={onFilterChange("paymentStatus")}
                      label={type}
                      value={type}
                      checked={filters.paymentStatus.includes(type)}
                      type="checkbox"
                      name="paymentStatus"
                    />
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Row>
                <Col>
                  <p className="lead mb-0">Order Date</p>
                </Col>
              </Row>
              <Row>
                <Col className="pt-0">
                  <Form.Group controlId="min-delivery">
                    <Form.Label>Earliest Order Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={
                        filters.minOrderDate
                          ? new Date(filters.minOrderDate)
                              .toISOString()
                              .substring(0, 10)
                          : ""
                      }
                      onChange={(event) =>
                        setFilters({
                          ...filters,
                          minOrderDate: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="min-delivery">
                    <Form.Label>Max Order Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={
                        filters.maxOrderDate
                          ? new Date(filters.maxOrderDate)
                              .toISOString()
                              .substring(0, 10)
                          : ""
                      }
                      onChange={(event) =>
                        setFilters({
                          ...filters,
                          maxOrderDate: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={clearFilters}>
          Clear{" "}
        </Button>
        <Button onClick={applyFilters} variant="success">
          Filter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
FiltersDialog.defaultProps = {
  isOpen: true,
};
FiltersDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  filters: PropTypes.object,
  filterSetter: PropTypes.func.isRequired,
};

export default FiltersDialog;
