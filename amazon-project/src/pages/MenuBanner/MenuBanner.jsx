import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import product from "./Category.js";
import styles from "./menuBanner.module.css";

// Note: This project is a learning exercise to practice web development concepts,
// including React, CSS, and carousel functionality, inspired by Amazon's homepage.

const MenuBanner = () => {
  return (
    <>
      <Carousel
        className={styles.homeBanner}
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {img.map((imageItem, index) => (
          <div key={index} className={styles.imageContainer}>
            <img
              className={styles.homeBannerImg}
              src={imageItem}
              alt={`Slide ${index + 1}`}
            />
            <div className={styles.blurOverlay} />
          </div>
        ))}
      </Carousel>

      <div className={styles.homeProduct}>
        {product.map((item, index) => (
          <div className={styles.itemCard} key={item.id}>
            <div className={styles.itemCardTitle}>{item.name}</div>
            <div className={styles.itemImage}>
              <img
                className={styles.imgBanner}
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  console.warn(`Failed to load image for ${item.name}: ${item.image}`);
                  e.target.src = "https://source.unsplash.com/random/640x480/?tech";
                }}
              />
            </div>
            <div className={styles.seeMore}>See More</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuBanner;