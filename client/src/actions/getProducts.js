import { GET_PRODUCTS } from "./index";
import { URL_PRODUCTS } from "../utils/utils";
import axios from "axios";

export default function getProducts() {
  return async function (dispatch) {
    await axios.get(URL_PRODUCTS).the((res) => {
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    });
  };
}
