import {GET_USERS} from './index'
import {URL_GET_USERS} from '../utils/utils'
import axios from 'axios'

export default function getUsers(){
    return async function(dispatch){
        const response = await axios.get(`${URL_GET_USERS}`)
        console.log(response.data)
        dispatch({
            type: GET_USERS,
            payload: response.data
        })
    }
}