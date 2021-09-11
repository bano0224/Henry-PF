import { DELETE_CATEGORY } from ".."
import { URL_DELETE_CATEGORY } from "../../utils/utils"
import axios from 'axios'

export default function deleteCategory(id){
    return async function(dispatch){
        axios.delete(`${URL_DELETE_CATEGORY}${id}`)
        dispatch({
            type: DELETE_CATEGORY,
        })
    }
}