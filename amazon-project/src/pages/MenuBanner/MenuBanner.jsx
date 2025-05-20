import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./data";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


import "./menuBanner.css";
import product from "../../../../../../amazon/Amazon-Clone/src/pages/product.json";
const MenuBanner = () => {
  return (
    <>
        <Carousel
        className="homeBanner"
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false} 
      >
        {img.map((imageItem, index) => (
          <div key={index} className="imageContainer">
            <img className="homeBannerImg" src={imageItem} alt={`Slide ${index + 1}`} />
            <div className="blurOverlay" />
          </div>
        ))}
      </Carousel>
      {/* <div className="homeBannerImg"></div> */}

      <div className="homeProduct">
        {product.product.map((item, index) => {
          return (
            <div className="itemCard">
              <div className="itemCardTitle">{item.itemTitle}</div>
              <div className="itemImage">
                {item.imgs.map((it, ind) => {
                  return (
                    <div className="imgList">
                      <img className="imgBanner" src={it.url} alt="" />
                      <div className="imageName">{it.productName}</div>
                    </div>
                  );
                })}

         
              </div>
              <div className="seeMore">See More</div>
            </div>
          );
        })}

   
      </div>
    </>
  );
};

export default MenuBanner;
