import { CREATE_PRODUCT } from "./index";
import axios from "axios";

export default function createProduct(payload) {
  console.log(payload);
  return async function (dispatch) {
    const post = await axios.post("", payload);
    return {
      type: CREATE_PRODUCT,
      post,
    };
  };
}
