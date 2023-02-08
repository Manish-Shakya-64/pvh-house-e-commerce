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
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOption from "./component/layout/Header/UserOption.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import Error404 from './component/Error/Error404'


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
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
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
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

        {isAuthenticated && (
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}
        {isAuthenticated && (
          <Route exact path="/success" element={<OrderSuccess />} />
        )}
        {isAuthenticated && (
          <Route exact path="/orders" element={<MyOrders />} />
        )}
        {isAuthenticated && (
          <Route exact path="/order/:id" element={<OrderDetails />} />
        )}
        

          {/*--------------------- Admin Routes only---------------------- */}
        
        {isAuthenticated && user?.role === "admin" ? (
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="*" element={<Error404 />} />
        )}
        {isAuthenticated && user?.role === "admin" ? (
          <Route exact path="/admin/products" element={<ProductList />} />
        ) : (
          <Route path="*" element={<Error404 />} />
        )}
        {isAuthenticated && user?.role === "admin" ? (
          <Route exact path="/admin/product" element={<NewProduct />} />
          ) : (
          <Route path="*" element={<Error404 />} />
        )}
        {isAuthenticated && user?.role === "admin" ? (
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
          ) : (
          <Route path="*" element={<Error404 />} />
        )}
        {isAuthenticated && user?.role === "admin" ? (
          <Route exact path="/admin/orders" element={<OrderList />} />
          ) : (
          <Route path="*" element={<Error404 />} />
        )}
        {isAuthenticated && user?.role === "admin" ? (
          <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
          ) : (
          <Route path="*" element={<Error404 />} />
        )}
        {isAuthenticated && user?.role === "admin" ? (
          <Route exact path="/admin/users" element={<UsersList />} />
          ) : (
          <Route path="*" element={<Error404 />} />
        )}
        {isAuthenticated && user?.role === "admin" ? (
          <Route exact path="/admin/user/:id" element={<UpdateUser />} />
          ) : (
          <Route path="*" element={<Error404 />} />
        )}
        {isAuthenticated && user?.role === "admin" ? (
          <Route exact path="/admin/reviews" element={<ProductReviews />} />
          ) : (
          <Route path="*" element={<Error404 />} />
        )}
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
