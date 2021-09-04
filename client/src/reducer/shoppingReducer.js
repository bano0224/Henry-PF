import {TYPES} from '../actions/shoppingCarts.js';

export const shoppingInitialState = {
    products:[],
    cart:[]
};

export function shoppingReducer(state, action){
    switch(action.type){
        case TYPES.ADD_TO_CART:{
            let newItem = state.products.find(product => product._id === action.payload)
        }
        case TYPES.REMOVE_ONE_FROM_CART:{
            
        }
        case TYPES.REMOVE_ALL_FROM_CART:{
            
        }
        case TYPES.CLEAR_CART:{
            
        }
        default:
            return state;
    }
}