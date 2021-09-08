import { useReducer } from 'react';
import { rootReducer, initialState } from '../reducer/product_reducer'; 
import {useDispatch} from 'react-redux'
import { ADD_TO_CART } from '.';




export default function AddToCart(_id){ //poner esto en el Cards para agregar al carrito
    const dispatch = useDispatch();
    /* const [state, dispatch] = useReducer(rootReducer, initialState); */

    dispatch({type:ADD_TO_CART, payload:_id}); //<button onClick={() => addToCart(_id)}>Agregar</button>
};
