import axios from 'axios';


export const SET_REVIEWS = 'SET_REVIEWS'

export default function setLogup (payload) {
    return async(dispatch) => {
        try {
            const json = await axios.post('http://localhost:5000/user/logup', payload)
            return json
        } catch(error) {
            console.log('Error al crear el usuario. Comuniquese con un administrador')
        }
    }      
};