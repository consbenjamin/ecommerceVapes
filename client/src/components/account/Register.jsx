import React, { useState } from 'react';
import registerImg from '../../assets/registerImg.jpg';
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from '../../redux/actions';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';



export default function Register() {

  ///// EXPRESIONES REGULARES /////
  const expNombre = /^[a-zA-Z\s]{3,15}$/;
  const expCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  const expContraseña = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  const dispatch = useDispatch();

  const [error, setError] = useState({});

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validation(userData);
    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Hubo un error al registrarse! Por favor, verifica los errores en el formulario e inténtalo de nuevo.',
      });
    } else {
      try {
        // Aquí puedes hacer la consulta para verificar si el usuario ya está registrado
        const response = await dispatch(loginUser(userData.email, userData.password));
        console.log(response)
        if (response.type === 'LOGIN_SUCCESS') {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Este correo electrónico ya está registrado. Por favor, inicie sesión o use otro correo electrónico.',
          });
        } else {
          dispatch(registerUser(userData));
          return Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Gracias por registrarte, redireccionando al login.',
            timer: 3000,
            showConfirmButton: false
          }).then(() => {
          window.location.href = '/login';
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Hubo un error al registrarse! Por favor, inténtalo de nuevo más tarde.',
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    const updatedErrors = validation({
      ...userData,
      [name] : value,
    });
    setError(updatedErrors);
  };
  

  ///// VALIDACIONES /////

  function validation(userData) {
    let errors = {};

    if (!userData.firstName) {
      errors.firstName = "El nombre es requerido.";
    } else if (!expNombre.test(userData.firstName)) {
      errors.firstName =
        "Tu Nombre debe contener más de 3 caracteres o no pasarte de los 15, y no puede contener numeros.";
    }

    if (!userData.lastName) {
      errors.lastName = "El Apellido es requerido.";
    } else if (!expNombre.test(userData.lastName)) {
      errors.lastName =
        "Tu Apellido debe contener más de 3 caracteres o no pasarte de los 15, y no puede contener numeros.";
    }

    if (!userData.email) {
      errors.email = "El email es requerido.";
    } else if (!expCorreo.test(userData.email)) {
      errors.email = "Esto no parece un email.";
    }

    if (!userData.password) {
      errors.password = "La contraseña es requerida.";
    } else if (!expContraseña.test(userData.password)) {
      errors.password =
        "Tu contraseña debe tener al menos 8 caracteres, con al menos una letra minúscula, una mayúscula, un dígito y un caracter especial.";
    }

    if (!userData.repeatPassword) {
      errors.repeatPassword = "Repite tu contraseña.";
    } else if (userData.password !== userData.repeatPassword) {
      errors.repeatPassword = "Tu contraseña no coincide.";
    }
    return errors;
  }



  return (
    <div className="flex w-screen flex-wrap text-slate-800 ">
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
        <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
          <p className="mb-7 text-sm opacity-70">Vape Club</p>
        </div>
        <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src={registerImg} alt='imgNotFound'/>
      </div>
      <div className="flex w-full flex-col mt-[120px] md:w-1/2 ">
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]"> 
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Create your account</p>
          <p className="mt-6 text-center font-medium md:text-left">
            Already registered? {" "} 
            <Link className='whitespace-nowrap font-semibold text-blue-700' to={'/login'}>Login here</Link>
          </p>
          {/* <button className="mt-8 flex items-center justify-center rounded-md border px-4 py-1">
            <img className="mr-2 h-5" src={googleLogo} alt='googleLogo' />Log in with Google
          </button>
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">Or use email instead</div>
          </div> */}
          <form onSubmit={handleSubmit} className="flex flex-col items-stretch pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="text" name='firstName' value={userData.firstName} onChange={handleChange} placeholder="First Name"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"/>
                {error.firstName && (<span>{error.firstName}</span>)}
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="text" name='lastName' value={userData.lastName} onChange={handleChange} placeholder="Last Name" 
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"/>
                {error.lastName && (<span>{error.lastName}</span>)}
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="email" name='email' value={userData.email} onChange={handleChange} placeholder="Email"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"/>
                {error.email && (<span>{error.email}</span>)}
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" name='password' value={userData.password} onChange={handleChange} placeholder="Password (Min. 8 characters)"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"/>
                {error.password && (<span>{error.password}</span>)}
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input type="password" name='repeatPassword' value={userData.repeatPassword} onChange={handleChange} placeholder="Repeat Password"
                className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"/>
                {error.repeatPassword && (<span>{error.repeatPassword}</span>)}
              </div>
            </div>
            <button type="submit" className="mt-6 rounded-lg bg-primary px-4 py-2 text-center text-base font-semibold text-white shadow-md hover:bg-blue-700 md:w-32">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};
