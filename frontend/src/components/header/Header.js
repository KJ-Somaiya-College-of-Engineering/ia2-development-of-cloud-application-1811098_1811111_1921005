import React, { useState } from "react";
import { FaOpencart, FaUser, FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import { BsHeart, BsSearch } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import "./header.scss";
import NavBar from "./navbar/navbar";
import { useViewportHook } from "../utils/viewPortHandler";
import { desktopRes } from "../../viewPortBreakpoints";
import MobileSearchbar from "./navbar/mobileSearchBar";
import NavBarMobile from "./navbar/navBarMobile";
import BottomNavbarMobile from "./navbar/BottomNavbarMobile";
import Login from "../auth/Login";
import Cart from "../Cart/Cart";
import { connect } from "react-redux";
import cartStats from "../../utils/cartStats";
import querystring from "querystring";
import { Link } from "react-router-dom";
const Header = (props) => {
  const { width } = useViewportHook();
  const [searchText, setSearchText] = useState("");
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isMenuopen, setMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };
  const togglemenu = () => {
    setMenuOpen(!isMenuopen);
  };
  const toggleLogin = () => {
    setLoginOpen(!isLoginOpen);
  };
  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const redirectToDashBoard = () => {
    window.location.href = "/profile";
  };

  const searchBooks = () => {
    window.location.href =
      "/search?" + querystring.stringify({ search: searchText });
  };
  return (
    <div>
      <div className="top-header">
        <span className="top-header-text ">
          <FaPhoneAlt className="phoneicon" size={15} />
          +91 8779639797 / +91 8369212005
        </span>
        {desktopRes < width && (
          <span className="top-header-text ">
            Free Delivery* | Easy Returns | COD Available
          </span>
        )}
      </div>
      <div className="main-header">
        <Link to="/">
          <img className="logo" src="/logo.png" alt="logo" />
        </Link>
        {desktopRes < width && (
          <div className="search-box">
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by Book Name, Author, ISBN, Publication"
            />
            <button onClick={searchBooks}>Search</button>
          </div>
        )}

        {desktopRes < width && (
          <div className="userButtons">
            <div
              className="item"
              onClick={!props.isLoggedIn ? toggleLogin : redirectToDashBoard}
            >
              <FaUser size={20} />
              <p>
                {props.isLoggedIn
                  ? `Hello,${props.profile.name}`
                  : `Login/register`}
              </p>
            </div>

            <div
              className="item cart"
              onClick={props.isLoggedIn ? toggleCart : toggleLogin}
            >
              <FaOpencart size={40} color="#3ac6bf" />
              <div className="label-div">
                <span>Shopping Cart</span>
                <div className="cart-amount">
                  <span>Rs. {props.cartStats.totalAmount.toFixed(2)}</span>
                  <FaChevronDown />
                </div>
              </div>
            </div>
          </div>
        )}
        {desktopRes > width && (
          <div className="nav-icons">
            <BsSearch onClick={toggleSearch} size={25} />
            <MdMenu onClick={togglemenu} size={30} />
          </div>
        )}
        {desktopRes > width && (
          <BottomNavbarMobile
            isLoggedIn={props.isLoggedIn}
            openLogin={toggleLogin}
            openCart={toggleCart}
            openDashBoard={redirectToDashBoard}
          />
        )}
      </div>
      {desktopRes < width && (
        <NavBar
          openDashBoard={!props.isLoggedIn ? toggleLogin : redirectToDashBoard}
        />
      )}

      <MobileSearchbar isOpen={isSearchOpen} closeSearch={toggleSearch} />
      <NavBarMobile isOpen={isMenuopen} closeMenu={togglemenu} />
      {<Login closeLogin={() => setLoginOpen(false)} isOpen={isLoginOpen} />}
      <Cart isOpen={isCartOpen} closeCart={toggleCart} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.auth,
  profile: state.user.profile,
  cartStats: cartStats(state.cart.items),
});

export default connect(mapStateToProps)(Header);
