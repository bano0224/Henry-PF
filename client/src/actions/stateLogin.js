import axios from "axios";
import { STATE_LOGIN } from "./index";


const stateLogin = () => {
    return async function() {
        localStorage.setItem('login', true)
    }

}

export default stateLogin;