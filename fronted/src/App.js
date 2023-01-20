import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home";
// import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOption from "./component/layout/Header/UserOption.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey,setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);

  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Dorid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
    
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOption user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />

        {isAuthenticated && (
          <Route exact path="/account" element={<Profile />} />
        )}
        {isAuthenticated && (
          <Route exact path="/me/update" element={<UpdateProfile />} />
        )}
        {isAuthenticated && (
          <Route exact path="/password/update" element={<UpdatePassword />} />
        )}
        {isAuthenticated && (
          <Route exact path="/shipping" element={<Shipping />} />
        )}
        {isAuthenticated && (
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        )}
       {/* {stripeApiKey &&(
        <Elements stripe={loadStripe(stripeApiKey)}>
           {isAuthenticated && (
          <Route exact path="/process/payment" element={<Payment />} />
        )}
        </Elements>
       )

       } */}
      
        {isAuthenticated && (
          <Route exact path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
        )}
      

        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
