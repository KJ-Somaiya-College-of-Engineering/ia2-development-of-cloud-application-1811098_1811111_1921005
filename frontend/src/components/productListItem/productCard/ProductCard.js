import React from "react";
import ReactStars from "react-stars";
import "./ProductCard.scss";
import { buildBookDetailsUrl } from "../../../utils/buildUrl";
import { getMinPlan } from "../../../utils/produtUtils";
import { Link } from "react-router-dom";

const ProductCard = ({ product, ...props }) => {
  const productPlan = getMinPlan(product);
  const price = product.rent[productPlan];
  const discount = (
    ((product.rent.mrp - price) / product.rent.mrp) *
    100
  ).toFixed(0);
  return (
    <div className="product" style={props.style}>
      <div className="product-img">
        <Link to={buildBookDetailsUrl(product.id)}>
          <img
            alt={`${product.name} cover image}`}
            src={product.images[0]?.url || "/book1.png"}
          />
        </Link>
      </div>
      <div className="product-info">
        <Link
          to={buildBookDetailsUrl(product.id)}
          className="prod-name btn-link"
        >
          {product.name}
        </Link>
        <p className="prod-author">Author: {product.author}</p>
        <p className="prod-publisher">Publisher: {product.publisher}</p>

        {product.isBuyBackEnabled ? (
          <p className="prod-publisher text-success">Buyback available</p>
        ) : (
          <p className="prod-publisher text-danger">Buyback not available</p>
        )}

        <ReactStars
          className="rating"
          count={5}
          value={product.rating}
          edit={false}
          size={30}
          color2={"#ffd700"}
        />
        <div className="prices">
          <span className="price">&#8377;{price}/-</span>
          <span className="actual-price">&#8377;{product.rent.mrp}/-</span>
          <span className="discount">save {discount}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
