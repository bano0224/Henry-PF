import { useReducer } from 'react';
import { rootReducer, initialState } from '../reducer/product_reducer'; 
import { CLEAR_CART } from '.';

export default function ClearCart(){
    
    const [state, dispatch] = useReducer(rootReducer, initialState);

    dispatch({type:CLEAR_CART});
};