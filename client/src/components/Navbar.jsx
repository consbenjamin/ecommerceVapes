import React, { useState } from 'react';
import { AiFillTag, AiOutlineClose, AiOutlineMenu, AiFillHome } from 'react-icons/ai';
import { BsFillCartFill, BsFillSaveFill, BsFillPersonFill } from 'react-icons/bs';
import { FaWallet } from 'react-icons/fa';
import { HiSearch } from "react-icons/hi";
import { MdFavorite, MdHelp } from 'react-icons/md';
import { Link } from 'react-router-dom';
// import Modal from './Modal';


export default function Navbar() {

  const [open, setOpen] = useState(false);
  // const [showMyModal, setShowMyModal] = useState(false);

  // const handleOnClose = () => setShowMyModal(false);


  return (
    <nav>
      <div className='flex flex-row justify-around  bg-white py-4 fixed mx-auto items-center top-0 left-0 right-0 shadow-md z-[2] '>
        <button onClick={() => setOpen(true)}>
          <AiOutlineMenu size={30} className='text-black'/>
        </button>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-black'> 
            Vape<span className='font-normal text-black'>Club</span>
        </h1>
        {/* Search Input */}
        <div className=' bg-gray-200 rounded-lg hidden items-center px-2 sm:flex w-[200px] lg:w-[300px]'>
          <HiSearch size={25}/>
          <input className='bg-transparent p-2 focus: outline-none w-full' type="text" placeholder='Buscar' />
        </div>
        {/* Icons */}
        <div className='flex items-center gap-5 '>
          <div className="dropdown dropdown-hover dropdown-end">
            <BsFillPersonFill size={27} className='text-black'/>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-200 rounded-box w-52">
              <li><Link className='font-medium' to={'/register'}>Sign up</Link></li>
              {/* <li><a onClick={() => setShowMyModal(true)} className='font-medium' >Login</a></li> */}
              <li><Link className='font-medium' to={'/login'}>Log In</Link></li>
            </ul>
          </div>
          <BsFillCartFill size={25} className='text-black'/>
        </div>
        {/* <Modal onClose={handleOnClose} visible={showMyModal}/> */}
      </div>

        <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm z-[3]`} onClick={() => setOpen(false)}></div>

        <div className={`${open ? "w-80" : "w-0"} bg-gray-500 min-h-screen fixed top-0 left-0 transition-all duration-300 z-[3]`}>
          <div className={`${!open && "hidden"} pt-3`}>
            <button className='ml-4 text-white py-3' onClick={() => setOpen(false)}>
              <AiOutlineClose size={30}/>
            </button>
            <ul className='flex flex-col p-4 text-white'>
                <li className='text-xl py-4 pl-1 flex'><Link className='flex' to= {'/'}><AiFillHome size={25} className='mr-4'/>Home</Link></li>
                <li className='text-xl py-4 pl-1 flex'><MdFavorite size={25} className='mr-4'/>Favorites</li>
                <li className='text-xl py-4 pl-1 flex'><FaWallet size={25} className='mr-4'/>Wallet</li>
                <li className='text-xl py-4 pl-1 flex'><MdHelp size={25} className='mr-4'/>Help</li>
                <li className='text-xl py-4 pl-1 flex'><AiFillTag size={25} className='mr-4'/>Promotions</li>
                <li className='text-xl py-4 pl-1 flex'><BsFillSaveFill size={25} className='mr-4'/>Best Ones</li>
              </ul>
          </div>
        </div>
    </nav>
  )
};