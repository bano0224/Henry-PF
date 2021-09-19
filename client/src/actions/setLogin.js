import axios from 'axios';
import { URL_SET_LOGIN } from '../utils/utils';


const login = async payload => {
    const { data } = await axios.post('http://localhost:5000/user/login', payload)
            return data
};
export default login;