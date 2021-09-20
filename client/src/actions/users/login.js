import axios from "axios";
import { LOGIN_ERROR } from "..";
import { URL_LOGIN } from '../../utils/utils'
import swal from "sweetalert";

export default function login(userLogin){
    return async function(dispatch){
        try {
            const response = await axios.post(`${URL_LOGIN}`, userLogin)
            sessionStorage.setItem("token", JSON.stringify(response.data)) 
            
            swal({
                title: "Bienvenida/o",
                text: "Disfrutá de las mejores ofertas!",
                icon: "success",
                buttons: false,
                timer: 2000,
            });
            
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.message
            })
        }
    }
}