import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa";

const EditableField = ({
  as: type,
  inputType,
  value,
  onChange,
  options,
  editable,
  edited,
  ...props
}) => {
  const [isEditable, setEditable] = useState(false);
  return (
    <Row>
      {isEditable ? (
        <Col md={10}>
          <Form.Group controlId="sellerpaymentMode">
            {type !== "select" ? (
              <Form.Control
                type={type}
                required
                as={!!inputType ? inputType : "input"}
                {...props}
                value={value}
                autoFocus
                onChange={(event) => {
                  onChange(event.target.value);
                }}
              />
            ) : (
              <Form.Control
                as="select"
                required
                autofocus
                {...props}
                value={options.find((option) => option.label === value)?.value}
                onChange={(event) => onChange(event.target.value)}
              >
                {options.map((opt) => (
                  <option value={opt.value}>{opt.label}</option>
                ))}
              </Form.Control>
            )}
          </Form.Group>
        </Col>
      ) : (
        <Col>
          <span className="mr-3">{value}</span>
          {editable && (
            <FaPen
              color="#ff4800"
              onClick={() => {
                setEditable(true);
                edited(true);
              }}
            />
          )}
        </Col>
      )}
    </Row>
  );
};

export default EditableField;
