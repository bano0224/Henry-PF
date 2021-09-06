import axios from 'axios';
import { URL_CREATE_VIEWERS } from '../utils/utils';

export const SET_REVIEWS = 'SET_REVIEWS'

export default function setReviews (payload) {
    return async(dispatch) => {
        try {
            const json = await axios.post('http://localhost:5000/reviews/create', payload)
            return json
        } catch(error) {
            console.log('Error al guardar su comentario')
        }
    }      
};