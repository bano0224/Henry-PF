import React from 'react'
import { useSelector } from 'react-redux';
import Cards from '../Cards/Cards';


export default function ShoppingCart(){

    const cart = useSelector(state => state.cart)
    return (
        <div>
            <h2>Carrito de Compras</h2>
{/*             <h3>Productos</h3> 
            <article className="box">
               { products.map((product) => <Cards key={product._id} data={product} addToCart={addToCart}/>)}
            </article> */}
            <h3>Carrito</h3>
            <article className="box"></article>
            {
            (cart) ? cart?.map((item, index) => <div><Cards/></div>)
            : alert(`No hay productos seleccionados`)
            }
            <button onClick={clearCart}>Limpiar Carrito</button>
        </div>
    )
}
