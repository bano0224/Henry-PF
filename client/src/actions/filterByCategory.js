
import { FILTER_BY_CATEGORY } from "./index";


export default function filterByCategory(payload) {
  console.log('ACTION', payload);
    return {
      type: FILTER_BY_CATEGORY,
      payload: payload,
    };
  }