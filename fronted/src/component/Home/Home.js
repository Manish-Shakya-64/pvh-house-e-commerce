import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from 'react-alert'
import ProductCard from "./ProductCard.js";
import { Link } from "react-router-dom";


const Home = () => {


  const alert = useAlert()
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {

    if(error){
      alert.error(error)
      dispatch(clearErrors)
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <MetaData title="Padmavati Handloom House" />
          <div className="banner">
            <p>Welcome to Padmavati Handloom House</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product,index) => <ProductCard product={product} key={index} />)}
          </div>
          <div className="moreBtn">
            <Link to="/products">See All Products</Link>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
