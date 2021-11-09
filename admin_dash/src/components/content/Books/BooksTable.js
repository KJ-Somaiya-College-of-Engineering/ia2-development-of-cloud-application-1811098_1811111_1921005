import React from "react";
import { Col, Row } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useHistory } from "react-router";
import IDGen from "../../../utils/IDGen";
import Table from "../../../utils/Table";

const BooksTable = ({ books, thirdParty }) => {
  const history = useHistory();

  const renderRow = (book) => {
    const row = [
      IDGen(book.id),
      book.name,
      book.author,
      book.publisher,
      book.quantity,
      book.subCat.category.name,
      book.subCat.name,
    ];
    return thirdParty ? [...row, book.upload.name] : row;
  };
  const headerCols = [
    "BOOK ID",
    "BOOK NAME",
    "AUTHOR",
    "PUBLISHER",
    "QTY",
    "CATEGORY",
    "SUBCATEGORY",
  ];
  const renderEmpty = () => (
    <h2 className="w-100 text-center display-4">No Books</h2>
  );
  const onRowClick = (book) => history.push(`/book/${book.id}`);
  return (
    <div>
      <Row>
        <Col className="">
          <div style={{ border: "1px solid #eee" }}>
            <Table
              data={books}
              keyExtractor={(book) => book.id}
              selectable={false}
              headerCols={
                !thirdParty ? headerCols : [...headerCols, "UPLOADER"]
              }
              renderRow={renderRow}
              renderEmpty={renderEmpty}
              onRowClick={onRowClick}
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
    </div>
  );
};

export default BooksTable;
