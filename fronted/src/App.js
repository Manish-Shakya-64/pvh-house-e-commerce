import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOption from "./component/layout/Header/UserOption.js";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Dorid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
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
        {isAuthenticated && (
          <Route exact path="/account" element={<Profile />} />
        )}
        {isAuthenticated && (
          <Route exact path="/me/update" element={<UpdateProfile />} />
        )}
        {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword/>}/>}
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
