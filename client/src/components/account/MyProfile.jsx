import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUserData } from '../../redux/actions';
import Swal from 'sweetalert2';



export default function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const loggedInUserId = localStorage.getItem("userId");

  console.log(loggedInUserId)

  useEffect(() => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
  }, [user]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      repeatPassword
    };
    try {
      await dispatch(editUserData(loggedInUserId, data));
      localStorage.setItem('firstName', firstName);
      Swal.fire({
        title: 'Datos de usuario actualizados',
        text: 'Los datos del usuario se han actualizado exitosamente.',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = '/';
      });
    } catch (error) {
      Swal.fire({
        title: 'Error al actualizar los datos de usuario',
        text: 'Ha ocurrido un error al intentar actualizar los datos de usuario.',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'Cerrar'
      });
      console.log(error)
    }
  };



  return (
    <div className="my-[150px] max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
      <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
        <div className="shrink-0 mr-auto sm:py-3">
          <p className="font-medium">Account Details</p>
          <p className="text-sm text-gray-600">Edit your account details</p>
        </div>
        <button className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200">Cancel</button>
        <button onClick={handleSubmit} className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700">Save</button>
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Name</p>
        <input 
          placeholder="First Name" 
          className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <input 
          placeholder="Last Name" 
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Email</p>
        <input 
          placeholder="your.email@domain.com" 
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Password</p>
        <input 
          placeholder="Password" 
          name='password' 
          className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
          value={password}
          onChange={handlePasswordChange}
        />
        <input 
          placeholder="Repeat Password" 
          name='repeat-password' 
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          value={repeatPassword}
          onChange={handleRepeatPasswordChange}
        />
      </div>
      <div className="flex justify-end py-4 sm:hidden">
        <button className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">Cancel</button>
        <button onClick={handleSubmit} className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">Save</button>
      </div>
    </div>
  )
};
