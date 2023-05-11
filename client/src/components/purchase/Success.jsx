import React, { useEffect, useState }  from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postPurchasedProduct } from "../../redux/actions";

export default function Success() {

  const dispatch = useDispatch();
  const [actionDispatched, setActionDispatched] = useState(false)

  const cart = JSON.parse(localStorage.getItem("purchaseData"));
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const actionAlreadyDispatched = sessionStorage.getItem('actionDispatched');

    if (!actionAlreadyDispatched) {
    dispatch(postPurchasedProduct(userId, cart));
    sessionStorage.setItem('actionDispatched', true);
    setActionDispatched(true);
  }
}, [dispatch, cart]);


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
          <p className="mb-4 text-xl font-semibold text-green-900">Tu pago ha sido aprobado.</p>
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
