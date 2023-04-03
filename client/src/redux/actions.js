import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const POST_PRODUCTS = 'POST_PRODUCTS';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';


export const getProducts = () => {
  return async (dispatch) => {
    let json = await axios.get('http://localhost:3001/products'); //Conexion back y front.
    return dispatch({
      type: GET_PRODUCTS,
      payload: json.data
    })
  }
};

export function postProducts(payload) {
  return async function(dispatch) {
    try {
      await axios.post(`http://localhost:3001/products`, payload);
      dispatch ({
        type: POST_PRODUCTS,
        payload
    });
    } catch (error) {
      console.log(error)
    }
  }
};

export function editProduct(id, newProduct) {
  return async function (dispatch) {
    try {
      let json = await axios.put(`http://localhost:3001/products/edit/${id}`, newProduct);
      return dispatch({
        type: EDIT_PRODUCT,
        payload: json.data
      });
    } catch (error) {
      console.log('No se pudo modificar el producto', error);
    }
  }
};

export function getProductsById(id) {
  return async function(dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
};