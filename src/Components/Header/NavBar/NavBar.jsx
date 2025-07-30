import React, { useContext } from "react"; // 1. IMPORT useContext
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";

import styles from "./navbar.module.css";
import amazonIcon from "../../../assets/images/logo/amazonlogo.png";
import cartIcon from "../../../assets/images/logo/cart.png";
import usaIcon from "../../../assets/images/logo/usa.png";
import { DataContext } from "../../DataProvider/DataProvider";
import { auth } from "../../../Utility/firebase";

const NavBar = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // This correctly calculates the total number of items, not just unique products.
  const totalItems = basket.reduce((total, item) => total + item.amount, 0);

  return (
    <nav className={styles.navbar}>
      {/* Hamburger Menu */}
      <div
        className={`${styles.navbarHamburgerMenu} ${styles.navbarItemHoverable}`}
      >
        <FiMenu />
      </div>

      {/* Logo */}
      <Link
        to="/"
        className={`${styles.leftNavBarLogo} ${styles.navbarItemHoverable}`}
      >
        <img
          className={styles.amazonLogoNavbar}
          src={amazonIcon}
          alt="Amazon Logo"
        />
      </Link>

      {/* Location */}
      <div className={`${styles.navbarLocation} ${styles.navbarItemHoverable}`}>
        <IoLocationOutline className={styles.navbarLocationImgIcon} />
        <div className={styles.navbarLocationPlace}>
          <div className={styles.navbarLocationTop}>Deliver to</div>
          <div className={styles.navbarLocationBottom}>United States</div>
        </div>
      </div>

      {/* Search Box */}
      <div className={styles.navbarSearchBox}>
        <div className={styles.navbarSearchDiv}>
          <div className={styles.navbarSearchBoxAll}>
            <span className={styles.navbarSearchBoxAllText}>All</span>
            <MdArrowDropDown className={styles.dropdownIcon} />
          </div>
          <input
            type="text"
            className={styles.navbarInputSearchBox}
            placeholder="Search Amazon"
          />
          <button className={styles.searchIconNavBar} aria-label="Search">
            <CiSearch className={styles.searchIconNavbarIcon} />
          </button>
        </div>
      </div>

      {/* Right Side Group */}
      <div className={styles.rightsideNavbar}>
        {/* Flag/Language */}
        <div className={`${styles.flag} ${styles.navbarItemHoverable}`}>
          <img src={usaIcon} alt="USA Flag" className={styles.flagLogo} />
          <div className={styles.flagNavbarTextContainer}>
            EN <MdArrowDropDown className={styles.dropdownIconLanguage} />
          </div>
        </div>

        {/* Sign In & Account */}
        <Link
          to={!user ? "/auth" : "/"}
          className={`${styles.signInNavbar} ${styles.navbarItemHoverable}`}
        >
          <BsPerson className={styles.personIcon} />
          <div className={styles.signInTextContainer}>
            {user ? (
              <>
                <div className={styles.topNavbar}>
                  Hello, {user.email?.split("@")[0]}
                </div>
                <div
                  className={styles.bottomNavbarAccount}
                  onClick={() => auth.signOut()}
                >
                  Sign Out
                </div>
              </>
            ) : (
              <>
                <div className={styles.topNavbar}>Hello, Sign in</div>
                <div className={styles.bottomNavbarAccount}>
                  Account & Lists{" "}
                  <MdArrowDropDown className={styles.dropdownIconAccount} />
                </div>
              </>
            )}
          </div>
        </Link>

        {/* Returns & Orders */}
        <Link
          to="/orders"
          className={`${styles.returnsOrdersNavbar} ${styles.navbarItemHoverable}`}
        >
          <div className={styles.signInTextContainer}>
            <div className={styles.topNavbar}>Returns</div>
            <div className={styles.bottomNavbar}>& Orders</div>
          </div>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className={`${styles.cartContainerNavbar} ${styles.navbarItemHoverable}`}
        >
          {/* ==================================================================== */}
          {/* FIX: Display the total number of items instead of the number of unique items. */}
          {/* ==================================================================== */}
          <div className={styles.cartItemNumberNavbar}>{totalItems}</div>
          <div className={styles.cartContent}>
            <img src={cartIcon} alt="Cart" className={styles.cartLogo} />
            <span className={styles.cartTitle}>Cart</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;