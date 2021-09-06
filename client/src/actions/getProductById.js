import { GET_PRODUCT_BY_ID } from "./index";
import { URL_PRODUCTS_ID } from "../utils/utils";
import axios from "axios";

export default function getProductById(id) {
  console.log('ESTE ES EL ID', id)
  return async function (dispatch) {
    try {
      var json = await axios.get(`${URL_PRODUCTS_ID}${id}`);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log("Producto no encontrado");
    }
  };
}
