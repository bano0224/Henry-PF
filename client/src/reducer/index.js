import { POST_PRODUCT, GET_PRODUCTS, GET_PRODUCT_BY_ID, DELETE_PRODUCT } from "../Actions/Actions";

const initialState = {
  products: [],
  clearProducts: [],
  productDetail: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case POST_PRODUCT:
      return {
        ...state,
      };

    case GET_PRODUCTS:
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