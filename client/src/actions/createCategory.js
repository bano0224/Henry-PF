import { CREATE_CATEGORY } from "./index";
import { URL_CATEGORY_CREATE } from "../utils/utils";
import axios from "axios";

export default function createCategory(payload) {
  console.log(payload);
  return async function () {
    try {
      const post = await axios.post(URL_CATEGORY_CREATE, payload);
      return {
      type: CREATE_CATEGORY,
      post,
    }
    } catch(err) {
      console.log('En este momento no se puede crear la categoria')
    }
    
  };
}