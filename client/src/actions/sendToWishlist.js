import axios from "axios";
import { URL_ADD_TO_WISHLIST } from '../../utils/utils'

export default function addToWishList(payload){
    return async function(dispatch){
        try {
            const response = await axios.post(`${URL_ADD_TO_WISHLIST}`, payload) 
        } catch (error) {
            console.log('Error al agregar a favoritos')
        }
    }
}