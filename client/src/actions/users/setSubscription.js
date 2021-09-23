import axios from 'axios';
import { URL_SET_SUBSCRIPTION } from '../../utils/utils';


export default function setSubscription (payload) {
    console.log('ESTE ES EL PAYLOAD', payload)
    return async(dispatch) => {
        try {
            const json = await axios.post(URL_SET_SUBSCRIPTION, {id: payload})
            return json
        } catch(error) {
            console.log('Error al suscribirse')
        }
    }      
};