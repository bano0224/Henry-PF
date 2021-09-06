
import { FILTER_BY_CATEGORY } from "./index";


export function filterByCategory(payload) {
    return {
      type: FILTER_BY_CATEGORY,
      payload: payload,
    };
  }