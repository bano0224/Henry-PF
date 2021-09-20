import { DELETE_PRODUCT } from "./index";
import { URL_DELETE_PRODUCT, URL_PRODUCTS } from "../utils/utils";
import axios from "axios";

export default function deleteProduct(id) {
  return async function (dispatch) {
      await axios.delete(`${URL_DELETE_PRODUCT}${id}`)
      const response = await axios.get(`${URL_PRODUCTS}`)
        dispatch({
          type: DELETE_PRODUCT,
          payload: response.data
        });
  };
};

