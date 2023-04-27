import React from 'react'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions';
import Card from "./Card";



export default function Cards() {
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.allProducts); //mapeo del estado a las props
  const filteredProducts = useSelector((state) => state.products);
  const isFilterActive = !!filteredProducts.length;

  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])


  let [visible, setVisible] = useState(8);
  const showMoreFoods = () => {
      setVisible(prevValue => prevValue + 8);
  }

  const productsToRender = isFilterActive ? filteredProducts : allProducts;
  const canShowMore = productsToRender.length > visible;

  return (
    productsToRender.length ?
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10'>
        {productsToRender?.slice(0, visible).map((el) => {
          return (
            <Card
              key={el.id}
              name={el.name}
              description={el.description}
              price={el.price}
              flavor={el.flavor}
              img={el.img}
              brand={el.brand}
              id={el.id}
            />
          )
        })}
      </div>
      {canShowMore ?
      <div className="flex justify-center my-5">
        <button className="bg-black hover:bg-gray-600 duration-300 px-5 py-2.5 rounded-md text-white font-semibold md:w-auto lg:w-auto w-[50%]" onClick={showMoreFoods}>Mostrar más resultados</button>
      </div>
      : null}
    </div>
    :
      <>
      <h1>loading...</h1>
      </>
  )
}

