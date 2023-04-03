import React from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Detail from './components/Detail.jsx';
import Register from "./components/account/Register.jsx";
import Login from "./components/account/Login.jsx";

function App() {
  return (
    <>
      <Navbar/>
        <Routes>

          <Route path='/' element={<Home/>}/>  

          <Route path='/detail/:id' element={<Detail/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/register' element={<Register/>}/>

        </Routes>
    </>
  );
}

export default App;
