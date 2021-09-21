import axios from 'axios';
import { URL_RESET_PASSWORD } from '../utils/utils';

export default function resetPassword (payload) {
    console.log('ESTE ES EL PAYLOAD', payload)
    return async(dispatch) => {
        try {
            const json = await axios.post(URL_RESET_PASSWORD, payload)
            return json
        } catch(error) {
            console.log('Error al realizar el reseteo de su contraseña')
        }
    }      
};