import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiFillTag, AiOutlineClose, AiOutlineMenu, AiFillHome } from 'react-icons/ai';
import { BsFillCartFill, BsFillPersonFill } from 'react-icons/bs';
import { FaWallet } from 'react-icons/fa';
import { MdAdminPanelSettings } from "react-icons/md";
import { MdFavorite, MdHelp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';


export default function Navbar() {

  const [open, setOpen] = useState(false);

  const cartItems = useSelector(state => state.numberCart);

  var adminPrivileges= JSON.parse(localStorage.getItem("adminPrivileges"));
  

  const loggedInUser = localStorage.getItem("firstName");
  const token = localStorage.getItem('token');

  const handleLoginOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");
    localStorage.removeItem("token");
    localStorage.removeItem("image");
    localStorage.removeItem("adminPrivileges");

    window.location.href = "/login";
  };



  return (
    <nav>
      <div className='flex flex-row justify-around bg-[#fafbfd] py-4 fixed mx-auto items-center top-0 left-0 right-0 shadow-md z-[2]'>
        <button onClick={() => setOpen(true)}>
          <AiOutlineMenu size={30} className='text-black'/>
        </button>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-black'> 
            Vape<span className='font-normal text-black'>Club</span>
        </h1>
        <SearchBar/>
        {/* Icons */}
        {!token ? 
        <div className='flex items-center gap-5 '>
          <div className="dropdown dropdown-hover dropdown-end">
            <BsFillPersonFill size={27} className='text-black'/> 
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-200 rounded-box w-52">
              <li><Link className='font-medium' to={'/register'}>Sign up</Link></li>
              <li><Link className='font-medium' to={'/login'}>Log In</Link></li>
            </ul>
          </div> 
          <BsFillCartFill size={25} className='text-black hidden'/>
        </div> 
        : <div className='flex items-center gap-5 '>
            <div className="dropdown dropdown-hover dropdown-end">
              <div className='flex items-center'><span className='font-bold text-base mr-[5px]'>{loggedInUser}</span><BsFillPersonFill size={27} className='text-black'/></div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-200 rounded-box w-52">
                <li><Link className='font-medium' to={'/myprofile'}>My Profile</Link></li>
                <li><button className='font-medium' onClick={handleLoginOut}>Log Out</button></li>
              </ul> 
            </div>
          <Link className='flex items-center' to={'/cart'}>
            <BsFillCartFill size={25} className='text-black'/>
            <span className=' text-white text-base font-sans font-bold bg-red-500 rounded-full px-[7px] mb-[16px] h-[23px] absolute ml-[16px] scale-[85%] hover:bg-red-400'>{cartItems}</span>
          </Link>
          </div> 
          }

        <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm z-[3]`} onClick={() => setOpen(false)}></div>

        <div className={`${open ? "w-80" : "w-0"} bg-[#fafbfd] min-h-screen fixed top-0 left-0 transition-all duration-300 z-[3]`}>
          <div className={`${!open && "hidden"} pt-3`}>
            <button className='ml-4 text-black py-3' onClick={() => setOpen(false)}>
              <AiOutlineClose size={30}/>
            </button>
            <ul className='flex flex-col p-4 text-[#18171c]'>
                <li className='text-xl py-4 pl-1 flex'><Link className='flex' to= {'/'}><AiFillHome size={25} className='mr-4'/>Home</Link></li>
                <li className='text-xl py-4 pl-1 flex'><MdFavorite size={25} className='mr-4'/>Favorites</li>
                <li className='text-xl py-4 pl-1 flex'><FaWallet size={25} className='mr-4'/>Wallet</li>
                <li className='text-xl py-4 pl-1 flex'><Link className='flex' to= {'/faq'}><MdHelp size={25} className='mr-4'/>FAQ</Link></li>
                <li className='text-xl py-4 pl-1 flex'><AiFillTag size={25} className='mr-4'/>Promotions</li>
                {adminPrivileges === true ?
                <li className='text-xl py-4 pl-1 flex'><Link className='flex' to= {'/admin'}><MdAdminPanelSettings size={28} className='mr-4'/>Admin Panel</Link></li>
                  : null}
              </ul>
          </div>
        </div>
      </div> 
    </nav>
  )
};