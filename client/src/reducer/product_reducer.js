import { CREATE_PRODUCT, GET_PRODUCT_BY_ID, DELETE_PRODUCT,
        FILTER_BY_CATEGORY, CREATE_CATEGORY, 
        GET_CATEGORIES, CHANGE_ORDER, GET_PRODUCT_BY_QUERY, GET_PRODUCT_DETAIL } from "../actions/index";

import { GET_PRODUCTS } from '../actions/getProducts'
import {ADD_TO_CART } from '../actions/shoppingCart';
import { CLEAR_CART } from '../actions/clearCart';
import { REMOVE_ONE_FROM_CART, REMOVE_ALL_FROM_CART} from '../actions/deleteFromShoppingCart'
import { PRODUCT_RESET } from "../actions/productReset";
import { SET_REVIEWS } from "../actions/setReviews";

export const initialState = {
  products: [],
  clearProducts: [],
  productDetail: [],
  categories: [],
  cart: [],
  reviews: []
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {

    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };

      case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.sort(() => {
          return Math.random() - 0.3;
        }),
        clearProducts: action.payload,
      };

      case GET_PRODUCT_BY_QUERY:
      return {
        ...state,
        products: action.payload,
      };

      case SET_REVIEWS:
        return {
          ...state,
        }

      // case GET_PRODUCT_DETAIL:
      // return {
      //   ...state,
      //   productDetail: action.payload,
      // };

    case FILTER_BY_CATEGORY: {
      const allProducts = state.clearProducts;
      const mapeo = allProducts.map((e) => {
        return { ...e, category: e.category.map((n) => n.name) };
      });
      const filterProduct =
        action.payload === "all"
          ? allProducts
          : mapeo.filter((e) => {
              return e.category.includes(action.payload);
            });
      return {
        ...state,
        products: filterProduct,
      };
    }

    case CREATE_CATEGORY:
      return {
        ...state,
      };

    case PRODUCT_RESET:
      return {
        ...state,
        productDetail: []
      }

    case GET_CATEGORIES: 
      return {
        ...state,
        categories: action.payload,
      }
    
    case GET_PRODUCT_BY_ID:
      return {
          ...state,
          productDetail: action.payload,
      };
      
    case DELETE_PRODUCT:
      const deleteProduct = state.products.filter(product => product.id === action.payload)
      return {
          ...state,
          clearProducts: deleteProduct
      };

    case CHANGE_ORDER: {
      let array = [...state.products];

      if (action.payload === 'asc') {
        array.sort(asc);
        return {
          ...state,
          products: [...array],
        };
      } else if (action.payload === 'desc') {
        array.sort(desc);
        return {
          ...state,
          products: [...array],
        };
      } else if (action.payload === 'max') {
        array.sort(maxToMin);
        return {
          ...state,
          products: [...array],
        };
      } else if (action.payload === 'min') {
        array.sort(minToMax);
        return {
          ...state,
          products: [...array],
        };
      } else {
        return state;
      }
    }
    case ADD_TO_CART:{
      let newItem = state.products.find(
        (product) => product._id === action.payload
      );

      let itemInCart = state.cart.find(item => item._id === newItem._id)

        return itemInCart ? {
          ...state, cart:state.cart.map(
            (item) => item._id === newItem._id ? 
            {...item, quantity: item.quantity + 1} //vamos a nesecitar poner en la card del carrito el contador con quantity
            : item                                 //en la card => ${price}.00 x {quantity} = ${price * quantity}.00
          ),
        } 
        : {
          ...state, cart:[...state.cart, {...newItem, quantity: 1}]
        }  
      }
    case REMOVE_ONE_FROM_CART:{
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      return itemToDelete.quantity > 1 ? {
        ...state,
        cart:state.cart.map((item) => item._id === action.payload? {...item, quantity: item.quantity -1}: item)
      } 
      : {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload)
      };
    }
    case REMOVE_ALL_FROM_CART:{
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload)
        };
    }
    case CLEAR_CART:
      return state;

    default:
      return state;
  }
}
function asc(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function desc(a, b) {
  if (a.name < b.name) {
    return 1;
  }
  if (a.name > b.name) {
    return -1;
  }
  return 0;
}

function minToMax(a, b) {
  return a.price - b.price;
}

function maxToMin(a, b) {
  return b.price - a.price;
}
