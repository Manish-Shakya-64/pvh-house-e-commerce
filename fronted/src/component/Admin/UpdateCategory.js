import React, { useEffect, useState } from "react";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getCategory,
  updateCategory,
} from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import { CREATE_CATEGORY_RESET } from "../../constants/categoryConstants";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const alert = useAlert();
  const { category } = useSelector((state) => state.categoryDetails);
  const { error, isUpdated, message } = useSelector((state) => state.category);
  const catID = id;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory(catID, name));
  };

  useEffect(() => {
    if (category && category._id !== catID) {
      dispatch(getCategory(catID));
    } else {
      setName(category.name);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch({ type: CREATE_CATEGORY_RESET });
    }
    if (message) {
      alert.success(message);
      // navigate("/admin/categories");
    }
  }, [dispatch, alert, category, catID, message, error, isUpdated]);

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
            <h1>Update Category</h1>

            <div>
              <input
                type="text"
                placeholder="Category Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <Button id="createProductBtn" type="submit">
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
