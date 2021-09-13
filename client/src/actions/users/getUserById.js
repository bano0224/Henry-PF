import axios from "axios";
import { URL_GET_USER_ID } from "../../utils/utils";
import { GET_USER_BY_ID } from "..";

export default function getUserById(id){
    return async function(dispatch){
        const response = await axios.get(`${URL_GET_USER_ID}${id}`)
        dispatch({
            type: GET_USER_BY_ID,
            payload: response.data
        })
    }
}