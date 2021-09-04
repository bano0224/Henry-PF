import { CREATE_PRODUCT } from "./index";
import { URL_PRODUCT_CREATE } from "../utils/utils";
import axios from "axios";

export default function createProduct(payload) {
  return async function () {
    try {
      const post = await axios.post(URL_PRODUCT_CREATE, payload);
      return {
      type: CREATE_PRODUCT,
      post,
    }
    } catch(err) {
      console.log('En este momento no se puede crear el producto')
    }
    
  };
}
