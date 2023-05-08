import React from 'react';

export default function Success() {
  // obtener los items del session storage
  const items = JSON.parse(sessionStorage.getItem('purchase'));
  console.log(items.userId)
  console.log(items.products);
  console.log(items)

  // calcular el total
  const total = items.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-green-100 py-10 mt-[76px]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-4">¡Gracias por tu compra!</h2>
        <p className="mb-4">Tu pago ha sido aprobado.</p>
        <p className="font-semibold mb-4">Total: ${total}</p>
        <ul className="list-disc pl-4">
          {items.products.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p>
              <p>Product ID: {item.id}</p>
              <img className=' w-[100px] h-[100px] ' src={item.img} alt='ImgNotFound' />
              <p>{item.quantity} x ${item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
