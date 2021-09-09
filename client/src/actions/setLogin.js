import axios from 'axios';
import { URL_SET_LOGIN } from '../utils/utils';

export const SET_REVIEWS = 'SET_REVIEWS'

export default function setLogin (payload) {
    console.log('ESTE ES EL PAYLOAD', payload)
    return async() => {
        try {
            const json = await axios.post('http://localhost:5000/user/login', payload)
            return json, console.log('ESTE ES ELM JSON', json)
        } catch(error) {
            console.log('Falló el Login')
        }
    }      
};