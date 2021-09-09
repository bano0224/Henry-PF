import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import productReducer from "../reducer/product_reducer";
import cartReducer from '../reducer/cart_reducer'

const rootReducer = combineReducers({
  cartReducer,
  productReducer
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


