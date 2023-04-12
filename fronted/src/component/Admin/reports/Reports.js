import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import MetaData from "../../layout/MetaData";
import Sidebar from "../Sidebar";
import "./reports.css";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct, getProduct } from "../../../actions/productAction";
import { getAllOrders } from "../../../actions/orderAction";

const links = [
  { name: "Products", value: "/admin/products" },
  { name: "Users", value: "/admin/users" },
  { name: "Orders", value: "/admin/orders" },
];

const Reports = () => {
  const [date, setDate] = React.useState({});
  const [link, setLink] = React.useState();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { error, orders } = useSelector((state) => state.allOrders);
  const [filteredOrders,setFilteredOrders] = React.useState([]);

  const handleClick = (value) => {
    setLink(value);
  };
  const download = () => {
    window.print();
  };

  const onsubmit = () => {
    orders.map((order) => {
        console.log(order.createdAt)
    });
    orders.map((order) => {
        const date1 = order.createdAt.substr(0,10);
        if (date1 === date) {
            setFilteredOrders([...filteredOrders,order]);
            // filteredOrders.push(order);
        }
    });
    console.log(filteredOrders)
  }

  useEffect(() => {
    if (error) {
      alert(error);
    }

  }, [dispatch, error]);

  return (
    <div className="dashboard">
      <MetaData title="Reports" />
      <Sidebar />
      <div className="admin-reports">
        <Typography variant="h1">Reports</Typography>
        <div className="report-icons">
          <ul>
            {links.map((link, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handleClick(link.value);
                  }}
                >
                  {link.name}
                </li>
              );
            })}
          </ul>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              console.log(date);
    dispatch(getAllOrders());

            }}
          />
        </div>
        {/* <iframe src={link} frameborder="1" className="report-frame">
            
        </iframe> */}
        <div className="report-frame">
          <table>
            <tr>
              <th>Order ID</th>
              <th>Order Status</th>
              <th>Order Amount</th>
              <th>Item Total</th>
            </tr>
            {filteredOrders &&
              filteredOrders.map((order, index) => {
                console.log(order)
                return (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.orderItems.length}</td>
                  </tr>
                );
              })}
          </table>
        </div>
        <input type="button" onClick={()=>onsubmit()} />
      </div>
    </div>
  );
};

export default Reports;
