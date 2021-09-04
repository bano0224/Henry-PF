import { CREATE_PRODUCT, GET_PRODUCT_BY_ID, DELETE_PRODUCT, FILTER_BY_CATEGORY, CREATE_CATEGORY, GET_CATEGORIES } from "../actions";
import { GET_PRODUCTS } from '../actions/getProducts'

const initialState = {
  products: [],
  clearProducts: [],
  productDetail: [],
  categories: []
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
        case FILTER_BY_CATEGORY: {
          let array = [];
          for (let i = 0; i < state.categories.length; i++) {
            const category = state.categories[i];
            for (let j = 0; j < state.products.category.length; j++) {
              const id = state.products.category[j].id;
              if (id === action.payload) {
                array.push(category);
              }
            }
          }
          return {
            ...state,
            categpries: [...array],
          };
        }
        case CREATE_CATEGORY:
             return {
                ...state,
              };
        case GET_CATEGORIES: {
            let filter = action.payload.map((category) => {
              return category.id;
            });
            return {
              ...state,
              categories: filter,
            };
          }

    default: return state; 
  }
}

export default rootReducer;
