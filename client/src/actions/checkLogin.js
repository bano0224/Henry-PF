import axios from 'axios';
import { URL_CHECK_LOGIN } from '../utils/utils';
import { CHECK_LOGIN } from '.';

/* export default function checkLogin(payload){
    return async function(dispatch){
        const response = await axios.get('http://localhost:5000/user/checkLogin', payload)
        dispatch({
            type: CHECK_LOGIN,
            payload: response.data
        })
        console.log('ESTA ES LA ACTION',response.data)
    }
} */

export default function checkLogin(payload){
    try {
      return async function (dispatch) {
        await axios.get('http://localhost:5000/user/checkLogin', payload)
        .then(res => {
          dispatch({ type: CHECK_LOGIN, payload: res.data });
        })
        };
    } catch(error) {
      console.log('error')
    }
}