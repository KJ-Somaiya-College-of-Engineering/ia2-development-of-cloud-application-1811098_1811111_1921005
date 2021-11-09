import React from "react";
import "./productListing.scss";
import ProductCard from "../productListItem/productCard/ProductCard";
import ProductRow from "../productListItem/ProductListItem/ProductListItem";
import ProductCardSkeleton from "../productListItem/productCard/ProductCardSkeleton";
import NoProducts from "./NoProducts";
const ProductListing = ({ displayType, products, isLoading, ...props }) => {
  // const Product = (props) => {
  //   return displayType == "grid" ? <ProductCard /> : <ProductRow />;
  // };

  const productCards =
    products.length > 0 ? (
      products.map((product) =>
        displayType === "grid" ? (
          <ProductCard key={product.id} product={product} />
        ) : (
          <ProductRow key={product.id} product={product} />
        )
      )
    ) : (
      <NoProducts />
    );

  const cardPlaceHolders = [...Array(6).keys()].map(() => (
    <ProductCardSkeleton />
  ));
  return (
    <div
      style={{ minHeight: "200px", ...props.style }}
      className="productListing"
    >
      {!isLoading ? productCards : cardPlaceHolders}
    </div>
  );
};

export default ProductListing;
