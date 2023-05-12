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
import MyProfile from "./components/account/MyProfile.jsx";
import Faq from "./components/Faq.jsx";
import Success from "./components/purchase/Success.jsx";
import Pending from "./components/purchase/Pending.jsx";
import Failure from "./components/purchase/Failure.jsx";


function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />

        <Route path="/faq" element={<Layout><Faq/></Layout>} />

        <Route path="/detail/:id" element={<Layout><Detail/></Layout>} />

        <Route path="/login" element={<Layout><Login/></Layout>} />

        <Route path="/register" element={<Layout><Register/></Layout>} />

        <Route path="/editData/:id" element={<Layout><MyProfile/></Layout>} />

        <Route path="/cart" element={<Layout><ShoppingCart/></Layout>} />

        <Route path="/admin" element={<Layout><Admin/></Layout>} />

        <Route path="/admin/addProduct" element={<Layout><AddProduct/></Layout>} />

        <Route path="admin/products/editProduct/:id" element={<Layout><CardEdit/></Layout>} />

        <Route path="/success" element={<Success/>} />

        <Route path="/pending" element={<Pending/>} />

        <Route path="/failure" element={<Failure/>} />

    </Routes>
    </>
  );
}

export default App;
