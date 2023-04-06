import React from 'react';


export default function CardCarrito({product}) {

  return (
    <div class="flow-root">
      <ul class=" my-[6px]">
        <li class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
          <div class="shrink-0">
            <img class="h-24 w-24 max-w-full rounded-lg object-cover" src={product.image} alt="imgNotFound" />
          </div>

          <div class="relative flex flex-1 flex-col justify-between">
            <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
              <div class="pr-8 sm:pr-5">
                <p class="text-base font-semibold text-gray-900">{product.name}</p>
                <p class="mx-0 mt-1 mb-0 text-sm text-gray-400 capitalize">{product.flavor}</p>
                <p className='mx-0 text-sm text-gray-900'>x {product.quantity}</p>
              </div>

              <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${product.price}ARS</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
};