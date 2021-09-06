import { useReducer } from 'react';
import { rootReducer, initialState } from '../reducer/product_reducer'; 
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART"
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART"

export default function DelFromCart(_id, all = false){

    const [state, dispatch] = useReducer(rootReducer, initialState);

    if(all) {
        dispatch({type:REMOVE_ALL_FROM_CART, payload:_id}) // <button onClick={()=>delFromCart(_id, true)}>Eliminar Todos</button>
    }else {
        dispatch({type:REMOVE_ONE_FROM_CART, payload:_id})// <button onClick={()=>delFromCart(_id)}>Eliminar Uno</button>
    }
};