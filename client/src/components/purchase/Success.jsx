import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  // obtener los items del session storage
  const cart = JSON.parse(localStorage.getItem("purchaseData"));
  console.log(cart);

  // calcular el total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block mx-4"
      >
        Home
      </Link>
      <div className="bg-green-100 py-10 mt-[50px]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">¡Gracias por tu compra!</h2>
          <p className="mb-4">Tu pago ha sido aprobado.</p>
          <p className="text-lg font-semibold mb-4">Total: ${total}</p>
          <ul className="list-disc pl-4">
            {cart.map((item, index) => (
              <li key={index} className="text-lg font-semibold my-2">
                <p>{item.name}</p>
                <p>Product ID: {item.id}</p>
                <img
                  className=" w-[100px] h-[100px] "
                  src={item.img}
                  alt="ImgNotFound"
                />
                <p>
                  {item.quantity} x ${item.price}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
