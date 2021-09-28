import axios from 'axios'
import { URL_DELETE_WISH_ITEM } from '../../utils/utils'

export default function deleteWishItem(itemId, usuarioId){
    console.log('action', itemId, usuarioId);
    return async function(dispatch){
        await axios.delete(`${URL_DELETE_WISH_ITEM}?itemid=${itemId}&usuarioid=${usuarioId}`)
    }
}