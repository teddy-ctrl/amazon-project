import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./data.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./MenuBanner.module.css"; // Use the new CSS module
import ProductGrid from "./ProductGrid.jsx";

const MenuBanner = () => {
  return (
    <>
      <div className={styles.homeBanner}>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
        >
          {img.map((imageItem, index) => (
            <div key={index}>
              <img
                className={styles.homeBannerImg}
                src={imageItem}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      </div>
      
      {/* This container now correctly applies the overlap effect */}
      <div className={styles.productGridContainer}>
        <ProductGrid />
      </div>
    </>
  );
};

export default MenuBanner;