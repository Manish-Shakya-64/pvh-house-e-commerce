
import './App.css';
import Header from './component/layout/Header/Header.js'
import { BrowserRouter as Router ,Routes,Route} from "react-router-dom";
import  webFont  from "webfontloader";
import React from "react";
import Footer from './component/layout/Footer/Footer.js'
import Home from './component/Home/Home';
import Loader from './component/layout/Loader/Loader';
import ProductDetails from './component/Product/ProductDetails.js'



function App() {

  React.useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Dorid Sans","Chilanka"]
      }
    })
  },[])
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/product/:id' element={<ProductDetails/>} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
