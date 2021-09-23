import axios from "axios";
import { URL_GET_ORDERS } from "../../utils/utils";
import { GET_ORDERS } from "..";

export default function getOrders(){
    return async function(dispatch){
        const response = await axios.get(`${URL_GET_ORDERS}`)
        dispatch({
            type: GET_ORDERS,
            payload: response.data
        })
    }
}