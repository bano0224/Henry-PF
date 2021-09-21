import axios from 'axios';
import { URL_SEND_EMAIL } from '../utils/utils';


export default function sendEmail (payload) {
    console.log('ESTE ES EL PAYLOAD', payload)
    return async(dispatch) => {
        try {
            const json = await axios.post('http://localhost:5000/user/sendEmail', payload)
            return json
        } catch(error) {
            console.log('Error al enviar el email')
        }
    }      
};