import * as actionTypes from '../actions/cart/const'

const initialState={
    cartItems:['hola']
}

export default function cartReducer(state = initialState, action){
    switch (action.payload) {
        case actionTypes.ADD_TO_CART:
            return
            
            
    
        default:
            return state
    }
}