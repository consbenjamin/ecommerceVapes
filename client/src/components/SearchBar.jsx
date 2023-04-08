import React from 'react';
import { useState} from "react";
import {useDispatch} from 'react-redux';
import { getProductsByName } from '../redux/actions';
import { HiSearch } from "react-icons/hi";

export default function SearchBar() {

  const dispatch = useDispatch();

  const [input,setInput] = useState('');

  function handleChange(e){
    e.preventDefault();
    setInput(e.target.value);
  };

  function handleSubmit(e){
    e.preventDefault();
    if(input){
        dispatch(getProductsByName(input));
        setInput('');
    }else{
        alert('Coloca el nombre de un producto')
        setInput('')
    }
  }


  return (
    <div className=' bg-gray-200 rounded-lg hidden items-center px-2 sm:flex w-[200px] lg:w-[300px]'>
      <form className="flex items-center" onSubmit={(e)=>{handleSubmit(e)}}>
      <HiSearch size={25}/>
      <input value = {input} onChange={(e)=>{handleChange(e)}}  className='bg-transparent p-2 focus: outline-none w-full' type="text" placeholder='Buscar' />
      </form>
    </div>
  )
};
