import React from 'react';
import styles from './footer.module.css';
import amazonIcon from '../../assets/images/logo/amazonlogo.png';
import usaIcon from '../../assets/images/logo/usa.png';
import { TbWorld } from "react-icons/tb";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Back to Top */}
      <div className={styles.backToTop}>
        <p>Back to top</p>
      </div>

      {/* Main Footer Links */}
      <div className={styles.footerLinksContainer}>
        <div className={styles.footerLinks}>
          {/* Get to Know Us */}
          <div className={styles.footerColumn}>
            <p className={styles.columnTitle}>Get to Know Us</p>
            <ul>
              <li><a href="#" className={styles.footerLink}>Careers</a></li>
              <li><a href="#" className={styles.footerLink}>Blog</a></li>
              <li><a href="#" className={styles.footerLink}>About Amazon</a></li>
              <li><a href="#" className={styles.footerLink}>Investor Relations</a></li>
              <li><a href="#" className={styles.footerLink}>Amazon Devices</a></li>
              <li><a href="#" className={styles.footerLink}>Amazon Science</a></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div className={styles.footerColumn}>
            <p className={styles.columnTitle}>Make Money with Us</p>
            <ul>
              <li><a href="#" className={styles.footerLink}>Sell products on Amazon</a></li>
              <li><a href="#" className={styles.footerLink}>Sell on Amazon Business</a></li>
              <li><a href="#" className={styles.footerLink}>Sell apps on Amazon</a></li>
              <li><a href="#" className={styles.footerLink}>Become an Affiliate</a></li>
              <li><a href="#" className={styles.footerLink}>Advertise Your Products</a></li>
              <li><a href="#" className={styles.footerLink}>Self-Publish with Us</a></li>
              <li><a href="#" className={styles.footerLink}>Host an Amazon Hub</a></li>
              <li><a href="#" className={styles.footerLink}>See More Make Money with Us</a></li>
            </ul>
          </div>

          {/* Amazon Payment Products */}
          <div className={styles.footerColumn}>
            <p className={styles.columnTitle}>Amazon Payment Products</p>
            <ul>
              <li><a href="#" className={styles.footerLink}>Amazon Business Card</a></li>
              <li><a href="#" className={styles.footerLink}>Shop with Points</a></li>
              <li><a href="#" className={styles.footerLink}>Reload Your Balance</a></li>
              <li><a href="#" className={styles.footerLink}>Amazon Currency Converter</a></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div className={styles.footerColumn}>
            <p className={styles.columnTitle}>Let Us Help You</p>
            <ul>
              <li><a href="#" className={styles.footerLink}>Amazon and COVID-19</a></li>
              <li><a href="#" className={styles.footerLink}>Your Account</a></li>
              <li><a href="#" className={styles.footerLink}>Your Orders</a></li>
              <li><a href="#" className={styles.footerLink}>Shipping Rates & Policies</a></li>
              <li><a href="#" className={styles.footerLink}>Returns & Replacements</a></li>
              <li><a href="#" className={styles.footerLink}>Manage Your Content and Devices</a></li>
              <li><a href="#" className={styles.footerLink}>Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* Footer Icons and Links */}
      <div className={styles.footerIconsContainer}>
        <Link to='/'><img
          src={amazonIcon}
          alt="Amazon Logo"
          className={styles.amazonLogo}
        /></Link>
        
        <div className={styles.footerIcons}>
          <div className={styles.iconItem}>
            <TbWorld />
            <span>United States</span>
          </div>
          <div className={styles.iconItem}>
            <span>$ USD - U.S. Dollar</span>
          </div>
          <div className={styles.iconItem}>
            <img
              src={usaIcon}
              alt="USA Flag"
              className={styles.flagIcon}
            />
            <span>English</span>
          </div>
        </div>
      </div>
      <div className={styles.privacy}>
        <div className={styles.notice}>
          <a href="">Condition of Use</a>
          <a href="">Privacy Notice</a>
          <a href="">Consumer Health Data Privacy Disclosure </a>
          <a href="">Your Ads Privacy Choices</a>
        </div>
        <p className={styles.copy}>$copy 1996-2025,Amazon-project,inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;