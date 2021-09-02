import { DELETE_PRODUCT } from './index';
import { URL_PRODUCTS_ID } from '../utils/utils';
import axios from 'axios';

export default function deleteProduct(id){
    return async function (dispatch) {
        try {
          await axios.get(URL_PRODUCTS_ID + id);
          return dispatch({
            type: DELETE_PRODUCT,
            payload: res.data,
          });
        } catch (error) {
          console.log("Error al eliminar el producto");
        }
      };
}