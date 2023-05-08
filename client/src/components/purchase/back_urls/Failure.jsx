import React from 'react'

export default function Failure() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold text-red-500 mb-4">Lo siento, tu pago no ha sido aprobado</h2>
      <p className="text-lg text-gray-700 text-center">Por favor, intenta nuevamente más tarde o utiliza otro medio de pago.</p>
    </div>
  )
}
