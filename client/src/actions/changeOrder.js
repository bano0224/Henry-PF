import { CHANGE_ORDER } from "./index";

export default function changeOrder(payload) {
    return {
      type: CHANGE_ORDER,
      payload: payload,
    };
  }