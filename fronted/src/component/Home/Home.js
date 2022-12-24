import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from 'react-alert'

// const product = {
//   name: "Shree S/B Bedsheet",
//   images: [
//     {
//       url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkJTIwc2hlZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//     },
//   ],
//   price: "650",
//   _id: "manish",
// };

const Home = () => {


  const alert = useAlert()
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {

    if(error){
      return alert.error(error)
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
            <a href="#conatiner">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
