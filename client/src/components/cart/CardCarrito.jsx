import React from 'react';

export default function CardCarrito({product}) {
  return (
  
    <div className="">
      <ul className=" my-[6px]">
        <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
          <div className="shrink-0">
            <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={product.img} alt="imgNotFound" />
          </div>

          <div className="relative flex flex-1 flex-col justify-between">
            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
              <div className="pr-8 sm:pr-5">
                <p className="text-base font-semibold text-gray-900">{product.name}</p>
                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400 capitalize">{product.flavor}</p>
                <p className='mx-0 text-sm text-gray-900'>x {product.quantity}</p>
              </div>

              <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${product.price * product.quantity}ARS</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
};