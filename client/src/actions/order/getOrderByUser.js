import axios from "axios"
import { URL_GET_ORDER_BY_USER } from '../../utils/utils'
import { GET_ORDER_BY_USER } from ".."


export default function getOrderByUser(id){
    console.log('ACTION', id);
    return async function(dispatch){
        const response = await axios.get(`${URL_GET_ORDER_BY_USER}${id}`)
        dispatch({
            type: GET_ORDER_BY_USER,
            payload: response.data
        })
    }
}