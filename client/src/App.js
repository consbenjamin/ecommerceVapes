import React from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Detail from './components/Detail.jsx';
import Register from "./components/account/Register.jsx";
import Login from "./components/account/Login.jsx";
import ShoppingCart from "./components/cart/ShoppingCart.jsx";
import Admin from "./components/admin/Admin.jsx";
import AddProduct from "./components/admin/AddProduct.jsx";
import CardEdit from "./components/admin/CardEdit.jsx";

function App() {
  return (
    <>
      <Navbar/>
        <Routes>

          <Route path='/' element={<Home/>}/>  

          <Route path='/detail/:id' element={<Detail/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/register' element={<Register/>}/>

          <Route path='/cart' element={<ShoppingCart/>}/>

          <Route path='/admin' element={<Admin/>}/>

          <Route path='/admin/addProduct' element={<AddProduct/>}/>

          <Route path='/admin/editProduct' element={<CardEdit/>}/>

        </Routes>
    </>
  );
}

export default App;
