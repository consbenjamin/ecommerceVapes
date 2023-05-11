import { GET_PRODUCTS, GET_PRODUCTS_BY_NAME, POST_PRODUCTS, EDIT_PRODUCT, GET_PRODUCT_BY_ID, POST_REGISTER_USER, LOGIN_SUCCESS, LOGIN_ERROR, CART_ADD, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, FILTER_PRODUCTS_BY_BRAND_SUCCESS, FILTER_PRODUCTS_BY_BRAND_FAILURE, FILTER_PRODUCTS_BY_PRICE_FAILURE, FILTER_PRODUCTS_BY_PRICE_SUCCESS, PRODUCTS_SORTED_BY_PRICE, EDIT_USER_DATA, CART_REMOVE, POST_TO_CART, PURCHASE_LINK, POST_PURCHASED_PRODUCT } from "./actions";


const initialState = () => {
  return {
    allProducts: [],
    products: [],
    user: [],
    token: [],
    error: null,
    isLoading: false,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    numberCart: JSON.parse(localStorage.getItem('cart'))?.reduce((total, item) => total + item.quantity, 0) || 0,
    purchaseLink: [],
    purchasedProducts: [],
  };
}


export default function rootReducer (state = initialState(), action) {
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
    case GET_PRODUCTS_BY_NAME: {
      return {
        ...state,
        allProducts: action.payload
      }
    }
    case POST_PRODUCTS: {
      return {
        ...state,  // Crea una copia superficial del estado existente
        allProducts: [action.payload, ...state.allProducts],
      }
    }
    case DELETE_PRODUCT_SUCCESS: {
      const updatedProducts = state.allProducts.filter((product) => product.id !== action.payload.id);
      return {
        ...state,
        allProducts: updatedProducts,
        error: null
      };
    }
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload.message
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
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case EDIT_USER_DATA: {
      return {
        ...state,
        user: action.payload.user,
        error: null
      };
    }
    case CART_ADD: {
      const productToAdd = action.payload;
      console.log("action.payload", productToAdd)
      const cartItem = state.cart.find(item => item.id === productToAdd.id);
    
      if (cartItem) {
        // Si el producto ya está en el carrito, se actualiza la cantidad
        cartItem.quantity += productToAdd.quantity;
      } else {
        // Si el producto no está en el carrito, se agrega al array
        state.cart.push(productToAdd);
      }
    
      // Se actualiza el carrito en el almacenamiento local
      localStorage.setItem('cart', JSON.stringify(state.cart));
    
      return {
        ...state,
        numberCart: state.numberCart + productToAdd.quantity
      }
    }
    case CART_REMOVE: {
      const removedItemId = action.payload;
      const cartItem = state.cart.find(item => item.id === removedItemId);

      let newNumberCart = state.numberCart;

      if (cartItem) {
        // Si el producto está en el carrito, se resta su cantidad del numberCart
        newNumberCart -= cartItem.quantity;
      }
      const newCart = Array.isArray(state.cart) ? state.cart.filter(item => item.id !== action.payload) : [];
      localStorage.setItem('cart', JSON.stringify(newCart))
      return {
          ...state,
          cart: newCart,
          numberCart: newNumberCart
      }
    }
    case POST_TO_CART: {
      return {
        ...state,
        cart: action.payload
      }
    }
    case FILTER_PRODUCTS_BY_BRAND_SUCCESS: {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        error: null
      };
    }
    case FILTER_PRODUCTS_BY_BRAND_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case FILTER_PRODUCTS_BY_PRICE_SUCCESS: {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        error: null
      };
    }
    case FILTER_PRODUCTS_BY_PRICE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case PRODUCTS_SORTED_BY_PRICE: {
      return {
        ...state,
        products: action.payload
      };
    }
    case PURCHASE_LINK: {
      return {
        ...state,
        purchaseLink: action.payload
      };
    }
    case POST_PURCHASED_PRODUCT: {
      const purchasedProducts = action.payload;
      return {
        ...state,
        purchasedProducts: [...state.purchasedProducts, ...purchasedProducts],
        cart: [],
        numberCart: 0
      };
    }
    default: 
      return state;
  }
};
