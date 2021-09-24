import axios from 'axios'
import { URL_GET_WISHLIST } from '../../utils/utils'
import { GET_WISHLIST } from '../index'

export default function getWishlist(id){
    return  async function(dispatch){
        const response = await axios.get(`http://localhost:5000/user/wishlist/${id}`)
        dispatch({
            type: GET_WISHLIST,
            payload: response.data
        })
    }
}