import axios from 'axios';
import { URL_CREATE_VIEWERS } from '../utils/utils';
import { SET_REVIEWS } from '.';

export default function setReviews (payload) {
    return async(dispatch) => {
        try {
            const json = await axios.post('http://localhost:5000/review/create',{"name": payload.name,
            "comment": payload.comment,
            "rating":payload.rating,
            "product": payload.product,
            "user": payload.user})
            return json
        } catch(error) {
            console.log('Error al guardar su comentario')
        }
    }      
};