import React, { useState } from 'react';
import registerImg from '../../assets/registerImg.jpg';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';



export default function Login() {

  const expCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await dispatch(loginUser(userData.email, userData.password));

      if (response.type === 'LOGIN_SUCCESS') { 
        const { token, user } = response.payload;
        console.log(token)
        console.log(user.adminPrivileges)
        console.log(response)


        localStorage.setItem('token', token);
        localStorage.setItem("userId",user.id );
        localStorage.setItem("firstName",user.firstName);
        localStorage.setItem("email",user.email);
        localStorage.setItem("image",user.img);
        localStorage.setItem("adminPrivileges", JSON.parse(user.adminPrivileges));

        

        const tokenFront = localStorage.getItem("token", token);

        const config = {
          headers:{
            authorization: tokenFront,
          }
        } 
        console.log(config)

      
        return Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: 'Has iniciado sesión correctamente',
          timer: 3000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = '/';
          
        })
      } else {
        setError({ message: "Error de inicio de sesión. Por favor, inténtelo de nuevo." });
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Por favor, inténtelo de nuevo.'
        });
      }
    } catch (error) {
      setError({ message: "Error de inicio de sesión. Por favor, inténtelo de nuevo." });
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
    setError(
      validation({
        ...userData,
        [e.target.name]: e.target.value
      })
    )
  };

  ///// VALIDACIONES /////

  function validation(userData) {
    let errors = {};

    if (!userData.email) {
      errors.email = "El email es requerido.";
    } else if (!expCorreo.test(userData.email)) {
      errors.email = "Esto no parece un email.";
    }
    if (!userData.password) {
      errors.password = "La contraseña es requerida.";
    } 
    return errors;
  }


  return (
    <div className="flex w-screen flex-wrap text-slate-800 ">
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
        <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
          <p className="mb-7 text-sm opacity-70">Vape Club</p>
        </div>
        <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src={registerImg} alt='registerImg'/>
      </div>
      <div className="flex w-full flex-col mt-[200px] items-center md:w-1/2 md:mt-[100px]">
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]"> 
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Log in to your account</p>
          <p className="mt-6 text-center font-medium md:text-left">
            Don't have an account? {" "}
            <Link className='whitespace-nowrap font-semibold text-blue-700' to={'/register'}>Register here</Link>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-stretch pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              {error.email && (<span className='text-red-500 font-semibold'>{error.email}</span>)}
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="email" name='email' value={userData.email} onChange={handleChange} placeholder="Email" 
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              {error.password && (<span className='text-red-500 font-semibold'>{error.password}</span>)}
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" name='password' value={userData.password} onChange={handleChange} placeholder="Password (minimum 8 characters)" 
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" />
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