import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import persistState from 'redux-localstorage'
import productReducer from "../reducer/product_reducer";
import cartReducer from '../reducer/cart_reducer'

const rootReducer = combineReducers({
  cartReducer,
  productReducer
})

/* const loginInLocalStorage = localStorage.getItem("login")
  ? JSON.parse(localStorage.getItem("cart"))
  : false;
 */
  

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const INITIAL_STATE = {
  cartReducer: {
    cartItems: cartItemsInLocalStorage,
  },
};

export const store = createStore(
    rootReducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(thunk))
  )

