import * as actionTypes from './const.js'
import axios from 'axios'
import { URL_PRODUCTS_ID } from '../../utils/utils.js'


export default function addToCart (id, qty){
    return async function(dispatch){
        const {data} = await axios.get(`${URL_PRODUCTS_ID}${id}`)

        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload:{
                name: data.name,
                imageUrl: data.imageUrl,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            }
        })
    }
}