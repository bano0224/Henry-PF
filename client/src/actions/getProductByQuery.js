import axios from 'axios';

import { GET_PRODUCT_BY_QUERY } from './index';
// SEARCH
export default function getProductByQuery(query){
    return function(dispatch) {
        return axios.get(`http://localhost:5000/product`)
        .then((response) => {
            dispatch({
                type: GET_PRODUCT_BY_QUERY,
                payload: response.data,
            })
        })
    }}