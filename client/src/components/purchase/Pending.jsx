import React from 'react'
import { Link } from "react-router-dom";

export default function Pending() {
  return (
    <>
    <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block mx-4"
      >
        Return
      </Link>
      <div className="flex items-center justify-center py-10 mt-[180px]">
        <div className="mx-auto container">
          <h1 className="text-3xl font-bold">Purchase Pending</h1>
          <p className="text-gray-500">Su compra aún está pendiente. Le informaremos una vez que se apruebe o rechace.</p>
        </div>
      </div>
    </>
  )
}
