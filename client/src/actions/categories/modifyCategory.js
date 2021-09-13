import axios from 'axios'
import { GET_CATEGORIES } from '..'
import { URL_CATEGORIES, URL_MODIFY_CATEGORY } from '../../utils/utils'


export default function modifyCategory(category){
    return async function(dispatch){
        await axios.put(`${URL_MODIFY_CATEGORY}`, {...category})
        const response = await axios.get(`${URL_CATEGORIES}`)
        dispatch({
            type: GET_CATEGORIES,
            payload: response.data
        })
    }
}