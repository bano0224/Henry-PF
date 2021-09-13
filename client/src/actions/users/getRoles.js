import axios from 'axios';
import { GET_ROLES } from '..';
import { URL_GET_ROLES } from '../../utils/utils';

export default function getRoles(){
    return async function(dispatch){
        const response = await axios.get(`${URL_GET_ROLES}`)
        dispatch({
            type: GET_ROLES,
            payload: response.data
        })
    }
}