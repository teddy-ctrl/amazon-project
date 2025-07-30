import React from 'react';
import product from "../product.json";
import { Link } from 'react-router-dom';
// This assumes your stylesheet is a CSS Module, as per your last file.
// If it's a regular .css file, just make sure the path is correct.
import styles from "./menuBanner.module.css"; 

const ProductGrid = () => {
    // YOUR ORIGINAL FUNCTIONS ARE KEPT, UNTOUCHED
    const getImageContainerClass = (imageCount) => {
      if (imageCount === 1) return styles['itemImage--single'];
      if (imageCount === 3) return styles['itemImage--featured3'];
      return styles['itemImage--grid'];
    };

    const createCategorySlug = (name) => {
        if (!name) return 'unknown';
        return name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, 'and');
    }

  return (
    <div className={styles.homeProduct}>
      {(product?.product || []).map((item, index) => {
        const categorySlug = createCategorySlug(item.imgs[0]?.category || item.itemTitle);
        
        // --- THIS IS THE ONLY NEW LOGIC ADDED ---
        // We reliably check the title's character length.
        // 38 is a good threshold for when a title is likely to wrap to a new line.
        const titleIsLong = item.itemTitle.length > 38;
        
        // The special layout applies only if the title is long AND there are 4+ images.
        const useSpecialLayout = titleIsLong && item.imgs.length >= 4;
        
        // This variable is still calculated, for use in the 'else' block below.
        const containerClass = getImageContainerClass(item.imgs.length);

        return (
          <Link
            key={index}
            to={`/category/${categorySlug}`}
            className={styles.card}
            aria-label={`Shop ${item.itemTitle}`}
          >
            <h2 className={styles.itemCardTitle}>{item.itemTitle}</h2>
            
            {/*
              --- THIS IS THE ONLY STRUCTURAL CHANGE ---
              A simple switch to decide which layout to render.
            */}
            {useSpecialLayout ? (
              // IF THE TITLE IS LONG, render the new special layout.
              <div className={`${styles.itemImage} ${styles['itemImage--longTitleLayout']}`}>
                {item.imgs.slice(0, 4).map((imgData, imgIndex) => (
                    // The CSS handles which image is big and which are small
                    <div key={imgIndex} className={styles.imgList}>
                      <img
                        className={styles.imgBanner}
                        src={imgData.url}
                        alt={imgData.productName}
                      />
                      <div className={styles.imageName}>{imgData.productName}</div>
                    </div>
                  ))}
              </div>
            ) : (
              // ELSE, RENDER YOUR ORIGINAL, UNTOUCHED CODE BLOCK
              <div className={`${styles.itemImage} ${containerClass}`}>
                {item.imgs.map((imgData, imgIndex) => {
                  const isFeaturedItem = item.imgs.length === 3 && imgIndex === 0;
                  return (
                    <div
                      key={imgIndex}
                      className={`${styles.imgList} ${isFeaturedItem ? styles['imgList--featured'] : ""}`}
                    >
                      <img
                        className={styles.imgBanner}
                        src={imgData.url}
                        alt={imgData.productName}
                      />
                      <div className={styles.imageName}>{imgData.productName}</div>
                    </div>
                  );
                })}
              </div>
            )}
            
            <div className={styles.seeMore}>See More</div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductGrid;