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
//-----PRODUCT DETAIL-----
export function getDetail(id){
    return function () {
        
    };
}

//----------CREATE PRODUCT---------//
export const POST_PRODUCT = 'POST_PRODUCT';