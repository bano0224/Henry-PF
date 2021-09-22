import { FILTER_BY_STATUS } from ".."

export default function filterByStatus(payload){
    console.log('aca',payload)
    return {
        type: FILTER_BY_STATUS,
        payload: payload,
    }
}