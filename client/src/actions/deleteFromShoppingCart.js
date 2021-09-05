/* import { useDispatch } from 'react-redux'
import { useReducer } from 'react';
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART"
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART"

export default function delFromCart(_id, all = false){
    const dispatch = dispatch();
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const { products, cart } = state;
    
    if(all) {
        dispatch({type:REMOVE_ALL_FROM_CART, payload:_id}) // <button onClick={()=>delFromCart(_id, true)}>Eliminar Todos</button>
    }else {
        dispatch({type:REMOVE_ONE_FROM_CART, payload:_id})// <button onClick={()=>delFromCart(_id)}>Eliminar Uno</button>
    }
}; */