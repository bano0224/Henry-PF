import axios from "axios";
import { URL_MODIFY_STATUS } from "../../utils/utils";

export default function modifyStatus(status, id){
    return async function(dispatch){
        await axios.put(`${URL_MODIFY_STATUS}`, {status, id})
    }
}