import axios from 'axios';
import { MERCADOPAGO_URL } from '../../utils/utils';
import { MERCADOPAGO_PAYMENT } from './const';

export default mercadopagoPayment = async cart => {
    try {
        const { data } = await axios.post(`${MERCADOPAGO_URL}`, { cart });
        dispatch({ type: MERCADOPAGO_PAYMENT, payload: data.init_point });
    } catch (error) {
        console.log(error);
    }
};