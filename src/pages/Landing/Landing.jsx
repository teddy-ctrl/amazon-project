import React from "react";
import Carousel from '../../Components/Carousel/Carousel'
import LayOut from "../../Components/LayOut/LayOut";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Product";

const Landing = () => {
  return (
    <LayOut>
      <Carousel />
      <Category /> 
      <Product />
    </LayOut>
  );
};

export default Landing;
