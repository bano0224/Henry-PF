import * as actionTypes from '../actions/cart/const'


const initialState={
    cartItems:[],
    shippingData: [],
  };

export default function cartReducer(state = initialState, action){
    switch (action.type) {

        case actionTypes.ADD_TO_CART:
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
        
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i._id !== action.payload)
            }
        case actionTypes.SET_SHIPPINGDATA:
            return {
                ...state,
                shippingData: action.payload
            }    
    
        default:
            return state
    }
} 
