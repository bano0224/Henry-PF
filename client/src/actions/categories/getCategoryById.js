import { URL_CATEGORIE_BY_ID } from "../../utils/utils"
import { GET_CATEGORY_BY_ID } from ".."
import axios from "axios"


export default function getCategoryById(id){
    return async function(dispatch){
        const response = await axios.get(`${URL_CATEGORIE_BY_ID}${id}`)
        dispatch({
            type: GET_CATEGORY_BY_ID,
            payload: response.data
        })
    }
}