import axios from 'axios';
import { GET_REVIEWS } from './index'

export default function getReviews() {
    return async function (dispatch) {
      try {
        var json = await axios.get(`http://localhost:5000/review/`);
        return dispatch({
          type: GET_REVIEWS,
          payload: json.data,
        });
      } catch (error) {
        console.log("error");
      }
    };
  }
  