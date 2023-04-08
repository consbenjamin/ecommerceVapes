import { GET_PRODUCTS, GET_PRODUCTS_BY_NAME, POST_PRODUCTS, EDIT_PRODUCT, GET_PRODUCT_BY_ID, POST_REGISTER_USER, LOGIN_SUCCESS, LOGIN_ERROR, CART_ADD, CART_REMOVE, CART_UP, CART_DOWN } from "./actions";


const initialState = () => {
  const cartInLocalStorage = localStorage.getItem("cart")
  const initialCart = cartInLocalStorage ? JSON.parse(cartInLocalStorage) : []
  return {
    allProducts: [],
    user: [],
    token: [],
    error: null,
    cart: initialCart,
    numberCart: initialCart.length,
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
    case CART_ADD: {
      // Se verifica si el número de elementos en el carrito es igual a 0
      if (state.numberCart === 0) {
        // Si es así, se crea un objeto para el carrito con la información del producto a añadir
          let cart = {
              id: action.payload.id,
              quantity: 1,
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
                  state.cart[key].quantity++;
                  check = true;
              };
          });
          // Si el producto no está en el carrito, se crea un objeto para el carrito con la información del producto a añadir
          if (!check) {
              let _cart = {
                  id: action.payload.id,
                  quantity: 1,
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
          cart: newCart,
          numberCart: newCart.length
      }
    }
    case CART_UP:
      state.numberCart++
      state.cart[action.payload].quantity++;
      localStorage.setItem('cart', JSON.stringify(state.cart))
      return {
          ...state
      }
    case CART_DOWN: {
      let quantity = state.cart[action.payload].quantity;
      if (quantity > 1) {
          state.numberCart--;
          state.cart[action.payload].quantity--;

          localStorage.setItem('cart', JSON.stringify(state.cart))
          return {
              ...state
          }
      }
    }
    default: 
      return state;
  }
};