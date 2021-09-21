import { ADD_TO_CART } from './const.js'
import axios from 'axios'
import { URL_PRODUCTS_ID } from '../../utils/utils.js'


export default function addToCart (id, qty){
    return async function(dispatch, getState){
        const {data} = await axios.get(`${URL_PRODUCTS_ID}${id}`)
        dispatch({
            type: ADD_TO_CART,
            payload:{
                _id: data._id,
                name: data.name,
                imageUrl: data.imageUrl,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })

        localStorage.setItem("cart", JSON.stringify(getState().cartReducer.cartItems));
    }
}