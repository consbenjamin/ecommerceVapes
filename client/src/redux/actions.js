import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const POST_PRODUCTS = 'POST_PRODUCTS';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const POST_REGISTER_USER = 'POST_REGISTER_USER';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';


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

export function registerUser(userData) {
  return async function (dispatch) {
    try {
      let json = await axios.post('http://localhost:3001/account/register', userData);
      return dispatch({
        type: POST_REGISTER_USER,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
};

export function loginUser(email, password) {
  return async function (dispatch) {
    try {
      let json = await axios.post('http://localhost:3001/account/login', {email, password});
      const { user, token } = json.data;
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: { user, token } 
      });
    } catch (error) {
      return dispatch({
        type: LOGIN_ERROR,
        payload: error.message 
      });
    }
  }
};
