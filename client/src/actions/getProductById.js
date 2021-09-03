import { GET_PRODUCT_BY_ID } from "./index";
import { URL_PRODUCTS_ID } from "../utils/utils";
import axios from "axios";

export default function getProductById(id) {
  return async function (dispatch) {
    try {
      await axios.get(URL_PRODUCTS_ID + id);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: res.data,
      });
    } catch (error) {
      console.log("Producto no encontrado");
    }
  };
}
