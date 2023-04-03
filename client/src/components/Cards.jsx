import React from 'react'
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions';
import Card from "./Card";



export default function Cards() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.allProducts); //mapeo del estado a las props

  useEffect(()=>{
    dispatch(getProducts())
}, [dispatch])


  if (!products.length) return (
    <h1>loading...</h1>
  )
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {products?.map((el) => {
        return (
          <Card
          key={el.id}
          name={el.name}
          description={el.description}
          price={el.price}
          flavor={el.flavor}
          img={el.img}
          id={el.id}
          />
        )
      })}
    </div>
  )
}

