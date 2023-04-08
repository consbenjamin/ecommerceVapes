import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardCarrito from './CardCarrito';
import {cartRemove, cartUp, cartDown} from '../../redux/actions';
import { Link } from 'react-router-dom';

export default function ShoppingCart() {

  const dispatch = useDispatch();
  const carro = useSelector((state)=> state);
  const cart = localStorage.getItem('cart')

  let price = carro.cart.map(e=>e.price*e.quantity).reduce((a,current)=>a+current,0);

  return (
    <section className={`py-12 sm:py-16 lg:py-20 ${carro.cart.length >= 3 ? "bg-gray-100 " : "h-screen bg-gray-100 "}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mt-[45px]">
          <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
        </div>

        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
            {carro.cart.map((el, id) => {return (
              <div key={id}>

                <CardCarrito product={el} key={id} />

                <div class="sm:order-1 mb-4">
                  <div class="mx-auto flex h-8 items-stretch text-gray-600">
                    <button onClick={()=>dispatch(cartDown(id))} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                    <button onClick={()=>dispatch(cartUp(id))} className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                  </div>
                </div>

                <div className=' bg-[#971b1b] hover:bg-[#d61313] p-[5px] rounded-lg flex justify-center w-[25%] '>
                  <button className=' text-s text-center text-[#fff] ' onClick={()=>dispatch(cartRemove(el.id))}>Remove Product</button>
                </div>

              </div>
              )})
            }
              <div className="mt-6 border-t flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900"><span class="text-xs font-normal text-gray-400">ARS</span> {price}</p>
              </div>


              <div className="mt-6 text-center">
                {carro.cart.length !== 0 ? <button type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                  Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button> : <button type="button" disabled class='cursor-not-allowed inline-flex group w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800'>
                  Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" className=" ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>}
              </div>
            </div>
            </div>
          </div>
      </div>
    </section>
  )
};
































// <div className='bg-[#282c34] rounded-lg m-3 p-3'>

    //   <div className='flex justify-center'>
    //     <p className='text-white'>Tu Carrito esta vacio</p>
    //   </div>

    //   <div className='flex p-[5px] bg-[#282c34] justify-between'>
        
    //       <div className='flex'>
    //         <button className='text-white bg-[#720f10] hover:bg-[#c51b1e] p-[5px] rounded-lg font-bold'>Finalizar compra</button>
    //       </div>

    //     </div>
    // </div>

