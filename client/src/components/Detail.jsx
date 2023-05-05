import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsById, cartAdd } from '../redux/actions';
import Swal from 'sweetalert2';
import Footer from './Footer';
import Counter from './cart/Counter';

export default function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const product = useSelector((state) => state.allProducts);
  const [amount, setAmount] = useState(1);
  console.log(product)

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity: amount
    };
    console.log("addToCart",productToAdd)
    dispatch(cartAdd(productToAdd));
    Swal.fire({
      position: 'top-end',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      customClass: {
        popup: 'w-[300px] h-[60px] items-center',
        title: 'text-lg'
      },
      backdrop: false,
    });
  };

  useEffect(() => {
    dispatch(getProductsById(id))
  }, [dispatch, id]);


  return (
    <>
    <section className="py-20 bg-gray-100"> 
    <div className="container mx-auto px-4">
      <nav className="flex">
        <ol className="flex items-center">
          <li className="text-left">
            <div className="-m-1">
            <Link to={'/'} className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">Home</Link> 
            </div>
          </li>
    
          <li className="text-left">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <div className="-m-1">
                <a href="#" className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800" aria-current="page"> Vapes </a>
              </div>
            </div>
          </li>
        </ol>
      </nav>
    
      <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3 lg:row-end-1">
          <div className="lg:flex lg:items-start">
            <div className="lg:order-2 lg:ml-5">
              <div className="max-w-xl overflow-hidden rounded-lg">
                <img className="h-full w-full max-w-full object-cover" src={product.img} alt="" />
              </div>
            </div>
    
            <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
              <div className="flex flex-row items-start lg:flex-col">
                <button type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
                  <img className="h-full w-full object-cover" src={product.img} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
    
        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
          <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
    
          <div className="mt-5 flex items-center">
            <div className="flex items-center">
              
            </div>
            <p className=" text-xl font-medium text-gray-500">{product.brand?.name}</p>
          </div>
    
          <h2 className="mt-8 text-base text-gray-900">Flavor:</h2>
          <div className="mt-3 flex select-none flex-wrap items-center gap-1">
            <label className="">
              <input type="radio" name="type" value="Powder" className="peer sr-only" />
              <p className="peer-checked:bg-black peer-checked:text-white rounded-md border border-black px-6 py-2 font-bold capitalize">{product.flavor}</p>
            </label>
          </div>
    
          <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
            <div className="flex items-end">
              <h1 className="text-3xl font-bold">${product.price}</h1>
            </div>
    
            <button  onClick={handleAddToCart} type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-10 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className=" mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to cart
            </button>
            <Counter amount={amount} setAmount={setAmount}/>
          </div>
    
          <ul className="mt-8 space-y-2">
            <li className="flex items-center text-left text-sm font-medium text-gray-600">
              <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Free shipping worldwide
            </li>
    
            <li className="flex items-center text-left text-sm font-medium text-gray-600">
              <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
              </svg>
              Cancel Anytime
            </li>
          </ul>
        </div>
    
        <div className="lg:col-span-3">
          <div className="border-b border-gray-300">
            <nav className="flex gap-4">
              <p className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Description </p>
            </nav>
          </div>
    
          <div className="mt-6 flow-root sm:mt-12">
            <h1 className="mt-2 text-3xl font-bold">From the Fine Farms of Brazil</h1>
            <p className="mt-4">{product.description}</p>
            <p className="mt-4">Amet consectetur adipisicing elit. Optio numquam enim facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore rerum nostrum eius facere, ad neque.</p>
          </div>
        </div>
      </div>
    </div>
    </section>
    <Footer/>
    </>
  )
};










