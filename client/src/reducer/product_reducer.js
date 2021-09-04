import { CREATE_PRODUCT, GET_PRODUCT_BY_ID, DELETE_PRODUCT, FILTER_BY_CATEGORY, CREATE_CATEGORY, GET_CATEGORIES, CHANGE_ORDER } from "../actions";
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
        clearProducts: action.payload
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
          const allProducts = state.clearProducts;
          const mapeo = allProducts.map(e => {
            return {...e, category: e.category.map(n => n.name)}
          })
          const filterProduct = action.payload === 'all' ? allProducts : mapeo.filter(e => {
            return e.category.includes(action.payload)
          })
          return {
            ...state,
            products: filterProduct
          }
     
    }      
        case CREATE_CATEGORY:
             return {
                ...state,
              };
        case GET_CATEGORIES: {
            return {
              ...state,
              categories: action.payload,
            };
          }
          case CHANGE_ORDER: {
            let array = [...state.clearProducts];
      
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
    default: return state; 
  }
  
}
function asc(a, b) {
  if (a.name < b.title) {
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

export default rootReducer;
