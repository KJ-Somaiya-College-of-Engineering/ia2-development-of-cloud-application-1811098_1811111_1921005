import React from "react";
import { buildSubCatUrl, buildCatUrl } from "../../../utils/buildUrl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const SubMenu = ({ categories }) => {
  return (
    <ul className="submenu">
      {categories.map((category) => (
        <li key={category.id}>
          <a href={buildCatUrl(category.id)}>
            <span>{category.name}</span>
          </a>
          <ul>
            {category.subcategories.map((subCategory) => (
              <Link
                className="btn-link"
                key={subCategory.id}
                to={buildSubCatUrl(category.id, subCategory.id)}
              >
                <li>{subCategory.name}</li>
              </Link>
            ))}
          </ul>
        </li>
      ))}
      {/* <li>
        <span>item1</span>
        <ul>
          <li>subitem1</li>
          <li>subitem1</li>
          <li>subitem1</li>
          <li>subitem1</li>
        </ul>
      </li>
      <li>
        <span>item1</span>
        <ul>
          <li>subitem1</li>
          <li>subitem1</li>
          <li>subitem1</li>
        </ul>
      </li>
      <li>
        <span>item1</span>
      </li> */}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(SubMenu);
