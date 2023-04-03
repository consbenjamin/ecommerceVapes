import React from 'react';
import registerImg from '../../assets/registerImg.jpg';
import googleLogo from '../../assets/googleLogo.png';

export default function Register() {
  return (
    <div className="flex w-screen flex-wrap text-slate-800 ">
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
        <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
          <p className="mb-7 text-sm opacity-70">Vape Club</p>
        </div>
        <img class="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src={registerImg}/>
      </div>
      <div className="flex w-full flex-col md:w-1/2">
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]"> 
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Log in to your account</p>
          <p className="mt-6 text-center font-medium md:text-left">
            Don't have an account?
            <a href="#" className="whitespace-nowrap font-semibold text-blue-700"> Register here</a>
          </p>
          <button className="mt-8 flex items-center justify-center rounded-md border px-4 py-1">
            <img className="mr-2 h-5" src={googleLogo} alt />Log in with Google
          </button>
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">Or use email instead</div>
          </div>
          <form className="flex flex-col items-stretch pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="email" id="login-email" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password (minimum 8 characters)" />
              </div>
            </div>
            <button type="submit" className="mt-6 rounded-lg bg-primary px-4 py-2 text-center text-base font-semibold text-white shadow-md hover:bg-purple-700 md:w-32">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};