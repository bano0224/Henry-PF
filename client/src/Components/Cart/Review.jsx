import React from 'react'
import {Typography, List,ListItem,Divider,ListItemText} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import accounting from "accounting";
import Cart from './Cart';
import addToCart from '../../actions/cart/addToCart';
import removeFromCart from '../../actions/cart/removeFromCart';


const Review = () => {

    const dispatch= useDispatch()
    const cartReducer = useSelector(state => state.cartReducer)
    const {cartItems} = cartReducer
    const getSubtotal=()=>{
        return  cartItems
                .reduce((price,item)=> price + item.price * parseInt(item.qty), 0)
        }
    const handlerQty= (id, qty)=>{
            dispatch(addToCart(id,qty))
        }
    
    const handlerRemove = (id)=>{
            dispatch(removeFromCart(id))
        }    
    return (
        <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>  
        <List disablePadding>
            
            {
                cartItems.length === 0 
                    ?(
                    <span>
                     Carrito vacío.
                     </span>
                     )
                    :(
                    cartItems.map(item=>(
                                               
                    <ListItem>
                        <Cart
                        key={item._id}
                        item={item}
                        handlerQty= {handlerQty}
                        handlerRemove={handlerRemove} 
                    />

                    <Divider />
                    </ListItem>
                     ))
                      )
            } 
            
            <ListItem>
            <ListItemText primary="Total" variant="h6"/>
                <Typography variant="h6">
                     {accounting.formatMoney(getSubtotal())}
                </Typography>  
                
            </ListItem>
            
        </List>

        </>
    )
}

export default Review
