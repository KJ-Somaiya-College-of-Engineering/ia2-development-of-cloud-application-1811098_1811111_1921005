import React, { useState } from "react";
import "./navBar.scss";
import { FaUser } from "react-icons/fa";
import SubMenu from "./SubMenu";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  const [isMenuopen, setMenuOpen] = useState(false);
  const togglemenu = () => {
    setMenuOpen(!isMenuopen);
  };
  return (
    <div>
      <ul className="navbar">
        <li>
          <Link className="btn-link hover-link bold" to="/">
            home
          </Link>
        </li>
        <li onClick={togglemenu}>
          {isMenuopen && <SubMenu />}
          Books
        </li>

        <li>
          <Link className="btn-link hover-link bold" to="/static/how_it_works">
            how it works
          </Link>
        </li>
        <li>
          <Link className="btn-link hover-link bold" to="/static/about_us">
            About us
          </Link>
        </li>

        <li>
          <Link className="btn-link hover-link bold" to="/notFound">
            didn't find your book
          </Link>
        </li>
        <li>
          <Link className="btn-link hover-link bold" to="/upload-book">
            Sell your book
          </Link>
        </li>

        <li onClick={props.openDashBoard}>
          <FaUser />
          my account
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
