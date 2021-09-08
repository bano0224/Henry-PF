import axios from 'axios';
import { URL_PRODUCTS_QUERY } from '../utils/utils';

import { GET_PRODUCT_BY_QUERY } from './index';
// SEARCH
export default function getProductByQuery(query){
    return function(dispatch) {
        return axios.get(URL_PRODUCTS_QUERY + query)
        .then((response) => {
            dispatch({
                type: GET_PRODUCT_BY_QUERY,
                payload: response.data,
            })
            console.log('ESTE ES EL RESPONSE', response)
        })
    }
}