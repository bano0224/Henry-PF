import { STATE_LOGOUT } from "./index";

const stateLogout = () => {
    return async function() {
        localStorage.setItem('login', false)
    }
}

export default stateLogout;