import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const LayOut = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LayOut;
