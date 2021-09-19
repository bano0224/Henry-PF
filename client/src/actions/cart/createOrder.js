import {CREATE_ORDER} from './const';
import { URL_ORDER_CREATE } from "../../utils/utils";
import axios from "axios";

export default function createOrder(payload) {
    return async function (dispatch) {
      try {
        console.log("ESTE ES EL PAYLOAD", payload)
        await axios.post(URL_ORDER_CREATE, {"city":payload.city, "postCode":payload.postCode, "address1":payload.address1, "user":payload.user, "products":payload.products, "totalPrice": payload.totalPrice});
      } catch(err) {
        console.log('En este momento no se puede crear la orden', err);
      }
      
    };
  }