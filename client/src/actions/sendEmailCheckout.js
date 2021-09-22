import axios from 'axios';
import { URL_SEND_EMAIL_CHECKOUT } from '../utils/utils';


export default function sendEmailCheckout (payload) {
    return async(dispatch) => {
        try {
            const json = await axios.post(`${URL_SEND_EMAIL_CHECKOUT}/${payload}`)
            return json
        } catch(error) {
            console.log('Error')
        }
    }      
};