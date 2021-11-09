import React from "react";
import { Card } from "react-bootstrap";

const AddressCard = ({ address, ...props }) => {
  return (
    <Card>
      <Card.Header>
        <b>SHIPPING DETAILS</b>
      </Card.Header>
      <Card.Body>
        <p className="m-0">
          <b>{address.name}</b>
        </p>
        <p className="m-0">{address.line1}</p>
        <p className="m-0">{address.line2}</p>
        <p className="m-0">{address.city}</p>
        <p className="m-0">{`${address.state} - ${address.zip}`}</p>
        <p className="m-0">
          <b>Mobile: </b>
          {address.phoneNo}
        </p>
      </Card.Body>
    </Card>
  );
};

export default AddressCard;
