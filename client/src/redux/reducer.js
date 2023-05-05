import { GET_PRODUCTS, GET_PRODUCTS_BY_NAME, POST_PRODUCTS, EDIT_PRODUCT, GET_PRODUCT_BY_ID, POST_REGISTER_USER, LOGIN_SUCCESS, LOGIN_ERROR, CART_ADD, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, FILTER_PRODUCTS_BY_BRAND_SUCCESS, FILTER_PRODUCTS_BY_BRAND_FAILURE, FILTER_PRODUCTS_BY_PRICE_FAILURE, FILTER_PRODUCTS_BY_PRICE_SUCCESS, PRODUCTS_SORTED_BY_PRICE, EDIT_USER_DATA, CART_REMOVE, POST_TO_CART} from "./actions";


const initialState = () => {
  return {
    allProducts: [],
    products: [],
    user: [],
    token: [],
    error: null,
    isLoading: false,
    cart: [],
    numberCart: 0,
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
      console.log("action.payload", action.payload);
        // Se verifica si el número de elementos en el carrito es igual a 0
        if (state.numberCart === 0) {
          // Si es así, se crea un objeto para el carrito con la información del producto a añadir
            let cart = {
                id: action.payload.id,
                quantity: action.payload.quantity,
                name: action.payload.name,
                img: action.payload.img,
                price: action.payload.price,
                flavor: action.payload.flavor
            }
            // Se agrega el objeto del carrito al array del estado
            state.cart.push(cart);
        }
        // Si el carrito ya tiene elementos, se verifica si el producto a añadir ya está en el carrito
        else {
            let check = false;
            state.cart.forEach((item, key) => {
                if (item.id === action.payload.id) {
                  // Si el producto ya está en el carrito, se incrementa la cantidad
                    state.cart[key].quantity += action.payload.quantity;
                    check = true;
                };
            });
            // Si el producto no está en el carrito, se crea un objeto para el carrito con la información del producto a añadir
            if (!check) {
                let _cart = {
                    id: action.payload.id,
                    quantity: action.payload.quantity,
                    name: action.payload.name,
                    img: action.payload.img,
                    price: action.payload.price,
                    flavor: action.payload.flavor
                }
                // Se agrega el objeto del carrito al array del estado
                state.cart.push(_cart);
            }
        }
        // Se actualiza el carrito en el almacenamiento local
        localStorage.setItem('cart', JSON.stringify(state.cart))
        // Se retorna un nuevo objeto del estado con el número de elementos en el carrito actualizado
            return {
            ...state,
            numberCart: state.numberCart + 1
        }
    }
    case CART_REMOVE: {
      const newCart = state.cart.filter(item => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(newCart))
      return {
          ...state,
          cart: newCart
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
    default: 
      return state;
  }
};




// SIN CONTROLADORES EN EL BACK:
// case CART_UP:
    //   state.numberCart++
    //   state.cart[action.payload].quantity++;
    //   localStorage.setItem('cart', JSON.stringify(state.cart))
    //   return {
    //       ...state
    //   }
    // case CART_DOWN: {
    //   let quantity = state.cart[action.payload].quantity;
    //   if (quantity > 1) {
    //       state.numberCart--;
    //       state.cart[action.payload].quantity--;

    //       localStorage.setItem('cart', JSON.stringify(state.cart))
    //       return {
    //           ...state
    //       }
    //   }
    // }

    








  //con controladores en el back 
    // case CART_ADD: {
    //   return {
    //     ...state,
    //     cart: [action.payload, ...state.cart],
    //   };
    // }

    // case UPDATE_CART: {
    //   return {
    //     ...state,
    //     cart: action.payload
    //   };
    // }