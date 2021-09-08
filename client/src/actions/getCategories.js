import { GET_CATEGORIES } from "./index";
import { URL_CATEGORIES } from "../utils/utils";


export default function getCategories() {
    return function (dispatch) {
      return fetch(URL_CATEGORIES)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: GET_CATEGORIES, payload: json });
        });
    };
  }