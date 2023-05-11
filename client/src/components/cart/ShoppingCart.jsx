import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardCarrito from './CardCarrito';
import {cartRemove, postToCart, purchaseLink} from '../../redux/actions';
import { TbTrash } from "react-icons/tb";
import Swal from 'sweetalert2';
import Footer from '../Footer';


export default function ShoppingCart() {

  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [paymentLinkReady, setPaymentLinkReady] = useState(false);
  const [clicked, setClicked] = useState(false);

  const paymentLink = useSelector((state) => state.purchaseLink)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    console.log(items, "items")
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => {
    setPaymentLinkReady(!!paymentLink);
  }, [paymentLink]);

  useEffect(() => {
    if (paymentLink && clicked) {
      window.open(paymentLink);
      console.log(paymentLink, "MercadoPago Link");
      setClicked(false);
    }
  }, [paymentLink, clicked]);

  const userId = localStorage.getItem('userId');

  let price = 0;
  if (items && items.length > 0) {
  price = items.map(e => e.price * e.quantity).reduce((a, current) => a + current, 0);
  }


  const handleRemove = (id) => {
    const filteredItems = items.filter(item => item.id !== id);
    dispatch(cartRemove(id))
    setItems(filteredItems);
    localStorage.setItem('cart', JSON.stringify(filteredItems));

    Swal.fire({
      position: 'top-end',
      title: 'Producto removido del carrito',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      customClass: {
        popup: 'w-[300px] h-[60px] items-center',
        title: 'text-lg font-semibold',
        timerProgressBar: 'bg-red-400',
      },
      backdrop: false,
    });
  };


  localStorage.setItem('purchaseData', JSON.stringify(items));
  const purchaseData = JSON.parse(localStorage.getItem('purchaseData'));
  console.log(purchaseData, "purchaseData")

  const handlePostToCart = async () => {
    try {
      await dispatch(postToCart(userId, items));
      Swal.fire({
        title: 'Checkout',
        icon: 'success',
        text: 'Redireccionando al Pago',
        confirmButtonText: 'OK',
        timer: 2000
      });

      const token = localStorage.getItem("token");
      console.log(token)
      await dispatch(purchaseLink(token));
  
      setClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <section className={`py-12 sm:py-16 lg:py-20 ${items.length >= 3 ? "bg-gray-100 " : "h-screen bg-gray-100 "}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mt-[45px]">
          <h1 className="text-3xl font-semibold text-gray-900">Your Cart</h1>
        </div>

        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              {items.length ? (
                items.map((el) => {
                  return (
                    <div key={el.id}>

                      <CardCarrito product={el} />
                      
                      <div className=' bg-[#971b1b] hover:bg-[#d61313] p-[8px] rounded-lg flex justify-center w-[8%]'>
                        <button  onClick={() => handleRemove(el.id)} className=' text-center text-[#fff]'><TbTrash className='text-2xl'/></button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className='font-semibold'>Carrito vacío</p>
              )}
              <div className="mt-6 border-t flex items-center justify-between">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">ARS </span>{price}</p>
              </div>


              <div className="mt-6 text-center">
                {items.length !== 0 ? 
                  <button onClick={() => handlePostToCart()} type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button> : 
                  <button type="button" disabled className='cursor-not-allowed inline-flex group w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-400'>
                    Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" className=" ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                }
              </div>
            </div>
            </div>
          </div>
      </div>
    </section>
    {/* <Footer/> */}
    </>
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

