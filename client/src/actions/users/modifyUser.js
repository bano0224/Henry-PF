import axios from "axios";
import { URL_UPDATE_USER } from "../../utils/utils";

export default function modifyUser(user, id){
    return async function(dispatch){
        await axios.put(`${URL_UPDATE_USER}${id}`, user)
    }
}