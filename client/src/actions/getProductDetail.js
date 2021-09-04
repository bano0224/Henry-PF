import { GET_PRODUCT_DETAIL } from "./index";

export default function getProductDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:5000/product/:id`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_PRODUCT_DETAIL, payload: json });
      });
  };
}
