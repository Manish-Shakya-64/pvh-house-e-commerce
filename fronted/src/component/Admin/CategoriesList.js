import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getCategories ,deleteCategory} from '../../actions/categoryAction';
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";
import {useAlert} from 'react-alert'



const CategoriesList = () => {


    const {categories} = useSelector(state => state.categories);
    const {message} = useSelector(state => state.delCategory);
    console.log(categories);
    const dispatch = useDispatch();
    const alert = useAlert();
    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id))
    }

    useEffect(() => {
        if(message){
            alert.success(message);
            dispatch({type: DELETE_CATEGORY_RESET})
        }
        dispatch(getCategories())
    },[dispatch,message,alert])

    const columns = [
        { field: "id", headerName: "Category ID", minWidth: 130, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Category Name",
          minWidth: 180,
          flex: 0.6,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 160,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
              <Button title="Edit User">
                <Link to={`/admin/category/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
                </Button>
    
                <Button title="Delete User"
                  onClick={() =>
                 deleteCategoryHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </>
            );
          },
        },
      ];
    
      const rows = [];
    
      categories &&
        categories.forEach((item) => {
          rows.push({
            id: item._id,
            name: item.name,
          });
        });
    
      return (
        <>
          <MetaData title={`ALL USERS - Admin`} />
    
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h1 id="productListHeading">Categories</h1>
    
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </>
      );
    };
    

export default CategoriesList
