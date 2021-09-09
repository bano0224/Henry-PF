import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cart from './Cart';
import NavBar from '../NavBar/NavBar';
import addToCart from '../../actions/cart/addToCart';
import removeFromCart from '../../actions/cart/removeFromCart';
import { Link } from 'react-router-dom';

export default function CartScreen() {
    const dispatch= useDispatch()
    const cartReducer = useSelector(state => state.cartReducer)
    const {cartItems} = cartReducer
    
    const handlerQty= (id, qty)=>{
        dispatch(addToCart(id,qty))
    }

    const handlerRemove = (id)=>{
        dispatch(removeFromCart(id))
    }
    //🐱‍👤
    /* useEffect para localStorage ? */
    
    return (
        <div>
            <NavBar />
            <br />
            <Link to='/'>Back home</Link>
            <h1>Shopping Cart</h1>
            {
                cartItems.length === 0 
                ?(
                    <div>
                        Carrito vacío.
                    </div>
                )
                :(
                    cartItems.map(item=>(
                        <Cart
                        key={item._id}
                        item={item}
                        handlerQty= {handlerQty}
                        handlerRemove={handlerRemove} 
                        />
                    ))
                )
            }
        </div>
    )
}
