import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({name, price, flavor, img, id, brand}) {

  return (
    <Link to={`/detail/${id}`}>
      <div className="flex p-[20px] sm:p-[2px] md:p-[8px] lg:p-[2px] items-center mt-10 mx-5 justify-center">
        <div className="p-3 bg-white rounded-md shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all transform duration-500 ">
          <img className="" src={img} alt="imgNotFound" />
          <div>
            <h1 className="text-xl font-bold text-gray-700 lg:text-xl">{name}</h1>
            <div className='pt-2'>
              <p className='text-base capitalize font-medium text-gray-400'>{flavor}</p>
              {brand && <p className='text-base capitalize font-medium text-gray-400'>{brand.name}</p>}
            </div>
            <div className="my-1">
              <button className="block text-xl font-semibold text-gray-700">$ {price}</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
};
