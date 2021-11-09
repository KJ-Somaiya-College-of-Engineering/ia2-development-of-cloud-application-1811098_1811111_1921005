import React, { useState } from "react";
import "./ProductSearchResults.scss";
import { Container, Row } from "react-bootstrap";
import MetaTags from "react-meta-tags";

import { connect } from "react-redux";
import SideBar from "./sideBar";
import ProductsPaginator from "./ProductsPaginator";
const ProductSearchResults = ({ categories = [], ...props }) => {
  const displaySubCat = props.isSearch !== true;

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  React.useEffect(() => {
    const currCategory = categories.find(
      (category) => category.id == props.match.params.catId
    );
    setCategoryName(currCategory?.name);
    console.log(currCategory);
    const currSubCategory = currCategory
      ? currCategory.subcategories.find(
          (subcat) => subcat.id == props.match.params.subCatId
        )
      : {};
    setSubCategoryName(currSubCategory?.name || "");
  }, [props.match.params.catId, props.match.params.subCatId, categories]);
  return (
    <Container fluid>
      <MetaTags>
        <title>{`Buy or Rent ${categoryName} ${subCategoryName} books online at cheap price on Martolex.com.`}</title>
        <meta
          name="description"
          content={`Martolex.com : Buy or Rent ${categoryName} ${subCategoryName} books online at cheap price on Martolex.com.`}
        />
      </MetaTags>
      <Row className="pt-3 pb-5">
        <SideBar
          displaySubCat={displaySubCat}
          catId={props.match.params.catId}
          subCatId={props.match.params.subCatId}
        />
        <ProductsPaginator
          isSearch={!displaySubCat}
          catId={props.match.params.catId}
          subCatId={props.match.params.subCatId}
          queryString={props.location.search}
        />
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(ProductSearchResults);
