import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByBrand, filterByPrice, sortByPrice } from '../redux/actions';
import { MdFilterAltOff } from "react-icons/md";
import { AiOutlineMenu } from 'react-icons/ai';
import { IoOptionsOutline } from "react-icons/io5";
import { Range } from 'react-range';

export default function Filters() {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showSortList, setShowSortList] = useState(false);
  const [showFilterList, setShowFilterList] = useState(false);
  const [minPrice, setMinPrice] = useState(3500);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [order, setOrder] = useState('asc');

  // const filtersState = useSelector((state) => state.products);

  const handleBrandFilter = (brandId) => {
    dispatch(filterByBrand(brandId));
    setSelectedFilter(brandId);
  };

  const changeFilterColor = (brandId) => {
    if (brandId === selectedFilter) {
      return "pl-4 cursor-pointer font-bold text-blue-500";
    } else {
      return "pl-4 text-gray-500 cursor-pointer";
    }
  };

  const handlePriceFilter = () => {
    dispatch(filterByPrice(minPrice, maxPrice));
  }

  const handleSortPrice = (order) => {
    setOrder(order);
    dispatch(sortByPrice(order));
  }


  const toggleSortList = () => {
    setShowSortList(!showSortList);
  };

  const toggleFilterList = () => {
    setShowFilterList(!showFilterList);
  };

  const handleClearFilters = () => {
    setSelectedFilter(null);
    dispatch(filterByBrand(null));
    setMinPrice(3500);
    setMaxPrice(10000);
    setOrder('asc');
  };


  return (
    <div className='lg:w-[70%]'>
      <div className="flex justify-between mx-8 lg:hidden">
        <div className="">
          <button className="flex items-center" onClick={toggleFilterList} style={{cursor: 'pointer'}}>
            <AiOutlineMenu className="text-black" size={22}/>
            <p className="pl-1 text-black">Filtros</p>
          </button>
        </div>
        <div>
          <button className="flex items-center" onClick={toggleSortList} style={{cursor: 'pointer'}}>
            <IoOptionsOutline className="text-black" size={22}/>
            <p className="pl-1 text-black">Ordenar</p>
          </button>
        </div>
      </div>
      {showSortList && (
            <div className='flex-col mx-8 mt-2 border-t-2 border-b-2 lg:hidden '>
              <h3 className='text-black font-semibold text-base mt-6'>ORDENAR POR</h3>
              <ul className=''>
                <li onClick={() => handleSortPrice('asc')} className='my-3 text-slate-500'>Precio: menor a mayor</li>
                <li onClick={() => handleSortPrice('desc')} className='my-4 text-slate-500'>Precio: mayor a menor</li>
              </ul>
            </div>
          )}
      {showFilterList && (
            <div className='flex-col mx-8 mt-2 border-t-2 border-b-2 lg:hidden '>
              <h3 className='text-black font-semibold text-base mt-6'>FILTROS</h3>
              <ul className=''>
                <li className={`${changeFilterColor('1')} my-4`} onClick={() => handleBrandFilter('1')}>Ignite</li>
                <li className={`${changeFilterColor('2')} my-4`} onClick={() => handleBrandFilter('2')}>Elfbar</li>
              </ul>
              <button className='pb-[16px] mx-4' onClick={handleClearFilters}><MdFilterAltOff size={18}/></button>
            </div>
          )}
      <aside className='hidden lg:block'>
        <div className=''>
          <div className='flex justify-between border-b'>
            <h3 className='pl-2 pb-[16px] font-semibold'>FILTROS</h3>
            <button className='pb-[16px] ' onClick={handleClearFilters}><MdFilterAltOff size={18}/></button>
          </div>
          <ul className='flex flex-col gap-6 my-[26px] border-b border-gray-300 pb-[16px]'>
            <li className={changeFilterColor('1')} onClick={() => handleBrandFilter('1')}>Ignite</li>
            <li className={changeFilterColor('2')} onClick={() => handleBrandFilter('2')}>Elfbar</li>
            <li className='pl-4 text-gray-500'>Zomo</li>
            <li className='pl-4 text-gray-500'>Sin Nicotina</li>
            <li className='pl-4 text-gray-500'>Con Nicotina</li>
          </ul>
        </div>
        <div>
          <h3 className='pl-2 pb-[16px] font-semibold'>FILTRAR POR PRECIO</h3>
          <div className='flex items-center'>
            <Range
              step={100}
              min={3500}
              max={10000}
              values={[minPrice, maxPrice]}
              onChange={(values) => {
                setMinPrice(values[0]);
                setMaxPrice(values[1]);
              }}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className='ml-3 w-[90%] h-2 bg-gray-200 rounded-lg'
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className='w-[5px] h-4 bg-blue-500 shadow-lg cursor-pointer'
                />
              )}
            />
          </div>
          <div className='flex my-8 ml-2 justify-between items-center'>
            <span className='font-semibold tracking-wide flex'><h3 className='text-slate-500'>Precio:</h3>${minPrice} - ${maxPrice}</span>
            <button onClick={handlePriceFilter} className='bg-black break-all text-white font-semibold p-2 w-[25%] rounded-md hover:bg-gray-800 mx-4 lg:text-xs lg:break-normal xl:text-base '>FILTRAR</button>
          </div>
          <div className='flex-col mt-2 border-t-2 border-b-2'>
            <h3 className='text-black font-semibold text-base mt-6 pl-2'>ORDENAR POR</h3>
            <ul className='pl-2 cursor-pointer'>
              <li onClick={() => handleSortPrice('asc')} className='my-3 text-slate-500'>Precio: menor a mayor</li>
              <li onClick={() => handleSortPrice('desc')} className='my-4 text-slate-500'>Precio: mayor a menor</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  )
};
