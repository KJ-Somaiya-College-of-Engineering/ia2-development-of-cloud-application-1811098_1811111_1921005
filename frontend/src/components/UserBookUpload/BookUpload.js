import React, { useState, useCallback } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import AsyncCreatableSelect from "react-select/async-creatable";
import Select from "react-select";
import { get, post } from "../../utils/requests";
import { bookUploadApi } from "../../utils/endpoints";
import OverLay from "../utils/overLay";
import OverlayLoader from "../utils/OverlayLoader";
import _ from "lodash";
import ImageUpload from "./ImageUpload";
import { connect } from "react-redux";
import { deliveryLocations } from "../../utils/deliveryLocations";
import "./BookUpload.scss";
import { Redirect, withRouter } from "react-router";

const BookUpload = (props) => {
  const [details, setDetails] = useState({
    prices: { mrp: undefined, sellingPrice: undefined },
    buyBackEnabled: true,
    state: "Maharashtra",
    quantity: 1,
  });
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setloading] = useState(false);
  const [errors, setErrors] = useState({});
  const categories =
    props.categories &&
    props.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

  const handleNewBookName = (inputValue) => {
    console.log("abcd");
    const newValue = {
      value: inputValue.toLowerCase(),
      label: inputValue,
      isNew: true,
    };

    setDetails({
      ...details,
      name: newValue,
      author: "",
      isbn: "",
      edition: "",
    });
  };

  const loadBookNames = useCallback(
    _.debounce((inputValue, callback) => {
      try {
        get(bookUploadApi.getBookNames, true, { query: inputValue }).then(
          ([books]) => {
            callback(
              books.map((item) => ({ value: item.id, label: item.name }))
            );
          }
        );
      } catch (err) {
        console.log(err);
      }
    }, 300),
    []
  );

  const handleBookChange = async () => {
    if (details.name) {
      if (!details.name.isNew) {
        setloading(true);
        try {
          const [bookDetails] = await get(
            bookUploadApi.getBookDetails(details.name.value)
          );
          const { isbn, author, edition, publisher } = bookDetails;
          setDetails({ ...details, isbn, author, edition, publisher });
        } catch (err) {
          alert(err);
        }
        setloading(false);
      }
    }
  };
  React.useEffect(() => {
    handleBookChange();
  }, [details.name]);
  const handleCategoryChange = (inputValue) => {
    setDetails({ ...details, category: inputValue, subcategory: {} });

    setSubCategories(
      props.categories
        .find((category) => category.id === inputValue.value)
        ["subcategories"].map((subcategory) => ({
          value: subcategory.id,
          label: subcategory.name,
        }))
    );
  };

  const validateForm = () => {
    const errors = {};
    if (!details.category) {
      errors.category = true;
    }
    if (!details.subcategory || !details.subcategory.value) {
      errors.subcategory = true;
    }
    if (!details.name) {
      errors.name = true;
    }
    if (!details.author || details.author.length === 0) {
      errors.author = true;
    }
    if (!details.publisher || details.publisher.length === 0) {
      errors.publisher = true;
    }
    if (!details.isbn || !details.isbn.match(/^[0-9]{13}|[0-9]{11}$/)) {
      errors.isbn = true;
    }

    if (!details.frontCover || details.frontCover.length === 0) {
      errors.frontcover = true;
    }
    if (!details.backCover || details.backCover.length === 0) {
      errors.backcover = true;
    }
    if (!details.quantity || details.quantity < 1) {
      errors.quantity = true;
    }

    if (!details.firstPage || details.firstPage.length === 0) {
      errors.firstPage = true;
    }

    if (!details.prices.mrp || details.prices.mrp <= 0) {
      errors.mrp = true;
    }
    if (!details.prices.sellingPrice || details.prices.sellingPrice <= 0) {
      errors.sellingPrice = true;
    }

    if (details.buyBackEnabled) {
      if (!details.prices.deposit || details.prices.deposit <= 0) {
        errors.deposit = true;
      }
      if (
        Object.keys(details.prices).filter(
          (key) => !["mrp", "sellingPrice", "deposit"].includes(key)
        ).length === 0
      ) {
        errors.buybacks = true;
      }
    }

    return errors;
  };
  const submitBook = () => {
    console.log(details);
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      alert("There are errors in your form");
      return;
    }
    uploadBook();
  };

  async function uploadBook() {
    setloading(true);
    try {
      const postData = {
        name: details.name.label,
        subCatId: details.subcategory.value,
        quantity: details.quantity,
        isbn: details.isbn,
        author: details.author,
        edition: details.edition,
        publisher: details.publisher,
        isBuyBackEnabled: details.buyBackEnabled,
        mrp: details.prices.mrp,
        deposit: details.prices.deposit,
        onemonthrent: details.prices.oneMonth,
        threemonthrent: details.prices.threeMonth,
        sixmonthrent: details.prices.sixMonth,
        ninemonthrent: details.prices.nineMonth,
        twelvemonthrent: details.prices.twelveMonth,
        sellPrice: details.prices.sellingPrice,
        frontCover: details.frontCover[0],
        backCover: details.backCover[0],
        frontPage: details.firstPage[0],
        otherImgs: details.otherImages,
      };
      const [res] = await post(bookUploadApi.upload, true, postData);
      alert(res.message);
      window.location.href = "/profile/books";
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  }

  if (!props.isSeller) {
    return <Redirect to="seller-registration" />;
  }
  return (
    <Container className="my-4 upload-form" fluid>
      {isLoading && (
        <OverLay style={{ position: "fixed", top: 0, left: 0 }}>
          <OverlayLoader style={{ position: "absolute", top: "45vh" }} />
        </OverLay>
      )}

      <Row className="justify-content-center">
        <Col style={{ borderRadius: 5 }} md={7}>
          <Card>
            <Card.Header>
              <h3 className="text-center py-2 mb-0">SELL YOUR BOOK</h3>
            </Card.Header>
            <Card.Body>
              <Row>
                <h4>INCLUDE SOME DETAILS</h4>
              </Row>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="book-category">
                      <Form.Label>Category *</Form.Label>
                      <Select
                        value={details.category}
                        options={categories}
                        onChange={handleCategoryChange}
                      />
                      {errors.category && (
                        <p className=" error text-danger">
                          category is required
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="book-subcategory">
                      <Form.Label>Sub-Category *</Form.Label>
                      <Select
                        value={details.subcategory}
                        options={subCategories}
                        noOptionsMessage={() => "Select a category first"}
                        onChange={(inputValue) =>
                          setDetails({ ...details, subcategory: inputValue })
                        }
                      />
                      {errors.subcategory && (
                        <p className=" error text-danger">
                          subcategory is required
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="book-name">
                      <Form.Label>Book Name *</Form.Label>
                      <AsyncCreatableSelect
                        isClearable
                        value={details.name}
                        options={[{ value: 1, label: "abcd" }]}
                        onChange={(inputValue) =>
                          setDetails({ ...details, name: inputValue })
                        }
                        allowCreateWhileLoading={false}
                        createOptionPosition="first"
                        noOptionsMessage={() =>
                          "Start Typing to get recommendations"
                        }
                        onCreateOption={handleNewBookName}
                        cacheOptions
                        loadOptions={loadBookNames}
                      />
                      {errors.name && (
                        <p className=" error text-danger">
                          Book Name is required
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="book-author">
                      <Form.Label>Author *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={details.author}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            author: event.target.value,
                          });
                        }}
                        placeholder="Author Name"
                      />
                      {errors.author && (
                        <p className=" error text-danger">
                          Author Name is required
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="book-publisher">
                      <Form.Label>publisher *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={details.publisher}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            publisher: event.target.value,
                          });
                        }}
                        placeholder="publisher Name"
                      />
                      {errors.publisher && (
                        <p className=" error text-danger">
                          publisher Name is required
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="book-edition">
                      <Form.Label>Edition </Form.Label>
                      <Form.Control
                        type="text"
                        value={details.edition}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            edition: event.target.value,
                          });
                        }}
                        placeholder="book edition"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="book-isbn">
                      <Form.Label>ISBN *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        pattern="[0-9]{13}|[0-9]{11}"
                        value={details.isbn}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            isbn: event.target.value,
                          });
                        }}
                        placeholder="Enter the ISBN of the book"
                      />
                      {errors.isbn && (
                        <p className=" error text-danger">Enter valid ISBN</p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="book-quantity">
                      <Form.Label>Quantity *</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        min={1}
                        value={details.quantity}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            quantity: event.target.value,
                          });
                        }}
                      />
                      {errors.quantity && (
                        <p className=" error text-danger">
                          Quantity should be greater than 0
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <hr />
                <Row>
                  <h4>UPLOAD IMAGES</h4>
                </Row>
                <Row>
                  <Col className="mb-3" md={4} xs={12}>
                    <ImageUpload
                      onChange={(files) =>
                        setDetails({ ...details, frontCover: [...files] })
                      }
                      onLoad={setloading}
                      tag="Front Cover"
                      prefix="front"
                      maxImages={1}
                    />
                    {errors.frontcover && (
                      <p className=" error text-danger">
                        Front cover is required
                      </p>
                    )}
                  </Col>
                  <Col className="mb-3" md={4} xs={12}>
                    <ImageUpload
                      onChange={(files) =>
                        setDetails({ ...details, backCover: [...files] })
                      }
                      tag="Back Cover"
                      prefix="back"
                      onLoad={setloading}
                      maxImages={1}
                    />
                    {errors.backcover && (
                      <p className=" error text-danger">
                        Back cover is required
                      </p>
                    )}
                  </Col>
                  <Col className="mb-3" md={4} xs={12}>
                    <ImageUpload
                      onChange={(files) =>
                        setDetails({ ...details, firstPage: [...files] })
                      }
                      tag="First Page"
                      onLoad={setloading}
                      prefix="first_page"
                      maxImages={1}
                    />
                    {errors.firstPage && (
                      <p className=" error text-danger">
                        first page is required
                      </p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ImageUpload
                      onChange={(files) =>
                        setDetails({ ...details, otherImages: [...files] })
                      }
                      tag="Any other Images of the book. Max 3"
                      maxImages={3}
                      onLoad={setloading}
                      prefix="other"
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <h4>SET A PRICE</h4>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="book-mrp">
                      <Form.Label>Enter Book MRP *</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        step={0.01}
                        value={details.prices.mrp}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            prices: {
                              ...details.prices,
                              mrp: event.target.value,
                            },
                          });
                        }}
                      />
                      {errors.mrp && (
                        <p className=" error text-danger">MRP is required</p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="book-sellingprice">
                      <Form.Label>Enter Book Selling Price *</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        step={0.01}
                        value={details.prices.sellingPrice}
                        onChange={(event) => {
                          setDetails({
                            ...details,
                            prices: {
                              ...details.prices,
                              sellingPrice: event.target.value,
                            },
                          });
                        }}
                      />
                      {errors.sellingPrice && (
                        <p className=" error text-danger">
                          Selling price is required
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Check
                      type="switch"
                      checked={details.buyBackEnabled}
                      id="custom-switch"
                      onChange={(event) => {
                        console.log(event.target.value);
                        setDetails({
                          ...details,
                          buyBackEnabled: !details.buyBackEnabled,
                        });
                      }}
                      label="Opt for BuyBack"
                    />
                    {errors.buybacks && (
                      <p className=" error text-danger">
                        Atleast one buyback amount is required
                      </p>
                    )}
                  </Col>
                </Row>
                {details.buyBackEnabled && (
                  <div>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="book-onemonth-buyback">
                          <Form.Label>Price for one Month</Form.Label>
                          <Form.Control
                            type="number"
                            step={0.01}
                            value={details.prices.oneMonth}
                            onChange={(event) => {
                              setDetails({
                                ...details,
                                prices: {
                                  ...details.prices,
                                  oneMonth: event.target.value,
                                },
                              });
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="book-threeMonth-buyback">
                          <Form.Label>Price for three Months</Form.Label>
                          <Form.Control
                            type="number"
                            step={0.01}
                            value={details.prices.threeMonth}
                            onChange={(event) => {
                              setDetails({
                                ...details,
                                prices: {
                                  ...details.prices,
                                  threeMonth: event.target.value,
                                },
                              });
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="book-sixmonth-buyback">
                          <Form.Label>Price for six Months</Form.Label>
                          <Form.Control
                            type="number"
                            step={0.01}
                            value={details.prices.sixMonth}
                            onChange={(event) => {
                              setDetails({
                                ...details,
                                prices: {
                                  ...details.prices,
                                  sixMonth: event.target.value,
                                },
                              });
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="book-nineMonth-buyback">
                          <Form.Label>Price for nine Months</Form.Label>
                          <Form.Control
                            type="number"
                            step={0.01}
                            value={details.prices.nineMonth}
                            onChange={(event) => {
                              setDetails({
                                ...details,
                                prices: {
                                  ...details.prices,
                                  nineMonth: event.target.value,
                                },
                              });
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="book-twelvemonth-buyback">
                          <Form.Label>Price for 12 Months</Form.Label>
                          <Form.Control
                            type="number"
                            step={0.01}
                            value={details.prices.twelveMonth}
                            onChange={(event) => {
                              setDetails({
                                ...details,
                                prices: {
                                  ...details.prices,
                                  twelveMonth: event.target.value,
                                },
                              });
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="book-deposit-buyback">
                          <Form.Label>Book Deposit</Form.Label>
                          <Form.Control
                            type="number"
                            step={0.01}
                            value={details.prices.deposit}
                            onChange={(event) => {
                              setDetails({
                                ...details,
                                prices: {
                                  ...details.prices,
                                  deposit: event.target.value,
                                },
                              });
                            }}
                          />
                          {errors.deposit && (
                            <p className=" error text-danger">
                              Deposit is required
                            </p>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}

                <Col md={6} className=" mt-4 mx-auto">
                  <Button block onClick={submitBook}>
                    SUBMIT
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  isSeller: state.user.profile.isSeller,
});
export default withRouter(connect(mapStateToProps)(BookUpload));
