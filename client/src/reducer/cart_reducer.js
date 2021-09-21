import * as actionConst from '../actions/cart/const'


const initialState={
    cartItems:[],
    shippingData: [],
  };

export default function cartReducer(state = initialState, action){
    switch (action.type) {

        case actionConst.ADD_TO_CART:
            const item = action.payload;
            console.log(item._id)
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i._id === item._id ? item : i),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        
        case actionConst.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i._id !== action.payload)
            }

        case actionConst.SET_SHIPPINGDATA:
            return {
                ...state,
                shippingData: action.payload
            }    

        case actionConst.RESET_CART:
            localStorage.removeItem('cart')
            return {
                ...state,
                cartItems: []
            }
        
        case actionConst.MERCADOPAGO_PAYMENT:
            return {
                ...state,
                cartItems: [],
            };
        
        default:
            return state
    }
} 
