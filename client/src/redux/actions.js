import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_BY_NAME = 'GET_PRODUCTS_BY_NAME';
export const POST_PRODUCTS = 'POST_PRODUCTS';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const POST_REGISTER_USER = 'POST_REGISTER_USER';
export const EDIT_USER_DATA =  'EDIT_USER_DATA';

export const CART_ADD = 'CART_ADD';
export const CART_REMOVE = 'CART_REMOVE';
export const CART_UP = 'CART_UP';
export const CART_DOWN = 'CART_DOWN';

//Filtros
export const FILTER_PRODUCTS_BY_BRAND_SUCCESS = 'FILTER_PRODUCTS_BY_BRAND_SUCCESS';
export const FILTER_PRODUCTS_BY_BRAND_FAILURE = 'FILTER_PRODUCTS_BY_BRAND_FAILURE';

export const FILTER_PRODUCTS_BY_PRICE_SUCCESS = 'FILTER_PRODUCTS_BY_PRICE_SUCCES';
export const FILTER_PRODUCTS_BY_PRICE_FAILURE = 'FILTER_PRODUCTS_BY_PRICE_FAILURE';

export const PRODUCTS_SORTED_BY_PRICE = 'PRODUCTS_SORTED_BY_PRICE';






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

export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      let json = await axios.delete(`http://localhost:3001/products/${id}`);
      return dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: {
          id: id,
          message: `El producto con id =${id} fue eliminado exitosamente`,
      }})
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: { message: 'Ocurrió un error al intentar eliminar el producto' },
      });
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

export function getProductsByName(name) {
  return async function(dispatch) {
    try{
      let json = await axios.get(`http://localhost:3001/products/name/${name}`); 
      return dispatch({
        type: GET_PRODUCTS_BY_NAME,
        payload: json.data
      })
    }
    catch(error){
      console.log(`${name} no existe`)
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

export function editUserData(id, data) {
  return async function (dispatch) {
    try {
      let json = await axios.put(`http://localhost:3001/account/editData/${id}`, data);
      return dispatch({
        type: EDIT_USER_DATA,
        payload: json.data 
      });
    } catch (error) {
      console.log(error)
    }
  }
};



export function cartAdd(payload){
  let id = localStorage.getItem('userId')
  if(id) {
      return async function(dispatch){
          dispatch({
              type: CART_ADD,
              payload
          })
      console.log(payload);
      await axios.put(`http://localhost:3001/login/updateCart/${id}`, payload)
      }
  } else { 
    const error = new Error("Tienes que tener tu sesión iniciada para agregar cosas al carrito");
    return function (dispatch) {
      dispatch({
        type: CART_ADD,
        payload
      });
      console.error(error);
      throw error;
    };
  } 
};

export function cartRemove(payload){
  return async function(dispatch){
      dispatch({
          type: CART_REMOVE,
          payload
      })
  }
};

export function cartUp(payload){
  return async function(dispatch){
      dispatch({
          type: CART_UP,
          payload
      })
  }
};

export function cartDown(payload){
  return async function(dispatch){
      dispatch({
          type: CART_DOWN,
          payload
      })
  }
};

export function filterByBrand(brandId){
  return async function(dispatch){
    try {
      let response;
      if (brandId === null) {
        response = await axios.get(`http://localhost:3001/products`);
      } else {
        response = await axios.get(`http://localhost:3001/products/brands/${brandId}`);
      }
      dispatch({
        type: FILTER_PRODUCTS_BY_BRAND_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: FILTER_PRODUCTS_BY_BRAND_FAILURE,
        payload: error.message
      });
    }
  }
};

export function filterByPrice(minPrice, maxPrice){
  return async function(dispatch){
    try {
      const res = await axios.get(`http://localhost:3001/products/filter/price?minPrice=${minPrice}&maxPrice=${maxPrice}`);
      dispatch({
        type: FILTER_PRODUCTS_BY_PRICE_SUCCESS,
        payload: res.data
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FILTER_PRODUCTS_BY_PRICE_FAILURE,
        payload: error.message
      });
    }
  }
};

export function sortByPrice(order){
  return async function(dispatch){
    try {
      let response = await axios.get(`http://localhost:3001/products/filter/sort-by-price?order=${order}`);
      dispatch({
        type: PRODUCTS_SORTED_BY_PRICE,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  }
};







