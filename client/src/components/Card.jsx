import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function Card({name, price, flavor, img, id}) {
  return (
    <Link to={`/detail/${id}`}>
      <div className="flex p-[20px] sm:p-[2px] md:p-[8px] lg:p-[2px] items-center mt-10 mx-5">
        <div className="p-4 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all transform duration-500 ">
          <img className="bg-cover" src={img} alt="imgNotFound" />
          <div>
            <h1 className="text-xl font-bold text-gray-700 lg:text-2xl">{name}</h1>
            <div className='pt-2'>
              <p className='text-lg capitalize font-medium text-gray-400'>{flavor}</p>
            </div>
            <div className="my-1">
              <button className="block text-xl font-semibold text-gray-700">${price}</button>
            </div>
            
            {/* <button className='text-lg bg-gray-900 font-semibold hover:bg-gray-800 text-white rounded-lg shadow w-full py-2 flex items-center justify-center'>
              <div className='px-4 ml-[-36px]'>
                <HiOutlineShoppingCart size={20}/>
              </div>Agregar al carro
            </button> */}
            
          </div>
        </div>
      </div>
    </Link>
  )
}
