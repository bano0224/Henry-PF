import axios from "axios";
import { URL_ORDER_BY_ID } from "../../utils/utils";
import { GET_ORDER_BY_ID } from "..";

export default function getOrderById(id){
    return async function(dispatch){
        const response = await axios.get(`${URL_ORDER_BY_ID}${id}`)
        dispatch({
            type: GET_ORDER_BY_ID,
            payload: response.data
        })
    }
}