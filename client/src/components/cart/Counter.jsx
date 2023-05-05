import React from "react";

export default function Counter({ amount, setAmount}) {

  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  const handleDecrement = () => {
    if (amount > 1 ) setAmount(amount - 1);
  };

  return (
    <div className="sm:order-1 mb-4">
      <div className="mx-auto flex h-8 gap-2 text-gray-600 flex-row">
        <p className=" text-xl text-slate-800">{amount}</p>
        <button
          onClick={() => handleDecrement()}
          className="flex items-center justify-center rounded-lg bg-gray-200 px-4 transition hover:bg-black hover:text-white"
        >
          -
        </button>
        <button
          onClick={() => handleIncrement()}
          className="flex items-center justify-center rounded-lg bg-gray-200 px-4 transition hover:bg-black hover:text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};