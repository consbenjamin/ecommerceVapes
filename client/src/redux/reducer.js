import { GET_PRODUCTS, POST_PRODUCTS, EDIT_PRODUCT, GET_PRODUCT_BY_ID, POST_REGISTER_USER, LOGIN_SUCCESS, LOGIN_ERROR } from "./actions";


const initialState = {
  allProducts: [],
  user: [],
  token: [],
  error: null,
};


export default function rootReducer (state = initialState, action) {
  switch(action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        allProducts: action.payload,
      }
    }
    case GET_PRODUCT_BY_ID: {
      return {
        ...state,
        allProducts: action.payload,
      }
    }
    case POST_PRODUCTS: {
      return {
        ...state,  // Crea una copia superficial del estado existente
        allProducts: [action.payload, ...state.allProducts] // Actualiza la propiedad allProducts con un nuevo array que contiene el nuevo producto al principio y todos los productos existentes después.
      }
    }
    case EDIT_PRODUCT: {
      return {
        ...state,
        allProducts: state.allProducts.map(product => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              ...action.payload
            };
          }
          return product;
        })
      }
    }
    case POST_REGISTER_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    default: return state;
  }
};