import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Carousel.module.css";

const HomeCarousel = () => {
  return (
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
  );
};

export default HomeCarousel;