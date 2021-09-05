import { useReducer } from 'react';
import { rootReducer, initialState } from '../reducer/product_reducer'; 
export const CLEAR_CART = "CLEAR_CART"

export default function ClearCart(){
    
    const [state, dispatch] = useReducer(rootReducer, initialState);

    dispatch({type:CLEAR_CART});
};