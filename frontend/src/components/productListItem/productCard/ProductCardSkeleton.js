import React from "react";
import Skeleton from "react-loading-skeleton";
import "./ProductCard.scss";
const ProductCardSkeleton = ({ style }) => {
  return (
    <div className="product" style={style}>
      <div className="product-img w-100">
        <h1 className="w-100">
          <Skeleton height={180} />
        </h1>
      </div>
      <div className="product-info">
        <a href="" className="prod-name">
          <Skeleton height={25} />
        </a>
        <p className="prod-author">
          <Skeleton />
        </p>
        <p className="prod-publisher">
          <Skeleton />
        </p>

        <p className="w-100 mb-1">
          <Skeleton />
        </p>

        <h1 className="w-100 mt-0">
          <Skeleton />
        </h1>
        <div className="prices w-100">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
