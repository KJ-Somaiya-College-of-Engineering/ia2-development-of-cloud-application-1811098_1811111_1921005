import React, { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { booksApi } from "../../../utils/EndPoints";
import { deleteCall, get, post, put } from "../../../utils/requests";
import "../../../styles/Content/Book/bookDetails.scss";
import ApprovalTag from "./ApprovalTag";
import EditableField from "./EditableField";
import { useHistory } from "react-router";
const BookDetails = (props) => {
  const [book, setBook] = useState(undefined);
  const [edited, isEdited] = useState(false);
  const [isNotApproved, setNotApproved] = useState({
    status: false,
    reason: "",
  });
  const history = useHistory();
  async function getData(api, params, setter) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setter(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData(booksApi.bookDetails(props.match.params.id), null, setBook);
  }, [props.match.params.id]);

  const soldByMartolex = book && book.upload.isAdmin;

  async function deleteBook() {
    const confirmation = window.confirm(
      "are you sure you want to delete the book"
    );
    if (confirmation) {
      const bookId = props.match.params.id;
      try {
        const [data] = await deleteCall(booksApi.martolexBooks, true, {
          bookId,
        });
        window.alert(data.message);
      } catch (err) {
        alert(err);
      }
    }
  }

  async function updateBook() {
    const confirmation = window.confirm(
      "are you sure you want to update the book details"
    );
    if (confirmation) {
      const body = {
        bookId: book.id,
        mrp: book.rent.mrp,
        deposit: book.rent.deposit,
        onemonthrent: book.rent.oneMonth,
        threemonthrent: book.rent.threeMonth,
        sixmonthrent: book.rent.sixMonth,
        ninemonthrent: book.rent.nineMonth,
        twelvemonthrent: book.rent.twelveMonth,
        author: book.author,
        publisher: book.publisher,
        edition: book.edition,
        description: book.description,
        quantity: book.quantity,
      };
      try {
        const [data] = await put(booksApi.martolexBooks, true, body);
        window.alert(data.message);
        history.go(0);
      } catch (err) {
        alert(err);
      }
    }
  }

  async function sendApproval(isApproved, reason) {
    const confirmation = window.confirm(
      "are you sure you want to change the approval status ?"
    );
    if (confirmation) {
      let body = {
        status: isApproved ? "approved" : "not_approved",
        bookId: props.match.params.id,
      };
      if (!isApproved) {
        body.reason = reason;
      }

      try {
        const [res] = await post(
          booksApi.thirdParty.changeApprovalState,
          true,
          body
        );
        alert(res.message);
        history.go(0);
      } catch (err) {
        alert(err);
      }
    }
  }
  return book ? (
    <Container className="mt-4" fluid>
      <Row>
        <Col>
          <h4 className="display-4 book-name">{book.name}</h4>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          {!soldByMartolex && <ApprovalTag status={book.isApproved} />}
          <Carousel
            style={{ width: "90%", height: "350px" }}
            className="imgcarousel mx-auto"
          >
            {book.images.map((img, idx) => (
              <Carousel.Item key={idx}>
                <img
                  alt={`product ${idx + 1}`}
                  className="d-block mx-auto "
                  src={img.url}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col>
          <Table bordered style={{ fontSize: "1.1em" }}>
            <tr>
              <th width="30%">Category</th>
              <td>{book.subCat.category.name}</td>
            </tr>
            <tr>
              <th width="30%">Subcategory</th>
              <td>{book.subCat.name}</td>
            </tr>
            <tr>
              <th width="30%">Author</th>
              <td>
                <EditableField
                  as="text"
                  edited={isEdited}
                  editable={soldByMartolex}
                  onChange={(value) =>
                    setBook((prevState) => ({ ...prevState, author: value }))
                  }
                  value={book.author}
                />
              </td>
            </tr>
            <tr>
              <th width="30%">Edition</th>
              <td>
                <EditableField
                  as="text"
                  edited={isEdited}
                  editable={soldByMartolex}
                  onChange={(value) =>
                    setBook((prevState) => ({ ...prevState, publisher: value }))
                  }
                  value={book.publisher}
                />
              </td>
            </tr>
            <tr>
              <th width="30%">ISBN</th>
              <td>
                <EditableField
                  as="number"
                  edited={isEdited}
                  editable={soldByMartolex}
                  pattern="[0-9]{13}|[0-9]{11}"
                  onChange={(value) =>
                    setBook((prevState) => ({ ...prevState, isbn: value }))
                  }
                  value={book.isbn}
                />
              </td>
            </tr>
            <tr>
              <th width="30%">Quantity</th>
              <td>
                <EditableField
                  as="number"
                  min={1}
                  edited={isEdited}
                  editable={soldByMartolex}
                  onChange={(value) =>
                    setBook((prevState) => ({ ...prevState, quantity: value }))
                  }
                  value={book.quantity}
                />
              </td>
            </tr>
            <tr>
              <th width="30%">Seller</th>
              <td>{!soldByMartolex ? book.upload.name : "MARTOLEX"}</td>
            </tr>
          </Table>
        </Col>
      </Row>
      <Row className="mt-3 ">
        <Col>
          <Table bordered>
            <tr>
              <th>Description</th>
            </tr>
            <tr>
              <td>
                <EditableField
                  as="text"
                  editable={soldByMartolex}
                  edited={isEdited}
                  inputType="textarea"
                  width="100%"
                  rows={5}
                  onChange={(value) =>
                    setBook((prevState) => ({
                      ...prevState,
                      description: value,
                    }))
                  }
                  value={book.description || "NA"}
                />
              </td>
            </tr>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Row>
            <Col>
              <h4>Pricing</h4>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              <Table bordered>
                <tr>
                  <th>BUY BACK ENABLED </th>
                  <td width="0%">
                    <EditableField
                      as="select"
                      editable={soldByMartolex}
                      options={[
                        { value: 1, label: "YES" },
                        { value: 0, label: "NO" },
                      ]}
                      edited={isEdited}
                      onChange={(value) =>
                        setBook((prevState) => ({
                          ...prevState,
                          isBuyBackEnabled: value === 1,
                        }))
                      }
                      value={book.isBuyBackEnabled ? "YES" : "NO"}
                    />
                  </td>
                </tr>
                <tr>
                  <th>MRP </th>
                  <td>
                    <EditableField
                      as="number"
                      min={1}
                      edited={isEdited}
                      editable={soldByMartolex}
                      onChange={(value) =>
                        setBook((prevState) => ({
                          ...prevState,
                          rent: { ...prevState.rent, mrp: value },
                        }))
                      }
                      value={book.rent.mrp}
                    />
                  </td>
                </tr>
                <tr>
                  <th>SELLING PRICE </th>
                  <td>
                    <EditableField
                      as="number"
                      min={1}
                      edited={isEdited}
                      editable={soldByMartolex}
                      onChange={(value) =>
                        setBook((prevState) => ({
                          ...prevState,
                          rent: { ...prevState.rent, sellPrice: value },
                        }))
                      }
                      value={book.rent.sellPrice}
                    />
                  </td>
                </tr>
                {book.isBuyBackEnabled && (
                  <tr>
                    <th> DEPOSIT</th>
                    <td>
                      <EditableField
                        as="number"
                        edited={isEdited}
                        min={1}
                        editable={soldByMartolex}
                        onChange={(value) =>
                          setBook((prevState) => ({
                            ...prevState,
                            rent: { ...prevState.rent, deposit: value },
                          }))
                        }
                        value={book.rent.deposit}
                      />
                    </td>
                  </tr>
                )}
                {book.isBuyBackEnabled && (
                  <tr>
                    <th>ONE MONTH</th>
                    <td>
                      <EditableField
                        as="number"
                        editable={soldByMartolex}
                        min={1}
                        edited={isEdited}
                        onChange={(value) =>
                          setBook((prevState) => ({
                            ...prevState,
                            rent: { ...prevState.rent, oneMonth: value },
                          }))
                        }
                        value={book.rent.oneMonth}
                      />
                    </td>
                  </tr>
                )}
                {book.isBuyBackEnabled && (
                  <tr>
                    <th> THREE MONTH</th>
                    <td>
                      <EditableField
                        as="number"
                        min={1}
                        editable={soldByMartolex}
                        onChange={(value) =>
                          setBook((prevState) => ({
                            ...prevState,
                            rent: { ...prevState.rent, threemonth: value },
                          }))
                        }
                        edited={isEdited}
                        value={book.rent.threeMonth}
                      />
                    </td>
                  </tr>
                )}
                {book.isBuyBackEnabled && (
                  <tr>
                    <th> SIX MONTH</th>
                    <td>
                      <EditableField
                        as="number"
                        editable={soldByMartolex}
                        min={1}
                        edited={isEdited}
                        onChange={(value) =>
                          setBook((prevState) => ({
                            ...prevState,
                            rent: { ...prevState.rent, sixMonth: value },
                          }))
                        }
                        value={book.rent.sixMonth}
                      />
                    </td>
                  </tr>
                )}
                {book.isBuyBackEnabled && (
                  <tr>
                    <th> NINE MONTH</th>
                    <td>
                      <EditableField
                        as="number"
                        edited={isEdited}
                        editable={soldByMartolex}
                        min={1}
                        onChange={(value) =>
                          setBook((prevState) => ({
                            ...prevState,
                            rent: { ...prevState.rent, nineMonth: value },
                          }))
                        }
                        value={book.rent.nineMonth}
                      />
                    </td>
                  </tr>
                )}
                {book.isBuyBackEnabled && (
                  <tr>
                    <th>TWELVE MONTH</th>
                    <td>
                      <EditableField
                        as="number"
                        edited={isEdited}
                        editable={soldByMartolex}
                        min={1}
                        onChange={(value) =>
                          setBook((prevState) => ({
                            ...prevState,
                            rent: { ...prevState.rent, twelveMonth: value },
                          }))
                        }
                        value={book.rent.twelveMonth}
                      />
                    </td>
                  </tr>
                )}
              </Table>
            </Col>
          </Row>
        </Col>
        {!soldByMartolex && book.isApproved === 0 && (
          <Col>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h4>Approval</h4>
                    <hr />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Container fluid>
                <Row>
                  <Col>
                    <Button
                      onClick={() => sendApproval(true)}
                      block
                      variant="success"
                    >
                      APPROVE
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={() =>
                        setNotApproved({ ...isNotApproved, status: true })
                      }
                      block
                      variant="danger"
                    >
                      REJECT
                    </Button>
                  </Col>
                </Row>
                {isNotApproved.status && (
                  <Row className="mt-2">
                    <Col md={12}>
                      <Form.Group controlId="reason">
                        <Form.Label>Reason for Rejection</Form.Label>
                        <Form.Control
                          type="text"
                          as="textarea"
                          rows={5}
                          required
                          value={isNotApproved.reason}
                          onChange={(event) =>
                            setNotApproved({
                              ...isNotApproved,
                              reason: event.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col className="text-center">
                      <Button
                        onClick={() =>
                          sendApproval(false, isNotApproved.reason)
                        }
                        variant="danger"
                      >
                        SUBMIT
                      </Button>
                    </Col>
                  </Row>
                )}
              </Container>
            </Row>
          </Col>
        )}
      </Row>
      <Row
        className="mb-2 p-2 text-right"
        style={{ border: "1px solid #ddd", borderRadius: 5 }}
      >
        <Col>
          <Button className="mx-2" variant="danger" onClick={deleteBook}>
            DELETE BOOK
          </Button>

          <Button
            className="mx-2"
            variant="danger"
            onClick={() => history.go(0)}
            disabled={!edited}
          >
            DISCARD CHANGES
          </Button>

          <Button
            className="mx-2"
            variant="success"
            onClick={updateBook}
            disabled={!edited}
          >
            CONFIRM EDIT
          </Button>
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default BookDetails;
