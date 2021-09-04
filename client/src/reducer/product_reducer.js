import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_QUERY,
} from "../actions";

const initialState = {
  products: [],
  clearProducts: [],
  productDetail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT:
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
      const deleteProduct = state.products.filter(
        (product) => product.id === action.payload
      );
      return {
        ...state,
        clearProducts: deleteProduct,
      };
    case GET_PRODUCT_BY_QUERY:
      return {
        ...state,
        product: action.playload,
      };

    default:
      return state;
  }
}

export default rootReducer;
