import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postProducts } from '../../redux/actions';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


export default function AddProduct() {
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    flavor: '',
    img: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Lo que hace const handleImageChange es convertir la imagen en string base64 y agregarla a la formData, usando el metodo FileReader de Js..
  // Esto permite que la imagen se envie correctamente como string al servidor en lugar de mandarla como objeto o un array provocando una BadRequest 400.
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, img: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit =  (event) => {
    event.preventDefault();
    try {
      dispatch(postProducts(formData));
      Swal.fire({
        title: 'Producto creado',
        text: 'El producto se ha creado exitosamente.',
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
    <div className="mt-[150px] max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
      <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
        <div className="shrink-0 mr-auto sm:py-3">
          <p className="font-medium">Add Product</p>
          <p className="text-sm text-gray-600">Add new product </p>
        </div>
        <Link to={'/admin'}>
          <button className="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 sm:inline focus:outline-none focus:ring hover:bg-gray-200">Cancel</button>
        </Link>
        <button onClick={handleSubmit} 
        className="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700">Save</button>
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Name</p>
        <input placeholder="Name" name="name" value={formData.name} onChange={handleChange} 
        className="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1" />
        <p className="shrink-0 w-20 font-medium">Price</p>
        <input placeholder="Price" name="price" value={formData.price} onChange={handleChange}
        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Description</p>
        <input placeholder="Description" name="description" value={formData.description} onChange={handleChange}
        className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
      </div>
      <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
        <p className="shrink-0 w-32 font-medium">Flavor</p>
        <input placeholder="Flavor" name="flavor" value={formData.flavor} onChange={handleChange} 
        className="w-[32%] rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1" />
      </div>
      <div className="flex flex-col gap-4 py-4  lg:flex-row">
        <div className="shrink-0 w-32  sm:py-4">
          <p className="mb-auto font-medium">Image</p>
          <p className="text-sm text-gray-600">Choose Image</p>
        </div>
        <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
          <img src="/images/ddHJYlQqOzyOKm4CSCY8o.png" className="h-16 w-16" />
          <p className="text-sm text-gray-600">Drop your desired image file here to start the upload</p>
          <input type="file" onChange={handleImageChange} 
          className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1" />
        </div>
      </div>
      <div className="flex justify-end py-4 sm:hidden">
        <Link to={'/admin'}>
          <button className="mr-2 rounded-lg border-2 px-4 py-2 font-medium text-gray-500 focus:outline-none focus:ring hover:bg-gray-200">Cancel</button>
        </Link>
        <button onClick={handleSubmit} className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700">Save</button>
      </div>
    </div>
  )
};
