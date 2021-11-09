import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import "./addressCards.scss";
const AddressCards = (props) => {
  const [activecard, setActiveCard] = React.useState(undefined);
  const onCardSelect = (id) => () => {
    setActiveCard(id);
    props.handleAddressSelectError();
    props.onSelect(id);
  };

  async function editAddress() {}
  return (
    <div>
      <Row className="address-cards">
        {props.addressError && (
          <p className="text-danger">Please select an address</p>
        )}
        {props.addresses.map((address, idx) => {
          return (
            <Col
              key={address.id}
              className="py-2 address-card-container"
              style={{}}
              md={6}
            >
              <Row className="w-100 m-0 h-100">
                <Col
                  className={`px-3 py-2 address-card ${
                    address.id === activecard ? "active" : ""
                  } `}
                  onClick={onCardSelect(address.id)}
                >
                  <Row>
                    <Col md={10} xs={10}>
                      <h4 className="mb-0">{address.name}</h4>
                    </Col>
                    <Col md={2} xs={2} className="btn-dark-ripple text-right">
                      <MdEdit size={20} onClick={editAddress()} />
                    </Col>
                  </Row>
                  <p className="font-weight-bold mb-3">{`(${address.type})`}</p>
                  <p>{address.line1}</p>
                  <p>{address.line2}</p>
                  <p>{address.city}</p>
                  <p>{`${address.state}- ${address.zip}.`}</p>
                  <p>{`mobile no: ${address.phoneNo}`}</p>
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
      <Row className="mt-2">
        <Col md={5} className="mx-auto">
          <Button onClick={props.addNewAddress} size="lg" block>
            ADD NEW ADDRESS
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddressCards;
