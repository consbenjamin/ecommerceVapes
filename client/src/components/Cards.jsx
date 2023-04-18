import React from 'react'
import { useEffect } from "react";
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

  const productsToRender = isFilterActive ? filteredProducts : allProducts;

  return (
    productsToRender.length ?
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
        {productsToRender.map((el) => {
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
    :
      <>
      <h1>loading...</h1>
      </>
  )
}

