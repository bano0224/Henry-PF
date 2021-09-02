import axios from 'axios';

export function postProduct(payload) {
    console.log(payload)
    return async function(dispatch) {
        const post = await axios.post('', payload)
        return {
            type:POST_PRODUCT, 
            post
        }
    }
}

//----------CREATE PRODUCT---------//
export const POST_PRODUCT = 'POST_PRODUCT';