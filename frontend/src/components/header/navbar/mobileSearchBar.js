import React, { useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import "./mobileSearchBar.scss";
import OverLay from "../../utils/overLay";
import querystring from "querystring";
const MobileSearchbar = (props) => {
  const [searchText, setSearchText] = useState("");
  const searchBooks = () => {
    window.location.href =
      "/search?" + querystring.stringify({ search: searchText });
  };
  return (
    <OverLay
      style={
        props.isOpen
          ? { visibility: "visible", opacity: 1, top: 0 }
          : { visibility: "hidden", opacity: 0, top: "100vh" }
      }
    >
      <Row className="justify-content-end mr-2">
        <MdClose onClick={props.closeSearch} size={40} color="white" />
      </Row>
      <Row className=" mb-3 mx-1">
        <Form.Control
          type="text"
          size="lg"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search by Book Name, Author, ISBN, Publication"
        />
      </Row>
      <Row className="mx-1">
        <Button
          block
          onClick={searchBooks}
          size="lg"
          style={{ fontSize: "0.9em" }}
          className="text-light"
        >
          SEARCH
        </Button>
      </Row>
    </OverLay>
  );
};

export default MobileSearchbar;
