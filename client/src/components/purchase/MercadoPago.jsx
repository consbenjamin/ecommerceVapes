import React, { useEffect }  from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';

export default function MercadoPago({ publicKey }) {
  useEffect(() => {
    initMercadoPago(publicKey);
  }, [publicKey]);

  return null;
};
