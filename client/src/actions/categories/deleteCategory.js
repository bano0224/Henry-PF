import { GET_CATEGORIES } from ".."
import { URL_CATEGORIES, URL_DELETE_CATEGORY } from "../../utils/utils"
import axios from 'axios'

export default function deleteCategory(id){
    return async function(dispatch){
        await axios.delete(`${URL_DELETE_CATEGORY}${id}`)
        const response = await axios.get(`${URL_CATEGORIES}`)
        dispatch({
            type: GET_CATEGORIES,
            payload: response.data
        })
    }
}