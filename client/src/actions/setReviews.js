import axios from 'axios';
import { URL_CREATE_VIEWERS } from '../utils/utils';
import { SET_REVIEWS } from '.';

export default function setReviews (payload) {
    console.log('ESTE ES EL PAYLOAD', payload)
    return async(dispatch) => {
        try {
            const json = await axios.post('http://localhost:5000/review/create', payload)
            return json
        } catch(error) {
            console.log('Error al guardar su comentario')
        }
    }      
};