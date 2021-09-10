import axios from 'axios';
import { URL_SET_LOGIN } from '../utils/utils';

export const SET_REVIEWS = 'SET_REVIEWS'

const login = async payload => {
    const { data } = await axios.post('http://localhost:5000/user/login', payload)
            return data, console.log('ESTE ES ELM JSON', data)
     
};

export default login;