import { FILTER_BY_STATUS } from "../index"

export default function filterByStatus(payload){
    console.log('aca',payload)
    return {
        type: FILTER_BY_STATUS,
        payload: payload,
    }
}