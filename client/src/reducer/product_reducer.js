import * as actionConst from '../actions/index'


export const initialState = {
    products: [],
    clearProducts: [],
    allProducts: [],
    productDetail: [],
    productReviews: [],
    categories: [],
    categoryDetail: [],
    cart: [],
    reviews: [],
    users: [],
    userDetail: [],
    roles: [],
    login: false,
    promociones: false,
    checkLogin: [],
    error: [],
    orderByUser: [],
    orders: [],
    ordersToShow: [],
    orderDetail: [],
    wishlist: []
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
  
        case actionConst.CREATE_PRODUCT:
            return {
                ...state,
                // products: [...state.products, action.post]
            };

        case actionConst.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.sort(() => {
                return Math.random() - 0.3;
                }),
                clearProducts: action.payload,
                allProducts: action.payload
            }

        case actionConst.GET_PRODUCT_BY_QUERY:
            return {
                ...state,
                products: action.payload,
            } 

        case actionConst.GET_PRODUCT_BY_ID:
            return {
                ...state,
                productDetail: action.payload,
            }

        case actionConst.DELETE_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
            case actionConst.GET_ORDERS:
              return {
                ...state,
                orders: action.payload,
                ordersToShow: action.payload
              }  
              
              case actionConst.GET_ORDER_BY_ID:
          return {
            ...state,
            orderDetail: action.payload[0]
          }
          case actionConst.FILTER_BY_STATUS:
            const allOrders = state.orders
            const filterOrder =
                action.payload === "all"
                ? allOrders
                : allOrders.filter(e =>  e.status.toLowerCase() === action.payload);
            return {
                ...state,
                ordersToShow: filterOrder,
            }
        case actionConst.SET_REVIEWS:
            return {
                ...state,
            }

        case actionConst.STATE_LOGIN:
          return {
            ...state,
            login: true
          }

        case actionConst.STATE_LOGOUT:
          return {
            ...state,
            login: false
            }

        case actionConst.CHECK_LOGIN:
          console.log('ESTOY ENTRANDO AL REDUCER')
          return {
            ...state,
            checkLogin: action.payload
          }

        case actionConst.FILTER_BY_CATEGORY: 
        console.log('REDUCER', action.payload);
            const allProducts = state.clearProducts;
            const mapeo = allProducts.map((e) => {
                return { ...e, category: e.category.map((n) => n.name) };
            })
            const filterProduct =
                action.payload === "all"
                ? allProducts
                : mapeo.filter((e) => {
                    return e.category.includes(action.payload);
                    });
                    console.log('FILTRADO', filterProduct);
            return {
                ...state,
                products: filterProduct,
            }

        case actionConst.CREATE_CATEGORY:
            return {
              ...state,
              categories: action.payload
            }

        case actionConst.PRODUCT_RESET:
            return {
                ...state,
                productDetail: []
            }

        case actionConst.GET_CATEGORIES: 
          return {
              ...state,
              categories: action.payload,
          }

        case actionConst.GET_CATEGORY_BY_ID:
          return {
              ...state,
              categoryDetail: action.payload
          }

        case actionConst.GET_REVIEWS:
          return {
            ...state,
            productReviews: action.payload
          }

        case actionConst.GET_WISHLIST:
          return {
            ...state,
            wishlist: action.payload
          }

        case actionConst.CHANGE_ORDER:
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
            
        case actionConst.REMOVE_ONE_FROM_CART:
            let itemToDelete = state.cart.find((item) => item.id === action.payload);
            return itemToDelete.quantity > 1 ? {
              ...state,
              cart:state.cart.map((item) => item._id === action.payload? {...item, quantity: item.quantity -1}: item)
            } 
            : {
              ...state,
              cart: state.cart.filter((item) => item._id !== action.payload)
            };
        

        case actionConst.REMOVE_ALL_FROM_CART:
            return {
              ...state,
              cart: state.cart.filter((item) => item.id !== action.payload)
            };
        

        case actionConst.CLEAR_CART:
            return state;

        case actionConst.GET_USERS:
            return {
              ...state,
              users: action.payload
            }

        case actionConst.GET_ORDER_BY_USER:
          return {
              ...state,
              orderByUser: action.payload
          }
              

        case actionConst.GET_USER_BY_ID:
          return {
            ...state,
            userDetail: action.payload,
            loading: false
          }

        case actionConst.DELETE_USER:
          return {
            ...state,
            users: action.payload
          }

        case actionConst.GET_ROLES:
          return {
            ...state,
            roles: action.payload
          }

        case actionConst.LOGIN_ERROR:
          return {
            ...state,
            error: action.payload
          }

        case actionConst.RESET_ERROR:
          return {
            ...state,
            error: []
          }

        default: 
            return state
    }
}

//Functions
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
  