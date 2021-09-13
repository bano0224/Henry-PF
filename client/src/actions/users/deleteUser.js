import axios from "axios";
import { URL_DELETE_USER, URL_GET_USERS } from "../../utils/utils";
import { DELETE_USER } from "..";

export default function deleteUser(id){
    return async function(dispatch){
        await axios.delete(`${URL_DELETE_USER}${id}`)
        const response = await axios.get(`${URL_GET_USERS}`)
        dispatch({
            type: DELETE_USER,
            payload: response.data
        })
    }
}