import { CREATE_PRODUCT, GET_PRODUCT_BY_ID, DELETE_PRODUCT } from "../actions";
import { GET_PRODUCTS } from '../actions/getProducts'

const initialState = {
  products: [],
  clearProducts: [],
  productDetail: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
      };

    case GET_PRODUCTS:
      console.log('REDUCERRRR')
      return {
        ...state,
        products: action.payload,
      };

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

    default:
      return state;
  }
}

export default rootReducer;
