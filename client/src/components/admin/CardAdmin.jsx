import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/actions';
import axios from 'axios';
import Swal from 'sweetalert2';



export default function CardAdmin({name, price, img, id}) {

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  const handleSubmit =  (event) => {
    event.preventDefault();
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(deleteProduct(id))
      Swal.fire({
        title: 'Producto eliminado!',
        text: 'El producto se elimino correactamente.',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = '/admin';
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };


  return (
    <tbody className="text-sm font-normal text-gray-700 text-center">
      <tr className="py-10 bg-gray-100 hover:bg-gray-200 font-medium">
        <td className="px-4 py-4">
          {name}
        </td>
        <td className="px-4 py-4">
          {id}
        </td>
        <td className="flex justify-center items-center">
          <img className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 h-auto object-cover items-center' src={img} alt="ImgNotFound" />
        </td>
        <td className="px-4 py-4">
          {price}
        </td>
        <td className="items-center px-4 py-4">
          <div className="flex flex-col">
            <div className="font-medium text-red-500">10 pcs</div>
              <div className="text-xs text-gray-500">
                from 294 pcs.
              </div>
            </div>
            </td>
            <td className="px-4 py-4">
              10 pcs
            </td>
            <td className="px-4 py-4">
              <div className="flex-col lg:flex-row lg:space-x-0 lg:space-y-2 items-center space-y-2 2xl:space-x-2">
                <button
                  className="items-center px-2 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={handleSubmit}
                  className="items-center px-2 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
      </tr>
    </tbody>  
  )
};
