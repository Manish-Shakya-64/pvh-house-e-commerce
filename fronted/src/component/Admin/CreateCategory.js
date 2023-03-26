import React, { useEffect, useState } from "react";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, clearErrors } from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import { CREATE_CATEGORY_RESET } from "../../constants/categoryConstants";


const CreateCategory = () => {
  const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {message,error,isCreated} = useSelector(state => state.category);

    const submitHandler = (e) => {
        if(name === ""){
            e.preventDefault();
            alert.error('Please enter category name')
            return;
        }
        console.log(message)
        e.preventDefault();
        dispatch(createCategory({name}))
    }

    useEffect(() => {

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(message){
            alert.success(message)
            navigate('/admin/categories')
        }
        if(isCreated){
            dispatch({type: CREATE_CATEGORY_RESET})
        }
    }, [dispatch,alert,error,isCreated,navigate]);

  return (
    
    <>
      <MetaData title="Add Category" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1>Add Category</h1>

            <div>
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
            >
              Add Category
            </Button>
          </form>
        </div>
       </div>
    </>
  );
};

export default CreateCategory;
