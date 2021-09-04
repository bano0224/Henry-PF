import { useReducer } from 'react';
import {initialState, rootReducer} from '../reducer/product_reducer';
import Cards from '../Cards/Cards';

export default function ShoppingCart(){
    const [state, dispatch] = useReducer(
        rootReducer, 
        initialState);

    const {products, cart} = state;

    const addToCart = (_id) => {
        dispatch({type:TYPES.ADD_TO_CART, payload:_id});
    };

    const delFromCart = () => {};

    const clearCart = () => {};

    return (
        <div>
            <h2>Carrito de Compras</h2>
            <h3>Productos</h3>
            <article className="box">
               { products.map((product) => <Cards key={product._id} data={product} addToCart={addToCart}/>)}
            </article>
            <h3>Carrito</h3>
            <article className="box"></article>
            <button onClick={clearCart}>Limpiar Carrito</button>
            {
                cart.map((item, index) => <div><Cards key={index} data={item} delFromCart={delFromCart}/></div>)
            }
        </div>
    )
}
