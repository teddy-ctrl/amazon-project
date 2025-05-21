import React from "react";
import { Routes, Route } from "react-router-dom";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Landing from "./pages/Landing/Landing";
import Signup from "./pages/Auth/Signup";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Signup />} />
      <Route path="/payments" element={<Payment />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRouter;