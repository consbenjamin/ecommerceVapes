import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions';
import { Link } from 'react-router-dom';
import CardAdmin from './CardAdmin';



export default function Admin() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);

  var adminPrivileges= JSON.parse(localStorage.getItem("adminPrivileges"));
  console.log(adminPrivileges)

  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])

  if (adminPrivileges === null || adminPrivileges === undefined || adminPrivileges === "" || adminPrivileges === false || isNaN(adminPrivileges) ) {
    return (
      <div className='mt-[250px] flex justify-center'>
        <h1 className='text-3xl'>No tienes permisos de administrador</h1>
      </div>
    );
  }


  else if (adminPrivileges === true) {
    return (
      <div className="items-center w-full px-4 py-4 mx-auto mt-[100px] bg-gray-50 rounded-lg shadow-lg sm:w-11/12">
        <div className="container mx-auto ">
          <div className="flex justify-between w-full px-4 py-2 items-center ">
            <div className="text-xl font-bold">
              List of Products
            </div>
            <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
              <Link to='/admin/addProduct'>
                Add new product
              </Link>
            </button>
          </div>
          <ul
            className="flex flex-row space-x-2 sm:space-x-6 md:space-x-12 mt-4 mx-4 items-center border-b border-gray-300  overflow-auto text-sm">
            <li className=" text-blue-500 group">
              <a href="#">Descartables</a>
              <div
                className="h-1 bg-blue-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out">
              </div>
            </li>
            <li className="group">
              <a href="#">Vapes</a>
              <div
                className="h-1 bg-blue-500 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out">
              </div>
            </li>
          </ul>
          
          <div className="mt-6 overflow-x-auto bg-white">
            <table className="w-full table-auto">
              <thead className="">
                <tr className="text-sm font-semibold text-center border-b-2 border-blue-500 uppercase">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Id</th>
                  <th className="px-4 py-3">Img</th>
                  <th className="px-4 py-3">price</th>
                  <th className="px-4 py-3">Available</th>
                  <th className="px-4 py-3">sold</th>
                  <th className="px-4 py-3">action</th>
                </tr>
              </thead>
              {/* PRODUCTOS */}
              {
              products.length ?  
              products.map((el) => {
                return (
                  <CardAdmin
                  
                    key={el.id}
                    name={el.name}
                    price={el.price}
                    img={el.img}
                    id={el.id}
                  />
                )
              }):<h1>Loading...</h1>}
            </table>
          </div>
          {/* FIN PRODUCTOS */}
          <div className="flex flex-col items-center w-full px-4 py-4 text-sm text-gray-500 justify-center mx-auto">
            <div className="flex items-center justify-between space-x-2">
              <a href="#" className="hover:text-gray-600">Previous</a>
              <div className="flex flex-row space-x-1">
                <div className="flex px-2 py-px text-white bg-blue-400 border border-blue-400">1</div>
                <div className="flex px-2 py-px border border-blue-400 hover:bg-blue-400 hover:text-white">2</div>
              </div>
              <a href="#" className="hover:text-gray-600">Next</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
