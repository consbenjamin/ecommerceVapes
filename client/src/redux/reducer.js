import { GET_PRODUCTS, POST_PRODUCTS, EDIT_PRODUCT, GET_PRODUCT_BY_ID } from "./actions";


const initialState = {
  allProducts: [],
  user: [],
  token: [],
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
    default: return state;
  }
};