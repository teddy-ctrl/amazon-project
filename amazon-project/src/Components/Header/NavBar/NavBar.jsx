import React from 'react';
import { Link } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import { MdArrowDropDown } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { FiMenu } from 'react-icons/fi'; // For hamburger menu
import { BsPerson } from 'react-icons/bs'; // For person icon

import styles from './navbar.module.css';
import amazonIcon from '../../../assets/images/logo/amazonlogo.png';
import cartIcon from '../../../assets/images/logo/cart.png';
import usaIcon from '../../../assets/images/logo/usa.png';

const NavBar = () => {
  return (
    <nav className={styles.navbar}> 
      {/* Hamburger Menu */}
      <div className={`${styles.navbarHamburgerMenu} ${styles.navbarItemHoverable}`}>
        <FiMenu />
      </div>

      {/* Logo - direct child of navbar for easier flex ordering if needed */}
      <Link to="/" className={`${styles.leftNavBarLogo} ${styles.navbarItemHoverable}`}>
        <img
          className={styles.amazonLogoNavbar}
          src={amazonIcon}
          alt="Amazon Logo"
        />
      </Link>

      {/* Location - direct child */}
      <div className={`${styles.navbarLocation} ${styles.navbarItemHoverable}`}>
        <IoLocationOutline className={styles.navbarLocationImgIcon} />
        <div className={styles.navbarLocationPlace}>
          <div className={styles.navbarLocationTop}>Deliver to</div>
          <div className={styles.navbarLocationBottom}>Ethiopia</div> {/* Updated to match image */}
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
          <button className={styles.searchIconNavBar} aria-label="Search"> {/* Changed to button for accessibility */}
            <CiSearch className={styles.searchIconNavbarIcon} />
          </button>
        </div>
      </div>

      {/* Right Side Group */}
      <div className={styles.rightsideNavbar}>
        {/* Flag/Language */}
        <div className={`${styles.flag} ${styles.navbarItemHoverable}`}>
          <img src={usaIcon} alt="USA Flag" className={styles.flagLogo} />
          <div className={styles.flagNavbarTextContainer}> {/* Added container for text and dropdown */}
            EN <MdArrowDropDown className={styles.dropdownIconLanguage} /> {/* Specific class for language dropdown */}
          </div>
        </div>

        {/* Sign In */}
        <div className={`${styles.signInNavbar} ${styles.navbarItemHoverable}`}>
          <BsPerson className={styles.personIcon} />
          <div className={styles.signInTextContainer}> {/* Container for text lines */}
            <div className={styles.topNavbar}>Hello, Sign in</div>
            <div className={styles.bottomNavbarAccount}>Account & Lists <MdArrowDropDown className={styles.dropdownIconAccount} /></div>
          </div>
        </div>

        {/* Returns & Orders */}
        <div className={`${styles.returnsOrdersNavbar} ${styles.navbarItemHoverable}`}> {/* More specific class */}
           <div className={styles.signInTextContainer}>
            <div className={styles.topNavbar}>Returns</div>
            <div className={styles.bottomNavbar}>& Orders</div>
           </div>
        </div>

        {/* Cart */}
        <div className={`${styles.cartContainerNavbar} ${styles.navbarItemHoverable}`}>
          <div className={styles.cartItemNumberNavbar}>0</div> {/* From your image */}
          <div className={styles.cartContent}>
            <img src={cartIcon} alt="Cart" className={styles.cartLogo} />
            <span className={styles.cartTitle}>Cart</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;