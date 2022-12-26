import React, {useState, useEffect } from "react";
import "./Product.css";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from 'react-js-pagination'


const Products = () => {

    const {keyword} = useParams();

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const {products,loading,error,productsCount,resultPerPage} =useSelector(state => state.products)

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

useEffect(()=>{

    dispatch(getProduct(keyword))

},[dispatch,keyword])

  return <>{loading ? <Loader /> : 
  <>
  <h2 className="productsHeading">Products</h2>
  <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="paginationBox">
           <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageLinkActive"
            />
          </div>
  
  </>
  
  }</>;
};

export default Products;
