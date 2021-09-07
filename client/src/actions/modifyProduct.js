import { UPDATE_PRODUCT } from './index'
import axios from 'axios'
import { URL_MODIFY_PRODUCT } from '../utils/utils'

export default function modifyProduct(payload){
    return async function(dispatch){
        await axios.get(/* URL_MODIFY_PRODUCT */ 'http://localhost:5000/product/update', payload)
        dispatch({
            type: UPDATE_PRODUCT
        })
    }
}