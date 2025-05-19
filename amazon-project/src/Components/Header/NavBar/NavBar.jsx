import React from "react";
import amazon from "../../../assets/images/logo/amazonlogo.png";
import cart from "../../../assets/images/logo/cart.png";
import usa from "../../../assets/images/logo/usa.png";
import { IoLocationOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import classes from "./navbar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      {/* Left Side */}
      <div className={classes.leftNavBar}>
        {/* Logo */}
        <Link to={'/'} className={classes.leftNavBarLogo}>
          <img
            className={classes.amazonLogoNavbar}
            src={amazon}
            alt="Amazon Logo"
          />
        </Link>
        {/* Location */}
        <div className={classes.navbarLocation}>
          <IoLocationOutline className={classes.navbarLocationImgIcon} />
          <div className={classes.navbarLocationPlace}>
            <div className={classes.navbarLocationTop}>Deliver to</div>
            <div className={classes.navbarLocationBottom}>Update Location</div>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className={classes.navbarSearchBox}>
        <div className={classes.navbarSearchDiv}>
          <div className={classes.navbarSearchBoxAll}>
            <span className={classes.navbarSearchBoxAllText}>All</span>
            <MdArrowDropDown className={classes.dropdownIcon} />
          </div>
          <input
            type="text"
            className={classes.navbarInputSearchBox}
            placeholder="Search Amazon"
          />
          <div className={classes.searchIconNavBar}>
            <CiSearch className={classes.searchIconNavbarIcon} />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className={classes.rightsideNavbar}>
        {/* Flag/Language */}
        <div className={classes.flag}>
          <img src={usa} alt="USA Flag" className={classes.flagLogo} />
          <div className={classes.flagNavbar}>
            EN <MdArrowDropDown className={classes.usaNavbarDrop} />
          </div>
        </div>

        {/* Sign In */}
        <div className={classes.signInNavbar}>
          <div className={classes.topNavbar}>Hello, Sign in</div>
          <div className={classes.usaNavbarBelt}>Account & Lists</div>
        </div>

        {/* Returns & Orders */}
        <div className={classes.signInNavbar}>
          <div className={classes.topNavbar}>Returns</div>
          <div className={classes.usaNavbar}>& Orders</div>
        </div>

        {/* Cart */}
        <div className={`${classes.signInNavbar} ${classes.cartContainerNavbar}`}>
          <div className={classes.cartItemNumberNavbar}>2</div>
          <div className={classes.cartContent}> 
            <img src={cart} alt="Cart" className={classes.cartLogo} />
            <span className={classes.cartTitle}>Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;