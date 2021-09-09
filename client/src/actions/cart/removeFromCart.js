import * as actionTypes from './const.js'


export default function removeFromCart (id) {
    return function (dispatch){
        dispatch({
            type:actionTypes.REMOVE_FROM_CART,
            payload: id
        })
    }
}