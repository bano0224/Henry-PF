import axios from "axios";
import { URL_LOGIN_GOOGLE } from '../../utils/utils'


export default function loginGoogle(payload){
    console.log('ÉSTE ES EL PAYLOAD DE GOOGLE', payload)
    return async function(dispatch){
        try {
            const response = await axios.post(`${URL_LOGIN_GOOGLE}`, payload)
            sessionStorage.setItem("token", JSON.stringify(response.data))
            console.log('ESTE ES EL RESPONSE', response.data)
        } catch (error) {
            console.log('Error al iniciar sesión')
        }
    }
}