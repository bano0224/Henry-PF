import {GET_USERS} from './index'
import {URL_GET_USERS} from '../utils/utils'
import axios from 'axios'

export default function getUsers(){
    return async function(dispatch){
        const response = await axios.get(`http://localhost:5000/user`)
        dispatch({
            type: GET_USERS,
            payload: response.data
        })
    }
}