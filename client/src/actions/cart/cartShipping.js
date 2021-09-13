import {SET_SHIPPINGDATA} from './const';

export default function cartShipping(payload){
        return {
            type: SET_SHIPPINGDATA,
            payload
        }
}