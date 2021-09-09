import * as actionTypes from '../actions/cart/const'

const initialState={
    cartItems:[]
}

export default function cartReducer(state = initialState, action){
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i._id !== action.payload)
            }
        default:
            return state
    }
} 

// store.subscribe( function () {
//   saveState(store.getState())
// })

// localStorage.removeItem(key)

// addItem = () => localStorage.setItem("name", this.state.name)

// removeItem = () => localStorage.removeItem("name")

