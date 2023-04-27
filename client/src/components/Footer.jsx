import React from 'react';
import { FaInstagram } from "react-icons/fa";



export default function Footer() {
  return (
    <footer className="text-gray-600 shadow-xl">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col ">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-xl font-bold">Vape<span className='font-normal'>Club</span></span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 VapeClub</p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <span className="ml-3 text-gray-500 cursor-pointer">
            <a className='flex' href="https://www.instagram.com/vapeclub_cba/" target="_blank"><FaInstagram size={26}/><p className='ml-2 font-medium'>Instagram</p> </a>
          </span>
        </span>
      </div>
    </footer>
  )
};
