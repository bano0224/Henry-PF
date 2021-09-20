import axios from 'axios';
import { URL_PRODUCTS_QUERY } from '../utils/utils';
import { GET_PRODUCT_BY_QUERY } from './index';

export default function getProductByQuery(query){
    return async function(dispatch) {
        const response = await axios.get(URL_PRODUCTS_QUERY + query)
        dispatch({
            type: GET_PRODUCT_BY_QUERY,
            payload: response.data,
        })
    }
}