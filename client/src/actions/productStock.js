import axios from "axios";
import { URL_STOCK_ID } from "../utils/utils";

export default function productStock(payload) {
  return async function (dispatch) {
    payload.map((e) =>
      axios.put(`${URL_STOCK_ID}${e._id}/${e.qty}`)
    );
  };
}
