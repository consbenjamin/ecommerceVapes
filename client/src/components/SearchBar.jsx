import React from 'react';
import { useState} from "react";
import {useDispatch} from 'react-redux';
import { getProductsByName } from '../redux/actions';
import { HiSearch } from "react-icons/hi";
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: 'error',
          title: 'No se encontró lo que buscas',
          text: 'Por favor, intenta con otro término de búsqueda',
        });
        setInput('')
      }
  }


  return (
    <div className=' bg-gray-200 rounded-lg hidden items-center px-2 sm:flex w-[200px] lg:w-[300px]'>
      <form className="flex items-center" onSubmit={(e)=>{handleSubmit(e)}}>
        <input value = {input} onChange={(e)=>{handleChange(e)}}  className='bg-transparent p-2 focus: outline-none w-full' type="text" placeholder='Buscar' />
        <button className='ml-[64px]'><HiSearch size={25}/></button>
      </form>
    </div>
  );
};
