import React from 'react';

export default function Filters() {
  return (
    <div className=' w-[70%]'>
      <aside className=''>
        <div className=''>
          <h3 className='pl-1 border-b border-gray-300 pb-[16px] font-bold'>FILTROS</h3>
          <ul className='flex flex-col gap-6 my-[26px] border-b border-gray-300 pb-[16px]'>
            <li className='pl-4 text-gray-500'>Ignite</li>
            <li className='pl-4 text-gray-500'>Elfbar</li>
            <li className='pl-4 text-gray-500'>Zomo</li>
            <li className='pl-4 text-gray-500'>Sin Nicotina</li>
            <li className='pl-4 text-gray-500'>Con Nicotina</li>
          </ul>
        </div>
        <div>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div>
          {/* <h3>FILTRAR POR PRECIO</h3> */}
        </div>
      </aside>
    </div>
  )
};
