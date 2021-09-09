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

// const cartItemsInLocalStorage = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : [];

// const mainEnhancer = compose(persistState(cartReducer))

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk)),
//   mainEnhancer
// )

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )

