import { URL_PRODUCTS } from "../utils/utils";
import axios from "axios";
import {GET_PRODUCTS} from '.'


  export default function getProducts(){
    try {
      return async function (dispatch) {
        await axios.get(URL_PRODUCTS)
        .then(res => {
          dispatch({ type: GET_PRODUCTS, payload: res.data });
        })
        };
    } catch(error) {
      console.log('error')
    }
}

const config = {
  headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
  },
};
  

