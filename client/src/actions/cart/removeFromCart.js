import * as actionTypes from './const.js'


export default function removeFromCart (id) {
    return function (dispatch, getState){
        dispatch({
            type:actionTypes.REMOVE_FROM_CART,
            payload: id
        })
        localStorage.setItem("cart", JSON.stringify(getState().cartReducer.cartItems));
    }
} 